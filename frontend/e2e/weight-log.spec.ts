import { test, expect } from '@playwright/test';

/**
 * UC-14: Theo dõi Xu hướng Cân nặng
 * Tuân thủ ISO 29119 - Black-box Testing
 */
test.describe('UC-14: Monitor Weight Trends (FR_14.1)', () => {
  test.beforeEach(async ({ page, request }) => {
    const testEmail = `test.uc14.${Date.now()}_${Math.random()}@example.com`;
    const testPassword = 'password123';

    // API Cấp tốc: Tạo user mới qua Backend để đảm bảo Idempotency
    const backendUrl = 'http://localhost:3001'; 
    await request.post(`${backendUrl}/api/auth/register`, {
      data: { email: testEmail, password: testPassword }
    });

    // Đi tới trang đăng nhập
    await page.goto('/');
    
    // Đăng nhập
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');

    // Cần hoàn thành Onboarding (Mặc định khi tạo user mới)
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

    // Đợi Dashboard load xong
    await expect(page.getByText('Scientific Coaching Intelligence')).toBeVisible({ timeout: 10000 });
  });

  test('TC_BB_14.1.1 — Cân nặng bằng Min (20.0kg) → Lưu thành công', async ({ page }) => {
    // Mở Modal
    await page.click('button.weight-log-btn');
    await expect(page.locator('.weight-log-modal')).toBeVisible();

    // Nhập và Submit
    await page.fill('input#weight', '20.0');
    await page.click('button.submit-btn');

    // UI: Đợi modal đóng (thành công)
    await expect(page.locator('.weight-log-modal')).toBeHidden();
  });

  test('TC_BB_14.1.2 — Cân nặng dưới Min (19.9kg) → UI báo lỗi', async ({ page }) => {
    await page.click('button.weight-log-btn');
    await expect(page.locator('.weight-log-modal')).toBeVisible();

    await page.fill('input#weight', '19.9');
    await page.click('button.submit-btn');

    // UI: Hiện lỗi Backend quăng ra
    await expect(page.getByText('Cân nặng phải lớn hơn 20kg')).toBeVisible();
    await expect(page.locator('.weight-log-modal')).toBeVisible(); // Không đóng modal
  });

  test('TC_BB_14.1.3 — Cân nặng Nominal (65.5kg) → Vẽ đồ thị', async ({ page }) => {
    await page.click('button.weight-log-btn');
    
    await page.fill('input#weight', '65.5');
    await page.click('button.submit-btn');

    await expect(page.locator('.weight-log-modal')).toBeHidden();
    // Đồ thị History.tsx trong CalAI thường nằm trong class .history-container
    await expect(page.locator('.history-container')).toBeVisible();
  });

  test('TC_BB_14.1.4 — Cân nặng bằng Max (300.0kg) → Lưu thành công', async ({ page }) => {
    await page.click('button.weight-log-btn');
    
    await page.fill('input#weight', '300.0');
    await page.click('button.submit-btn');

    await expect(page.locator('.weight-log-modal')).toBeHidden();
  });

  test('TC_BB_14.1.5 — Cân nặng vượt Max (300.1kg) → UI cảnh báo', async ({ page }) => {
    await page.click('button.weight-log-btn');
    
    await page.fill('input#weight', '300.1');
    await page.click('button.submit-btn');

    // UI: Hiện lỗi Backend
    await expect(page.getByText('Cân nặng vượt giới hạn cho phép')).toBeVisible();
    await expect(page.locator('.weight-log-modal')).toBeVisible();
  });
});
