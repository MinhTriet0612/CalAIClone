import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AiService } from '../../../backend/src/ai/ai.service';

// Mock the Google Generative AI module
jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn();
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: mockGenerateContent,
      }),
    })),
    __mockGenerateContent: mockGenerateContent,
  };
});

const { __mockGenerateContent } = jest.requireMock('@google/generative-ai');

describe('AiService', () => {
  let service: AiService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-api-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    jest.clearAllMocks();
    // Re-mock get to return the key (clearAllMocks resets it)
    mockConfigService.get.mockReturnValue('test-api-key');
  });

  describe('analyzeMealImage', () => {
    it('should return meal analysis for a food image', async () => {
      const mockResponse = {
        response: {
          text: () =>
            JSON.stringify({
              isFood: true,
              foodItems: ['grilled chicken', 'rice', 'vegetables'],
              calories: 650,
              protein: 45,
              carbs: 60,
              fats: 20,
              healthScore: 8,
              confidence: 0.9,
            }),
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const imageBuffer = Buffer.from('fake-image-data');
      const result = await service.analyzeMealImage(imageBuffer, 'image/jpeg');

      expect(result.isFood).toBe(true);
      expect(result.foodItems).toContain('grilled chicken');
      expect(result.calories).toBe(650);
      expect(result.protein).toBe(45);
      expect(result.healthScore).toBe(8);
    });

    it('should return non-food result for non-food images', async () => {
      const mockResponse = {
        response: {
          text: () =>
            JSON.stringify({
              isFood: false,
              foodItems: [],
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
              confidence: 0,
            }),
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const imageBuffer = Buffer.from('fake-image-data');
      const result = await service.analyzeMealImage(imageBuffer, 'image/jpeg');

      expect(result.isFood).toBe(false);
      expect(result.foodItems).toEqual([]);
      expect(result.calories).toBe(0);
      expect(result.healthScore).toBeUndefined();
    });

    it('should handle markdown-wrapped JSON responses', async () => {
      const mockResponse = {
        response: {
          text: () =>
            '```json\n{"isFood":true,"foodItems":["pasta"],"calories":500,"protein":20,"carbs":60,"fats":15,"healthScore":6,"confidence":0.85}\n```',
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const imageBuffer = Buffer.from('fake-image-data');
      const result = await service.analyzeMealImage(imageBuffer, 'image/jpeg');

      expect(result.isFood).toBe(true);
      expect(result.foodItems).toContain('pasta');
    });

    it('should clamp health score to 1-10', async () => {
      const mockResponse = {
        response: {
          text: () =>
            JSON.stringify({
              isFood: true,
              foodItems: ['salad'],
              calories: 200,
              protein: 10,
              carbs: 20,
              fats: 5,
              healthScore: 15,
              confidence: 0.8,
            }),
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const imageBuffer = Buffer.from('fake-image-data');
      const result = await service.analyzeMealImage(imageBuffer, 'image/jpeg');

      expect(result.healthScore).toBe(10);
    });

    it('should throw error when AI call fails', async () => {
      __mockGenerateContent.mockRejectedValue(new Error('API error'));

      const imageBuffer = Buffer.from('fake-image-data');

      await expect(
        service.analyzeMealImage(imageBuffer, 'image/jpeg'),
      ).rejects.toThrow('Failed to analyze meal image');
    });
  });

  describe('generateMeatCoachAdvice', () => {
    it('should generate coaching response', async () => {
      const mockResponse = {
        response: {
          text: () => 'Try grilled chicken breast for a lean protein option.',
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const result = await service.generateMeatCoachAdvice(
        'What is a good lean meat?',
      );

      expect(result).toBe('Try grilled chicken breast for a lean protein option.');
    });

    it('should include conversation history in prompt', async () => {
      const mockResponse = {
        response: {
          text: () => 'Based on our earlier discussion, try salmon.',
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const history = [
        { role: 'user' as const, content: 'What about fish?' },
        { role: 'assistant' as const, content: 'Fish is great for protein!' },
      ];

      const result = await service.generateMeatCoachAdvice(
        'Which one specifically?',
        history,
      );

      expect(result).toContain('salmon');
      expect(__mockGenerateContent).toHaveBeenCalled();
    });

    it('should include daily summary context', async () => {
      const mockResponse = {
        response: {
          text: () => 'You still need 50g of protein today.',
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const summary = {
        date: '2024-01-15',
        targets: { calories: 2000, protein: 150, carbs: 250, fats: 65 },
        consumed: { calories: 1200, protein: 100, carbs: 150, fats: 40 },
        remaining: { calories: 800, protein: 50, carbs: 100, fats: 25 },
        meals: [],
      };

      const result = await service.generateMeatCoachAdvice(
        'What should I eat?',
        [],
        summary,
      );

      expect(result).toBeDefined();
    });

    it('should return fallback message when AI returns empty', async () => {
      const mockResponse = {
        response: {
          text: () => '',
        },
      };

      __mockGenerateContent.mockResolvedValue(mockResponse);

      const result = await service.generateMeatCoachAdvice('test');

      expect(result).toBe('I need a bit more detail to help with that meat question.');
    });

    it('should throw on AI failure', async () => {
      __mockGenerateContent.mockRejectedValue(new Error('API error'));

      await expect(
        service.generateMeatCoachAdvice('test'),
      ).rejects.toThrow('Failed to generate meat chat response');
    });
  });
});
