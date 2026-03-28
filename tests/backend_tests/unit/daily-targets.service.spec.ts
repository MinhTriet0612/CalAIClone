import { Test, TestingModule } from '@nestjs/testing';
import { DailyTargetsService } from '../../../backend/src/daily-targets/daily-targets.service';
import { PrismaService } from '../../../backend/src/prisma/prisma.service';
import { UsersService } from '../../../backend/src/users/users.service';

describe('DailyTargetsService', () => {
  let service: DailyTargetsService;

  const mockPrisma = {
    dailyTarget: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  const mockUsersService = {
    getUserTargets: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyTargetsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<DailyTargetsService>(DailyTargetsService);
    jest.clearAllMocks();
  });

  describe('getTargetsForDate', () => {
    it('should return existing daily target', async () => {
      const existingTarget = {
        id: 'dt-1',
        userId: 'user-1',
        date: new Date('2024-01-15T00:00:00Z'),
        calories: 2500,
        protein: 180,
        carbs: 280,
        fats: 75,
      };

      mockPrisma.dailyTarget.findUnique.mockResolvedValue(existingTarget);

      const result = await service.getTargetsForDate('user-1', '2024-01-15');

      expect(result).toEqual({
        calories: 2500,
        protein: 180,
        carbs: 280,
        fats: 75,
      });
    });

    it('should auto-create from user defaults when missing', async () => {
      mockPrisma.dailyTarget.findUnique.mockResolvedValue(null);
      mockUsersService.getUserTargets.mockResolvedValue({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      });

      const createdTarget = {
        id: 'dt-new',
        userId: 'user-1',
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      };
      mockPrisma.dailyTarget.create.mockResolvedValue(createdTarget);

      const result = await service.getTargetsForDate('user-1', '2024-01-15', true);

      expect(result).toEqual({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      });
      expect(mockPrisma.dailyTarget.create).toHaveBeenCalled();
    });

    it('should return defaults without creating when autoCreate is false', async () => {
      mockPrisma.dailyTarget.findUnique.mockResolvedValue(null);
      mockUsersService.getUserTargets.mockResolvedValue({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      });

      const result = await service.getTargetsForDate('user-1', '2024-01-15', false);

      expect(result).toEqual({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      });
      expect(mockPrisma.dailyTarget.create).not.toHaveBeenCalled();
    });

    it('should use fallback defaults when user has no targets', async () => {
      mockPrisma.dailyTarget.findUnique.mockResolvedValue(null);
      mockUsersService.getUserTargets.mockResolvedValue(null);

      const createdTarget = {
        id: 'dt-default',
        userId: 'user-1',
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      };
      mockPrisma.dailyTarget.create.mockResolvedValue(createdTarget);

      const result = await service.getTargetsForDate('user-1', '2024-01-15', true);

      expect(result).toEqual({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      });
    });
  });

  describe('setDailyTargets', () => {
    it('should upsert daily targets', async () => {
      mockPrisma.dailyTarget.upsert.mockResolvedValue({});

      const targets = { calories: 2200, protein: 160, carbs: 260, fats: 70 };

      await service.setDailyTargets('user-1', '2024-01-15', targets);

      expect(mockPrisma.dailyTarget.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: expect.objectContaining({
            calories: 2200,
            protein: 160,
          }),
          create: expect.objectContaining({
            userId: 'user-1',
            calories: 2200,
          }),
        }),
      );
    });

    it('should clamp health score to 1-10', async () => {
      mockPrisma.dailyTarget.upsert.mockResolvedValue({});

      const targets = { calories: 2000, protein: 150, carbs: 250, fats: 65 };

      await service.setDailyTargets('user-1', '2024-01-15', targets, 15);

      expect(mockPrisma.dailyTarget.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: expect.objectContaining({
            healthScore: 10,
          }),
        }),
      );
    });
  });

  describe('deleteDailyTargets', () => {
    it('should delete daily targets for a date', async () => {
      mockPrisma.dailyTarget.deleteMany.mockResolvedValue({ count: 1 });

      await service.deleteDailyTargets('user-1', '2024-01-15');

      expect(mockPrisma.dailyTarget.deleteMany).toHaveBeenCalledWith({
        where: {
          userId: 'user-1',
          date: expect.any(Date),
        },
      });
    });
  });
});
