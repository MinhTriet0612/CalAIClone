import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    // 1. Setup Mocking & Sandbox Isolation (AAA: Arrange)
    const mockPrismaService = {
      profile: {
        update: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      targetPeriod: {
        findFirst: jest.fn(),
        updateMany: jest.fn(),
        create: jest.fn(),
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateTDEE (FR_12.2: Tính TDEE theo mức độ vận động)', () => {
    // Kiểm soát biến số: BMR = 1617.5 kcal (Như trong báo cáo)
    const BMR = 1617.5;

    test('TC_WB_12.2.1: should return 1941.0 kcal when activityLevel is "sedentary" (PAL=1.2)', () => {
      // Act
      const result = service.calculateTDEE(BMR, 'sedentary');
      // Assert - Strict expect
      expect(result).toBeCloseTo(1941.0, 1); // 1617.5 * 1.2
    });

    test('TC_WB_12.2.2: should return 2224.1 kcal when activityLevel is "light" (PAL=1.375)', () => {
      // Act
      const result = service.calculateTDEE(BMR, 'light');
      // Assert
      expect(result).toBeCloseTo(2224.0625, 1); // 1617.5 * 1.375
    });

    test('TC_WB_12.2.3: should return 2507.1 kcal when activityLevel is "moderate" (PAL=1.55)', () => {
      // Act
      const result = service.calculateTDEE(BMR, 'moderate');
      // Assert
      expect(result).toBeCloseTo(2507.125, 1); // 1617.5 * 1.55
    });

    test('TC_WB_12.2.4: should return 2790.2 kcal when activityLevel is "active" (PAL=1.725)', () => {
      // Act
      const result = service.calculateTDEE(BMR, 'active');
      // Assert
      expect(result).toBeCloseTo(2790.1875, 1); // 1617.5 * 1.725
    });

    test('TC_WB_12.2.5: should return 3073.3 kcal when activityLevel is "very_active" (PAL=1.9)', () => {
      // Act
      const result = service.calculateTDEE(BMR, 'very_active');
      // Assert
      expect(result).toBeCloseTo(3073.25, 1); // 1617.5 * 1.9
    });
  });

  describe('updateUserProfile with activityLevel change (Integration of FR_12.2)', () => {
    test('should auto-recalculate TDEE and update targets when activityLevel is provided', async () => {
      // Arrange
      const userId = 'user-1';
      const mockUpdatedProfile = {
        id: 'profile-1',
        userId: userId,
        weight: 75,
        height: 175,
        age: 30,
        gender: 'male',
        activityLevel: 'moderate', // PAL = 1.55
        goal: 'weight_loss',
      };
      const mockCurrentTargets = {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fats: 60,
      };

      (prisma.profile.update as jest.Mock).mockResolvedValue(mockUpdatedProfile);
      
      // Mock getUserTargets internally used by updateUserProfile
      const getUserTargetsSpy = jest.spyOn(service, 'getUserTargets').mockResolvedValue(mockCurrentTargets);
      const updateUserTargetsSpy = jest.spyOn(service, 'updateUserTargets').mockResolvedValue(undefined);

      // Act
      await service.updateUserProfile(userId, { activityLevel: 'moderate' });

      // Assert
      expect(prisma.profile.update).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        data: expect.objectContaining({ activityLevel: 'moderate' }),
      });
      
      expect(getUserTargetsSpy).toHaveBeenCalledWith('user-1');
      
      // Male BMR: 10*75 + 6.25*175 - 5*30 + 5 = 750 + 1093.75 - 150 + 5 = 1698.75
      // TDEE: 1698.75 * 1.55 = 2633.0625
      // Current Calories: 2000. Deficit/Surplus = 2000 - 2633.0625 = -633.0625
      // New target: max(1000, round(2633.0625 + (-633.0625))) = 2000 (Because it maintains the gap)
      expect(updateUserTargetsSpy).toHaveBeenCalledWith(
        'user-1',
        expect.objectContaining({ calories: 2000 }),
        'weight_loss'
      );
    });
  });
});
