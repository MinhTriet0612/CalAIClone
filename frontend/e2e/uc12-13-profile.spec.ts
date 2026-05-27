import { test, expect, APIRequestContext } from '@playwright/test';

/**
 * UC-12 & UC-13: Manage Health Profile & Update Target Plan
 * Tuân thủ ISO 29119 - Black-box Testing (BVA) & Partial Update
 */
test.describe('UC-12 & UC-13: Profile & Targets Validation', () => {
  let apiContext: APIRequestContext;
  let token: string;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: 'http://127.0.0.1:3001',
    });

    const testEmail = `test.uc1213.${Date.now()}@example.com`;
    const testPassword = 'password123';

    // Register
    const registerRes = await apiContext.post('/api/auth/register', {
      data: { email: testEmail, password: testPassword }
    });
    expect(registerRes.ok()).toBeTruthy();
    
    // Login to get token
    const loginRes = await apiContext.post('/api/auth/login', {
      data: { email: testEmail, password: testPassword }
    });
    const loginData = await loginRes.json();
    token = loginData.accessToken;
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // ========================================================
  // UC-12: Quản lý hồ sơ sức khỏe (FR_12.1: Cập nhật cân nặng)
  // ========================================================
  test.describe('FR_12.1: Cập nhật cân nặng (Partial Update, 30kg - 300kg)', () => {
    
    test('TC_BB_12.1.1 — Cân nặng dưới Min (29kg) → Từ chối', async () => {
      const res = await apiContext.put('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
        data: { weight: 29 }
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      expect(JSON.stringify(data.message)).toContain('Cân nặng tối thiểu 30 kg');
    });

    test('TC_BB_12.1.2 — Cân nặng bằng Min (30kg) → Chấp nhận', async () => {
      const res = await apiContext.put('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
        data: { weight: 30 }
      });
      expect(res.status()).toBe(200);
    });

    test('TC_BB_12.1.3 — Cân nặng Nominal (75kg) → Chấp nhận', async () => {
      const res = await apiContext.put('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
        data: { weight: 75 }
      });
      expect(res.status()).toBe(200);
    });

    test('TC_BB_12.1.4 — Cân nặng bằng Max (300kg) → Chấp nhận', async () => {
      const res = await apiContext.put('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
        data: { weight: 300 }
      });
      expect(res.status()).toBe(200);
    });

    test('TC_BB_12.1.5 — Cân nặng vượt Max (301kg) → Từ chối', async () => {
      const res = await apiContext.put('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
        data: { weight: 301 }
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      expect(JSON.stringify(data.message)).toContain('Cân nặng tối đa 300 kg');
    });
  });

  // ========================================================
  // UC-13: Update Target Plan
  // ========================================================
  test.describe('FR_13.1 & FR_13.2: Ràng buộc Calories & Macros', () => {
    
    test('TC_BB_13.1.1 — Calo dưới mức tối thiểu (999) → Báo lỗi', async () => {
      const res = await apiContext.put('/api/users/targets', {
        headers: { Authorization: `Bearer ${token}` },
        data: { calories: 999, protein: 150, carbs: 250, fats: 65 }
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      expect(JSON.stringify(data.message)).toContain('Calo tối thiểu 1000 kcal');
    });

    test('TC_BB_13.1.2 — Calo bằng mức tối thiểu (1000) → Lưu thành công', async () => {
      const res = await apiContext.put('/api/users/targets', {
        headers: { Authorization: `Bearer ${token}` },
        data: { calories: 1000, protein: 150, carbs: 250, fats: 65 }
      });
      expect(res.status()).toBe(200);
    });

    test('TC_BB_13.2.1 — Protein dưới mức tối thiểu (49g) → Báo lỗi', async () => {
      const res = await apiContext.put('/api/users/targets', {
        headers: { Authorization: `Bearer ${token}` },
        data: { calories: 2000, protein: 49, carbs: 200, fats: 60 }
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      expect(JSON.stringify(data.message)).toContain('Protein tối thiểu 50g');
    });

    test('TC_BB_13.2.3 — Carbs dưới mức tối thiểu (49g) → Báo lỗi', async () => {
      const res = await apiContext.put('/api/users/targets', {
        headers: { Authorization: `Bearer ${token}` },
        data: { calories: 2000, protein: 150, carbs: 49, fats: 60 }
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      expect(JSON.stringify(data.message)).toContain('Carbs tối thiểu 50g');
    });

    test('TC_BB_13.2.5 — Fats dưới mức tối thiểu (19g) → Báo lỗi', async () => {
      const res = await apiContext.put('/api/users/targets', {
        headers: { Authorization: `Bearer ${token}` },
        data: { calories: 2000, protein: 150, carbs: 200, fats: 19 }
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      expect(JSON.stringify(data.message)).toContain('Fats tối thiểu 20g');
    });

    test('TC_BB_13.2.7 — Vi phạm nhiều trường cùng lúc → Trả về mảng lỗi', async () => {
      const res = await apiContext.put('/api/users/targets', {
        headers: { Authorization: `Bearer ${token}` },
        data: { calories: 999, protein: 49, carbs: 49, fats: 19 }
      });
      expect(res.status()).toBe(400);
      const data = await res.json();
      const errStr = JSON.stringify(data.message);
      expect(errStr).toContain('Calo tối thiểu 1000 kcal');
      expect(errStr).toContain('Protein tối thiểu 50g');
      expect(errStr).toContain('Carbs tối thiểu 50g');
      expect(errStr).toContain('Fats tối thiểu 20g');
    });
  });
});
