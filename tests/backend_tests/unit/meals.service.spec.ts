import { Test, TestingModule } from '@nestjs/testing';
import { MealsService } from '../../../backend/src/meals/meals.service';
import { PrismaService } from '../../../backend/src/prisma/prisma.service';
import { DailyTargetsService } from '../../../backend/src/daily-targets/daily-targets.service';

describe('MealsService', () => {
  let service: MealsService;

  const mockPrisma = {
    meal: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    dailyTarget: {
      findMany: jest.fn(),
    },
  };

  const mockDailyTargetsService = {
    getTargetsForDate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: DailyTargetsService, useValue: mockDailyTargetsService },
      ],
    }).compile();

    service = module.get<MealsService>(MealsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a meal with calculated health score', async () => {
      const createMealDto = {
        name: 'Grilled Chicken',
        foodItems: ['chicken breast', 'rice'],
        calories: 500,
        protein: 40,
        carbs: 50,
        fats: 10,
      };

      const createdMeal = {
        id: 'meal-1',
        userId: 'user-1',
        date: new Date('2024-01-15'),
        name: 'Grilled Chicken',
        foodItems: ['chicken breast', 'rice'],
        calories: 500,
        protein: 40,
        carbs: 50,
        fats: 10,
        imageUrl: null,
        healthScore: 7,
        createdAt: new Date(),
      };

      mockPrisma.meal.create.mockResolvedValue(createdMeal);

      const result = await service.create(createMealDto, 'user-1');

      expect(result.name).toBe('Grilled Chicken');
      expect(result.userId).toBe('user-1');
      expect(mockPrisma.meal.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          name: 'Grilled Chicken',
          calories: 500,
        }),
      });
    });

    it('should use provided health score if present', async () => {
      const createMealDto = {
        name: 'Salad',
        foodItems: ['lettuce', 'tomato'],
        calories: 200,
        protein: 10,
        carbs: 20,
        fats: 5,
        healthScore: 9,
      };

      const createdMeal = {
        id: 'meal-2',
        userId: 'user-1',
        date: new Date(),
        ...createMealDto,
        imageUrl: null,
        createdAt: new Date(),
      };

      mockPrisma.meal.create.mockResolvedValue(createdMeal);

      const result = await service.create(createMealDto, 'user-1');

      expect(mockPrisma.meal.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          healthScore: 9,
        }),
      });
    });

    it('should clamp health score to 1-10 range', async () => {
      const createMealDto = {
        name: 'Test',
        foodItems: ['test'],
        calories: 500,
        protein: 30,
        carbs: 50,
        fats: 20,
        healthScore: 15,
      };

      const createdMeal = {
        id: 'meal-3',
        userId: 'user-1',
        date: new Date(),
        ...createMealDto,
        healthScore: 10,
        imageUrl: null,
        createdAt: new Date(),
      };

      mockPrisma.meal.create.mockResolvedValue(createdMeal);

      await service.create(createMealDto, 'user-1');

      expect(mockPrisma.meal.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          healthScore: 10,
        }),
      });
    });

    describe('calculateHealthScore detailed logic (SQA McCabe Compliance)', () => {
      const baseUserData = { userId: 'user-1' };

      it('Path 3: should add 1.5 bonus for high protein ratio (> 0.25)', async () => {
        const dto = {
          name: 'High Protein',
          foodItems: ['Chicken'],
          calories: 400,
          protein: 30, // 30*4 = 120 cal. 120/400 = 0.3 ( > 0.25)
          carbs: 40,
          fats: 13, // 13*9 = 117 cal. 117/400 = 0.29 (in 0.2-0.35 range -> +1)
        };
        // Score: 5 (base) + 1.5 (protein) + 1 (fat) = 7.5 -> round 8
        mockPrisma.meal.create.mockImplementation((args) => Promise.resolve({ ...args.data, id: '1', date: new Date() }));
        const result = await service.create(dto as any, baseUserData.userId);
        expect(result.healthScore).toBe(8);
      });

      it('Path 4: should add 0.5 bonus for moderate protein ratio (> 0.15)', async () => {
        const dto = {
          name: 'Mid Protein',
          foodItems: ['Eggs'],
          calories: 400,
          protein: 20, // 20*4 = 80. 80/400 = 0.2 ( in 0.15-0.25 range -> +0.5)
          carbs: 50,
          fats: 13, // 13*9 = 117. 117/400 = 0.29 (+1)
        };
        // Score: 5 + 0.5 + 1 = 6.5 -> round 7
        mockPrisma.meal.create.mockImplementation((args) => Promise.resolve({ ...args.data, id: '2', date: new Date() }));
        const result = await service.create(dto as any, baseUserData.userId);
        expect(result.healthScore).toBe(7);
      });

      it('Path 5/6: should handle non-optimal fat ratios (e.g. too high > 0.5)', async () => {
        const dto = {
          name: 'High Fat',
          foodItems: ['Oil'],
          calories: 400,
          protein: 10, // 10*4 = 40. 40/400 = 0.1 (low)
          carbs: 5,
          fats: 25, // 25*9 = 225. 225/400 = 0.56 (> 0.5 -> penalty -1)
        };
        // Score: 5 + 0 (protein) - 1 (fat) = 4
        mockPrisma.meal.create.mockImplementation((args) => Promise.resolve({ ...args.data, id: '3', date: new Date() }));
        const result = await service.create(dto as any, baseUserData.userId);
        expect(result.healthScore).toBe(4);
      });

      it('Path 8: should add 0.5 bonus for light meals (< 300 kcal)', async () => {
        const dto = {
          name: 'Light Snack',
          foodItems: ['Apple'],
          calories: 200, // < 300 (+0.5)
          protein: 5, // 20/200 = 0.1
          carbs: 40,
          fats: 2, // 18/200 = 0.09
        };
        // Score: 5 + 0 (protein) + 0 (fat) + 0.5 (cal) = 5.5 -> round 6
        mockPrisma.meal.create.mockImplementation((args) => Promise.resolve({ ...args.data, id: '4', date: new Date() }));
        const result = await service.create(dto as any, baseUserData.userId);
        expect(result.healthScore).toBe(6);
      });

      it('Path 9: should apply 0.5 penalty for heavy meals (> 1000 kcal)', async () => {
        const dto = {
          name: 'Heavy Feast',
          foodItems: ['Burger'],
          calories: 1200, // > 1000 (-0.5)
          protein: 50, // 200/1200 < 0.15
          carbs: 200,
          fats: 25, // 225/1200 < 0.2
        };
        // Score: 5 + 0 + 0 - 0.5 = 4.5 -> round 5
        mockPrisma.meal.create.mockImplementation((args) => Promise.resolve({ ...args.data, id: '5', date: new Date() }));
        const result = await service.create(dto as any, baseUserData.userId);
        expect(result.healthScore).toBe(5);
      });
    });
  });

  describe('findAll', () => {
    it('should return all meals for a user', async () => {
      const meals = [
        {
          id: 'meal-1',
          userId: 'user-1',
          date: new Date(),
          name: 'Breakfast',
          foodItems: ['eggs'],
          calories: 300,
          protein: 20,
          carbs: 5,
          fats: 15,
          imageUrl: null,
          healthScore: 7,
          createdAt: new Date(),
        },
      ];

      mockPrisma.meal.findMany.mockResolvedValue(meals);

      const result = await service.findAll('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Breakfast');
      expect(mockPrisma.meal.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findByDate', () => {
    it('should return meals for a specific date', async () => {
      mockPrisma.meal.findMany.mockResolvedValue([]);

      const result = await service.findByDate('user-1', '2024-01-15');

      expect(result).toEqual([]);
      expect(mockPrisma.meal.findMany).toHaveBeenCalledWith({
        where: {
          userId: 'user-1',
          date: {
            gte: expect.any(Date),
            lte: expect.any(Date),
          },
        },
        orderBy: { date: 'desc' },
      });
    });
  });

  describe('getDailySummary', () => {
    it('should return daily summary with correct calculations', async () => {
      const meals = [
        {
          id: 'meal-1',
          userId: 'user-1',
          date: new Date(),
          name: 'Breakfast',
          foodItems: ['eggs'],
          calories: 400,
          protein: 30,
          carbs: 40,
          fats: 15,
          imageUrl: null,
          healthScore: 7,
          createdAt: new Date(),
        },
        {
          id: 'meal-2',
          userId: 'user-1',
          date: new Date(),
          name: 'Lunch',
          foodItems: ['sandwich'],
          calories: 600,
          protein: 25,
          carbs: 60,
          fats: 20,
          imageUrl: null,
          healthScore: 6,
          createdAt: new Date(),
        },
      ];

      const targets = { calories: 2000, protein: 150, carbs: 250, fats: 65 };

      mockPrisma.meal.findMany.mockResolvedValue(meals);
      mockDailyTargetsService.getTargetsForDate.mockResolvedValue(targets);

      const today = new Date().toISOString().split('T')[0];
      const result = await service.getDailySummary('user-1');

      expect(result.targets).toEqual(targets);
      expect(result.consumed).toEqual({
        calories: 1000,
        protein: 55,
        carbs: 100,
        fats: 35,
      });
      expect(result.remaining).toEqual({
        calories: 1000,
        protein: 95,
        carbs: 150,
        fats: 30,
      });
      expect(result.meals).toHaveLength(2);
    });

    it('should clamp remaining to 0 when consumed exceeds targets', async () => {
      const meals = [
        {
          id: 'meal-1',
          userId: 'user-1',
          date: new Date(),
          name: 'Big Meal',
          foodItems: ['pizza'],
          calories: 3000,
          protein: 200,
          carbs: 300,
          fats: 100,
          imageUrl: null,
          healthScore: 3,
          createdAt: new Date(),
        },
      ];

      const targets = { calories: 2000, protein: 150, carbs: 250, fats: 65 };

      mockPrisma.meal.findMany.mockResolvedValue(meals);
      mockDailyTargetsService.getTargetsForDate.mockResolvedValue(targets);

      const result = await service.getDailySummary('user-1');

      expect(result.remaining).toEqual({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      });
    });
  });

  describe('getHistory', () => {
    it('should return daily summaries grouped by date', async () => {
      const meals = [
        {
          id: 'meal-1',
          userId: 'user-1',
          date: new Date('2024-01-15T12:00:00Z'),
          name: 'Lunch',
          foodItems: ['salad'],
          calories: 300,
          protein: 20,
          carbs: 30,
          fats: 10,
          imageUrl: null,
          healthScore: 8,
          createdAt: new Date(),
        },
      ];

      const targets = { calories: 2000, protein: 150, carbs: 250, fats: 65 };

      mockPrisma.meal.findMany.mockResolvedValue(meals);
      mockPrisma.dailyTarget.findMany.mockResolvedValue([]);
      mockDailyTargetsService.getTargetsForDate.mockResolvedValue(targets);

      const result = await service.getHistory('user-1', '2024-01-15', '2024-01-15');

      expect(result).toHaveLength(1);
      expect(result[0].date).toBe('2024-01-15');
      expect(result[0].consumed.calories).toBe(300);
    });
  });
});
