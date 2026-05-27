import { Test, TestingModule } from '@nestjs/testing';
import { CoachingService } from './coaching.service';
import { PrismaService } from '../prisma/prisma.service';
import { ScientificService } from '../scientific/scientific.service';

describe('CoachingService', () => {
  let service: CoachingService;
  let prisma: PrismaService;
  let scientificService: ScientificService;

  beforeEach(async () => {
    // 1. Setup Mocking & Sandbox Isolation (AAA: Arrange)
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
      },
      weightLog: {
        findMany: jest.fn(),
      },
      meal: {
        findMany: jest.fn(),
      }
    };

    const mockScientificService = {
      calculateAdaptiveTDEE: jest.fn(),
      predictPlateau: jest.fn(),
      getTrajectory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoachingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ScientificService,
          useValue: mockScientificService,
        },
      ],
    }).compile();

    service = module.get<CoachingService>(CoachingService);
    prisma = module.get<PrismaService>(PrismaService);
    scientificService = module.get<ScientificService>(ScientificService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FR_17.1: Điều kiện kích hoạt thuật toán Adaptive TDEE', () => {
    const mockUserId = 'user-1';
    const mockProfileId = 'profile-1';

    beforeEach(() => {
      // Mock user lookup internally used by getProfileId
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: mockUserId,
        profile: { id: mockProfileId },
      });
    });

    test('TC_WB_17.1.1: should return INSUFFICIENT_DATA when length=0 (0 logs)', async () => {
      // Arrange
      (prisma.weightLog.findMany as jest.Mock).mockResolvedValue([]);

      // Act
      const result = await service.getAdaptiveAnalytics(mockUserId);

      // Assert - Strict expect
      expect(result).toEqual({
        status: 'INSUFFICIENT_DATA',
        message: 'Need at least 2 weights over 14 days',
      });
      expect(scientificService.calculateAdaptiveTDEE).not.toHaveBeenCalled();
    });

    test('TC_WB_17.1.2: should return INSUFFICIENT_DATA when length=1 (1 log)', async () => {
      // Arrange
      (prisma.weightLog.findMany as jest.Mock).mockResolvedValue([{ trendWeight: 75.5 }]);

      // Act
      const result = await service.getAdaptiveAnalytics(mockUserId);

      // Assert
      expect(result.status).toEqual('INSUFFICIENT_DATA');
      expect(scientificService.calculateAdaptiveTDEE).not.toHaveBeenCalled();
    });

    test('TC_WB_17.1.3: should call calculateAdaptiveTDEE when sufficient logs provided (>= 2 logs in 14 days)', async () => {
      // Arrange
      const mockWeightLogs = [
        { trendWeight: 75.5, createdAt: new Date('2024-01-01') },
        { trendWeight: 74.3, createdAt: new Date('2024-01-14') }, // weightChange = -1.2
      ];
      const mockMeals = [
        { calories: 2000, date: new Date('2024-01-01') },
        // Simulate total 28000 calories over 14 days = avgIntake 2000
      ];
      (prisma.weightLog.findMany as jest.Mock).mockResolvedValue(mockWeightLogs);
      (prisma.meal.findMany as jest.Mock).mockResolvedValue(mockMeals);
      
      (scientificService.calculateAdaptiveTDEE as jest.Mock).mockReturnValue(2660);
      (scientificService.predictPlateau as jest.Mock).mockReturnValue(false);
      (scientificService.getTrajectory as jest.Mock).mockReturnValue([]);

      // Act
      const result = await service.getAdaptiveAnalytics(mockUserId);

      // Assert
      expect(result.status).toEqual('SUCCESS');
      expect(scientificService.calculateAdaptiveTDEE).toHaveBeenCalled();
      expect(result).toMatchObject({
        currentTrendWeight: 74.3,
        weightChange14d: -1.2,
        avgIntake14d: Math.round(2000 / 14), // Because meal sum = 2000, avg = 2000/14 = 143
        adaptiveTDEE: 2660,
        isPlateau: false,
      });
    });
  });
});
