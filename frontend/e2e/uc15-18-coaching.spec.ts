import { test, expect } from '@playwright/test';

/**
 * UC-15 & UC-18: Adaptive TDEE & Plateau Alert
 * Tuân thủ ISO 29119 - Black-box Testing với Mocked API Responses
 */
test.describe('UC-15 & UC-18: Coaching Analytics (FR_15.1 & FR_18.1)', () => {
  let testEmail: string;
  const testPassword = 'password123';

  test.beforeEach(async ({ request, page }) => {
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    
    // 1. Đăng ký User ảo nhanh qua Backend
    testEmail = `test.uc15.${Date.now()}_${Math.random()}@example.com`;
    const backendUrl = 'http://localhost:3001';
    await request.post(`${backendUrl}/api/auth/register`, {
      data: { email: testEmail, password: testPassword }
    });
  });

  const performLoginAndOnboarding = async (page: any) => {
    await page.goto('/');
    
    // Đăng nhập
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');

    // Onboarding
    await expect(page.getByText('Choose your Gender')).toBeVisible({ timeout: 10000 });
    await page.click('button.continue-button'); // Step 1

    await page.fill('input#height', '170');
    await page.fill('input#weight', '65');
    await page.click('button.continue-button'); // Step 2

    await page.fill('input#birthDate', '1995-01-01');
    await page.click('button.continue-button'); // Step 3

    await page.click('button.continue-button'); // Step 4
    await page.click('button.continue-button'); // Step 5
    await page.click('button.approve-button'); // Step 6

    await expect(page.getByText('Scientific Coaching Intelligence')).toBeVisible({ timeout: 10000 });
  };

  test('TC_BB_15.1.2 — Thiếu dữ liệu 14 ngày → UI thông báo Insufficient Data', async ({ page }) => {
    await page.route('**/api/coaching/analytics', async (route) => {
      await route.fulfill({
        status: 200,
        json: { status: 'INSUFFICIENT_DATA', message: 'Dữ liệu chưa đủ để phân tích' }
      });
    });

    await performLoginAndOnboarding(page);

    // UI: Hiển thị thông báo chưa đủ dữ liệu
    await expect(page.locator('.insufficient-data')).toBeVisible();
    await expect(page.getByText('Dữ liệu chưa đủ để phân tích')).toBeVisible();
  });

  test('TC_BB_15.1.3 — Chỉ có 1 ngày dữ liệu → UI thông báo Cần nhập thêm', async ({ page }) => {
    await page.route('**/api/coaching/analytics', async (route) => {
      await route.fulfill({
        status: 200,
        json: { status: 'INSUFFICIENT_DATA', message: 'Cần nhập thêm độ chênh lệch cân nặng để thiết lập' }
      });
    });

    await performLoginAndOnboarding(page);

    await expect(page.locator('.insufficient-data')).toBeVisible();
    await expect(page.getByText('Cần nhập thêm độ chênh lệch cân nặng để thiết lập')).toBeVisible();
  });

  test('TC_BB_15.1.1 — Tài khoản đã có dữ liệu → Hiện đồ thị/nút Cập nhật TDEE', async ({ page }) => {
    await page.route('**/api/coaching/analytics', async (route, request) => {
      if (request.method() === 'OPTIONS') {
        await route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' } });
        return;
      }
      await route.fulfill({
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        json: { 
          status: 'SUCCESS', 
          adaptiveTDEE: 9999, 
          isPlateau: false,
          weightChange14d: -1.0
        }
      });
    });

    // Mock API Update Target
    await page.route('**/api/users/targets', async (route) => {
      await route.fulfill({ status: 200, json: { success: true } });
    });

    // Mock window.alert để bắt thông báo "Nutrition plan successfully updated"
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('successfully updated');
      await dialog.accept();
    });

    await performLoginAndOnboarding(page);

    // UI: Kiểm tra nút Apply xuất hiện
    const applyBtn = page.getByRole('button', { name: /Apply 9999 kcal Target/i });
    await expect(applyBtn).toBeVisible();

    // Click và expect dialog nhảy ra (đã handle ở trên)
    await applyBtn.click();
  });

  test('TC_BB_18.1.1 — Thâm hụt bão hòa (Plateau) → UI bật Alert', async ({ page }) => {
    await page.route('**/api/coaching/analytics', async (route, request) => {
      if (request.method() === 'OPTIONS') {
        await route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' } });
        return;
      }
      await route.fulfill({
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        json: { 
          status: 'SUCCESS', 
          adaptiveTDEE: 2000, 
          isPlateau: true,
          weightChange14d: 0.0
        }
      });
    });

    await performLoginAndOnboarding(page);

    // UI: Cảnh báo Plateau phải xuất hiện
    await expect(page.locator('.plateau-alert')).toBeVisible();
    await expect(page.getByText('Metabolic Shift')).toBeVisible();
  });
});
