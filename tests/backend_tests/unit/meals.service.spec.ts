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
