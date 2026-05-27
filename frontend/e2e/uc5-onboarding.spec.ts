import { test, expect } from '@playwright/test';

/**
 * UC-5: Establish Nutrition Plan (FR_05.3 - Validate Chiều cao)
 * Tuân thủ ISO 29119 - Black-box Testing (BVA)
 */
test.describe('UC-5: Establish Nutrition Plan (FR_05.3)', () => {
  let testEmail: string;
  let testPassword = 'password123';

  test.beforeEach(async ({ page, request }) => {
    const testEmail = `test.uc5.${Date.now()}_${Math.random()}@example.com`;
    const backendUrl = 'http://127.0.0.1:3001'; 
    await request.post(`${backendUrl}/api/auth/register`, {
      data: { email: testEmail, password: testPassword }
    });

    await page.goto('/');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');

    // Chờ giao diện Onboarding Step 1 xuất hiện
    await expect(page.getByText('Choose your Gender')).toBeVisible({ timeout: 10000 });
    // Bấm chọn giới tính (nếu cần) và Continue sang Step 2
    await page.click('button.continue-button'); 
    
    // Đã sang Step 2 (Chiều cao, Cân nặng)
    await expect(page.locator('input#height')).toBeVisible();
  });

  test('TC_BB_05.3.1 — Chiều cao dưới Min (99cm) → Hệ thống từ chối', async ({ page }) => {
    await page.fill('input#height', '99');
    await page.fill('input#weight', '70');
    await page.click('button.continue-button'); // to step 3
    await page.fill('input#birthDate', '1990-01-01');
    await page.click('button.continue-button'); // to step 4
    await page.click('button.continue-button'); // to step 5
    await page.click('button.continue-button'); // trigger api
    
    // Mong đợi lỗi từ Backend trả về hiển thị lên Toast hoặc Error message
    await expect(page.getByText(/Chiều cao tối thiểu/i)).toBeVisible();
  });

  test('TC_BB_05.3.2 — Chiều cao bằng Min (100cm) → Chuyển bước thành công', async ({ page }) => {
    await page.fill('input#height', '100');
    await page.fill('input#weight', '70');
    await page.click('button.continue-button');
    
    // Sang step 3 (Birth Date)
    await expect(page.getByText('When were you born?')).toBeVisible();
  });

  test('TC_BB_05.3.3 — Chiều cao Nominal (170cm) → Chuyển bước thành công', async ({ page }) => {
    await page.fill('input#height', '170');
    await page.fill('input#weight', '70');
    await page.click('button.continue-button');
    
    await expect(page.getByText('When were you born?')).toBeVisible();
  });

  test('TC_BB_05.3.4 — Chiều cao bằng Max (250cm) → Chuyển bước thành công', async ({ page }) => {
    await page.fill('input#height', '250');
    await page.fill('input#weight', '70');
    await page.click('button.continue-button');
    
    await expect(page.getByText('When were you born?')).toBeVisible();
  });

  test('TC_BB_05.3.5 — Chiều cao vượt Max (251cm) → Hệ thống từ chối', async ({ page }) => {
    await page.fill('input#height', '251');
    await page.fill('input#weight', '70');
    await page.click('button.continue-button'); // to step 3
    await page.fill('input#birthDate', '1990-01-01');
    await page.click('button.continue-button'); // to step 4
    await page.click('button.continue-button'); // to step 5
    await page.click('button.continue-button'); // trigger api
    
    await expect(page.getByText(/Chiều cao tối đa/i)).toBeVisible();
  });
});
