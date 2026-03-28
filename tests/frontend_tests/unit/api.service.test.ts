import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';

// We test the API module's exported functions by mocking axios
vi.mock('axios', () => {
  const mockAxios = {
    create: vi.fn(() => mockAxios),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    defaults: {
      headers: {
        common: {} as Record<string, string | undefined>,
      },
    },
  };
  return { default: mockAxios };
});

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('setAuthToken', () => {
    it('should store token in localStorage when token is provided', async () => {
      // Import fresh to trigger module evaluation
      const { setAuthToken } = await import('../../../frontend/src/services/api');

      setAuthToken('test-token-123');

      expect(localStorage.getItem('jwt_token')).toBe('test-token-123');
    });

    it('should remove token from localStorage when null is passed', async () => {
      localStorage.setItem('jwt_token', 'old-token');

      const { setAuthToken } = await import('../../../frontend/src/services/api');

      setAuthToken(null);

      expect(localStorage.getItem('jwt_token')).toBeNull();
    });
  });

  describe('authApi', () => {
    it('should have register method', async () => {
      const { authApi } = await import('../../../frontend/src/services/api');
      expect(authApi.register).toBeDefined();
      expect(typeof authApi.register).toBe('function');
    });

    it('should have login method', async () => {
      const { authApi } = await import('../../../frontend/src/services/api');
      expect(authApi.login).toBeDefined();
      expect(typeof authApi.login).toBe('function');
    });

    it('should have verify method', async () => {
      const { authApi } = await import('../../../frontend/src/services/api');
      expect(authApi.verify).toBeDefined();
      expect(typeof authApi.verify).toBe('function');
    });
  });

  describe('mealsApi', () => {
    it('should have all required methods', async () => {
      const { mealsApi } = await import('../../../frontend/src/services/api');
      expect(mealsApi.getDailySummary).toBeDefined();
      expect(mealsApi.analyzeMeal).toBeDefined();
      expect(mealsApi.logMeal).toBeDefined();
      expect(mealsApi.getHistory).toBeDefined();
    });
  });

  describe('onboardingApi', () => {
    it('should have all required methods', async () => {
      const { onboardingApi } = await import('../../../frontend/src/services/api');
      expect(onboardingApi.calculateRecommendations).toBeDefined();
      expect(onboardingApi.approveRecommendations).toBeDefined();
    });
  });

  describe('chatApi', () => {
    it('should have askMeatCoach method', async () => {
      const { chatApi } = await import('../../../frontend/src/services/api');
      expect(chatApi.askMeatCoach).toBeDefined();
    });
  });
});
