import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../../backend/src/auth/guards/jwt-auth.guard';
import { PrismaService } from '../../../backend/src/prisma/prisma.service';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-jwt-secret'),
  };

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
  };

  const createMockContext = (authHeader?: string): ExecutionContext => {
    const request = {
      headers: {
        authorization: authHeader,
      },
      user: null,
    };

    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    jest.clearAllMocks();
    mockConfigService.get.mockReturnValue('test-jwt-secret');
  });

  it('should throw UnauthorizedException when no token is provided', async () => {
    const context = createMockContext();

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException for non-Bearer token', async () => {
    const context = createMockContext('Basic some-token');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return true and set user for valid token', async () => {
    const context = createMockContext('Bearer valid-token');
    const user = { id: 'user-1', email: 'test@example.com', role: 'user' };

    mockJwtService.verifyAsync.mockResolvedValue({ sub: 'user-1' });
    mockPrisma.user.findUnique.mockResolvedValue(user);

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    const request = context.switchToHttp().getRequest();
    expect(request.user).toEqual(user);
  });

  it('should throw UnauthorizedException for invalid token', async () => {
    const context = createMockContext('Bearer invalid-token');

    mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when user not found in DB', async () => {
    const context = createMockContext('Bearer valid-token');

    mockJwtService.verifyAsync.mockResolvedValue({ sub: 'deleted-user' });
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
