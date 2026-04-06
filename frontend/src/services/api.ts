import axios from 'axios';
import type { MealAnalysis, DailySummary, MacroTargets, ChatMessage } from '../../../shared/types';

// CreateMealDto interface for frontend
interface CreateMealDto {
  name: string;
  foodItems: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imageUrl?: string;
  healthScore?: number;
  date?: string;
}

const TOKEN_KEY = 'jwt_token';

// Get token from localStorage
const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token from localStorage and log requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage for every request
    const token = getTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const fullURL = `${config.baseURL}${config.url}`;
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: fullURL,
      hasToken: !!token,
      headers: {
        ...config.headers,
        Authorization: config.headers.Authorization ? 'Bearer ***' : undefined,
      },
    });
    console.log(`📡 Making ${config.method?.toUpperCase()} request to: ${fullURL}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - log all responses and handle 401 errors
api.interceptors.response.use(
  (response) => {
    const fullURL = `${response.config.baseURL}${response.config.url}`;
    console.log('✅ API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      fullURL: fullURL,
      data: response.data,
    });
    console.log(`✅ ${response.config.method?.toUpperCase()} ${fullURL} - Status: ${response.status}`);
    return response;
  },
  async (error) => {
    const fullURL = error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown';
    
    // Handle 401 Unauthorized - token is invalid or expired
    // DO NOT reload if we are on the login/register page as 401 there just means "wrong credentials"
    const isAuthRequest = error.config.url?.includes('/auth/login') || error.config.url?.includes('/auth/register');
    
    if (error.response?.status === 401 && error.config && !error.config._retry && !isAuthRequest) {
      error.config._retry = true;
      console.log('🔒 401 Unauthorized - Token invalid or expired');
      console.log('🚪 Clearing auth and redirecting to login...');
      
      // Clear localStorage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('user');
      
      // Reload page to show login screen
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
      return Promise.reject(error);
    }
    
    console.error('❌ Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      fullURL: fullURL,
      message: error.message,
      data: error.response?.data,
    });
    if (error.config) {
      console.error(`❌ ${error.config.method?.toUpperCase()} ${fullURL} - Status: ${error.response?.status || 'Network Error'}`);
    }
    return Promise.reject(error);
  }
);

// Add auth token interceptor
export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('🔑 Auth token set and saved to localStorage');
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common['Authorization'];
    console.log('🔓 Auth token removed from localStorage');
  }
}

// Auth API
export const authApi = {
  register: async (email: string, password: string) => {
    return api.post('/auth/register', { email, password });
  },

  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },

  verify: async () => {
    return api.post('/auth/verify');
  },
};

// Meals API
export const mealsApi = {
  // Get daily summary (targets, consumed, remaining, meals)
  getDailySummary: async (date?: string): Promise<DailySummary> => {
    const params = date ? { date } : {};
    const response = await api.get<DailySummary>('/meals/daily-summary', { params });
    return response.data;
  },

  // Analyze meal image
  analyzeMeal: async (imageFile: File): Promise<MealAnalysis> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post<MealAnalysis>('/meals/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Log a meal
  logMeal: async (mealData: CreateMealDto): Promise<DailySummary> => {
    const response = await api.post<DailySummary>('/meals/log', mealData);
    return response.data;
  },

  // Get history for a date range
  getHistory: async (startDate: string, endDate: string): Promise<DailySummary[]> => {
    const response = await api.get<DailySummary[]>('/meals/history', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};

export interface OnboardingData {
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  targetWeight?: number; // kg
  birthDate: string; // YYYY-MM-DD
  workoutsPerWeek: number;
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance';
}

export interface OnboardingRecommendations extends MacroTargets {
  estimatedDays?: number;
  projectedDate?: string;
}

export const onboardingApi = {
  // Calculate recommendations based on onboarding data
  calculateRecommendations: async (data: OnboardingData): Promise<OnboardingRecommendations> => {
    const response = await api.post<OnboardingRecommendations>('/onboarding/calculate', data);
    return response.data;
  },

  // Approve and save recommendations
  approveRecommendations: async (targets: MacroTargets & Partial<OnboardingData>): Promise<{ message: string; targets: MacroTargets }> => {
    const response = await api.post('/onboarding/approve', targets);
    return response.data;
  },
};

export const usersApi = {
  // Get current user info
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

export const chatApi = {
  askMeatCoach: async (prompt: string, history: ChatMessage[] = []) => {
    const response = await api.post<{ reply: string }>('/chat/meat', { prompt, history });
    return response.data;
  },
};

export const targetPeriodsApi = {
  // Get historical targets for a date
  getTargets: async (date: string): Promise<MacroTargets> => {
    const response = await api.get<MacroTargets>('/target-periods', { params: { date } });
    return response.data;
  },
};

export default api;
