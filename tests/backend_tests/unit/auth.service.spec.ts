import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../backend/src/auth/auth.service';
import { PrismaService } from '../../../backend/src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerDto = { email: 'test@example.com', password: 'password123' };

    it('should register a new user and return access token', async () => {
      const createdUser = {
        id: 'user-1',
        email: 'test@example.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      mockPrisma.user.create.mockResolvedValue(createdUser);
      mockJwtService.sign.mockReturnValue('jwt-token-123');

      const result = await service.register(registerDto);

      expect(result).toEqual({
        accessToken: 'jwt-token-123',
        user: {
          id: 'user-1',
          email: 'test@example.com',
          role: 'user',
        },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password: 'hashed-password',
          role: 'user',
        },
        select: expect.any(Object),
      });
    });

    it('should throw UnauthorizedException if user already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'existing-user' });

      await expect(service.register(registerDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('login', () => {
    const loginDto = { email: 'test@example.com', password: 'password123' };

    it('should return access token for valid credentials', async () => {
      const existingUser = {
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-password',
        role: 'user',
      };

      mockPrisma.user.findUnique.mockResolvedValue(existingUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('jwt-token-456');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        accessToken: 'jwt-token-456',
        user: {
          id: 'user-1',
          email: 'test@example.com',
          role: 'user',
        },
      });
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-password',
        role: 'user',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('validateUserById', () => {
    it('should return user data when found', async () => {
      const user = {
        id: 'user-1',
        email: 'test@example.com',
        role: 'user',
        age: 30,
        gender: 'male',
        height: 180,
        weight: 80,
        activityLevel: 'moderate',
        goal: 'maintenance',
        targetWeight: null,
        targetDate: null,
        dietaryPreferences: [],
        targetCalories: 2500,
        targetProtein: 150,
        targetCarbs: 300,
        targetFats: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(user);

      const result = await service.validateUserById('user-1');
      expect(result).toEqual(user);
    });

    it('should return null when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUserById('non-existent');
      expect(result).toBeNull();
    });
  });
});
