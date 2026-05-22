import { test, expect } from '@playwright/test';

/**
 * UC-16: Request Nutritional Advice (Meat Chat AI)
 * Tuân thủ ISO 29119 - Black-box Testing với Mocked API Responses (Gemini)
 */
test.describe('UC-16: Meat Chat AI (FR_16.1)', () => {
  let testEmail: string;
  const testPassword = 'password123';

  test.beforeEach(async ({ page, request }) => {
    // Tạo user và Setup môi trường nhanh
    testEmail = `test.uc16.${Date.now()}_${Math.random()}@example.com`;
    const backendUrl = 'http://localhost:3001';
    await request.post(`${backendUrl}/api/auth/register`, {
      data: { email: testEmail, password: testPassword }
    });

    await page.goto('/');
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

    // Chuyển sang Tab Meat Chat
    await page.click('nav.app-nav a[href="/chat"]');
    await expect(page.locator('h2:has-text("Meat Chat")')).toBeVisible();
  });

  test('TC_BB_16.1.1 & TC_BB_16.1.2 — Nhắn tin AI → UI hiển thị phản hồi mượt mà', async ({ page }) => {
    // MOCK: Chặn gọi API Gemini thật để test Frontend độc lập, trả về chuỗi phản hồi tĩnh
    await page.route('**/api/chat/meat', async (route) => {
      await route.fulfill({
        status: 200,
        json: { reply: 'Đây là lời khuyên dinh dưỡng từ AI.' }
      });
    });

    // Act: Gõ và gửi tin nhắn
    await page.fill('input[type="text"]', 'Hôm nay nên ăn gì?');
    await page.click('button[type="submit"]');

    // Assert UI: Phải hiện tin nhắn đang loading, sau đó sinh ra đoạn chat của AI
    await expect(page.locator('.chat-message.assistant').last()).toContainText('Đây là lời khuyên dinh dưỡng từ AI.');
  });

  test('TC_BB_16.1.3 — Mất mạng khi gọi API → UI cảnh báo rớt kết nối', async ({ page }) => {
    // MOCK: Giả lập kết nối mạng bị rớt (Abort Request)
    await page.route('**/api/chat/meat', async (route) => {
      await route.abort('failed');
    });

    // Act: Gõ và gửi tin nhắn
    await page.fill('input[type="text"]', 'Tôi muốn tăng cơ');
    await page.click('button[type="submit"]');

    // Assert UI: Không bị treo, phải bắn lỗi ra màn hình
    await expect(page.locator('.chat-error')).toBeVisible();
  });
});
