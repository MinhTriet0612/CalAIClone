import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../backend/src/users/users.service';
import { PrismaService } from '../../../backend/src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;

  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user with hashed password', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pw');
      mockPrisma.user.create.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createUser('test@example.com', 'password123');

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(result.email).toBe('test@example.com');
      expect(result.role).toBe('user');
    });

    it('should create an admin user when role specified', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pw');
      mockPrisma.user.create.mockResolvedValue({
        id: 'admin-1',
        email: 'admin@example.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await service.createUser('admin@example.com', 'password123', 'admin');

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'admin@example.com',
          password: 'hashed-pw',
          role: 'admin',
        },
        select: expect.any(Object),
      });
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const user = {
        id: 'user-1',
        email: 'test@example.com',
        role: 'user',
        age: 30,
        targetCalories: 2000,
        targetProtein: 150,
        targetCarbs: 250,
        targetFats: 65,
      };

      mockPrisma.user.findUnique.mockResolvedValue(user);

      const result = await service.getUserById('user-1');
      expect(result).toEqual(user);
    });

    it('should return null for non-existent user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.getUserById('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('validateUser', () => {
    it('should return user without password for valid credentials', async () => {
      const user = {
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-pw',
        role: 'user',
      };

      mockPrisma.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(result).toEqual({
        id: 'user-1',
        email: 'test@example.com',
        role: 'user',
      });
      expect(result).not.toHaveProperty('password');
    });

    it('should return null for wrong password', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-pw',
        role: 'user',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrong');
      expect(result).toBeNull();
    });

    it('should return null for non-existent email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser('nope@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('updateUserProfile', () => {
    it('should update user profile', async () => {
      mockPrisma.user.update.mockResolvedValue({});

      const profile = {
        age: 30,
        gender: 'male' as const,
        height: 180,
        weight: 80,
        activityLevel: 'moderate' as const,
        goal: 'maintenance' as const,
      };

      await service.updateUserProfile('user-1', profile);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: expect.objectContaining({
          age: 30,
          gender: 'male',
          height: 180,
          weight: 80,
        }),
      });
    });
  });

  describe('updateUserTargets', () => {
    it('should update macro targets', async () => {
      mockPrisma.user.update.mockResolvedValue({});

      const targets = { calories: 2500, protein: 180, carbs: 280, fats: 75 };

      await service.updateUserTargets('user-1', targets);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: {
          targetCalories: 2500,
          targetProtein: 180,
          targetCarbs: 280,
          targetFats: 75,
        },
      });
    });
  });

  describe('getUserTargets', () => {
    it('should return macro targets', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        targetCalories: 2000,
        targetProtein: 150,
        targetCarbs: 250,
        targetFats: 65,
      });

      const result = await service.getUserTargets('user-1');

      expect(result).toEqual({
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65,
      });
    });

    it('should return null if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.getUserTargets('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('updateUserRole', () => {
    it('should update user role', async () => {
      mockPrisma.user.update.mockResolvedValue({});

      await service.updateUserRole('user-1', 'admin');

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { role: 'admin' },
      });
    });
  });
});
