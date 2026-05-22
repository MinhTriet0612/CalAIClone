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

  test('TC_BB_16.1.1 — Chat dinh dưỡng → Trả lời bình thường', async ({ page }) => {
    // MOCK: Chặn gọi API Gemini thật để test Frontend độc lập, trả về chuỗi phản hồi tĩnh
    await page.route('**/api/chat/meat', async (route) => {
      await route.fulfill({
        status: 200,
        json: { reply: 'Thịt gà chứa khoảng 27g protein.' }
      });
    });

    // Act: Gõ và gửi tin nhắn
    await page.fill('input[type="text"]', 'Lượng đạm của thịt gà?');
    await page.click('button[type="submit"]');

    // Assert UI: Phải hiện tin nhắn đang loading, sau đó sinh ra đoạn chat của AI
    await expect(page.locator('.chat-message.assistant').last()).toContainText('Thịt gà chứa khoảng 27g protein.');
  });

  test('TC_BB_16.1.2 — Hỏi trị bệnh → Cảnh báo y khoa', async ({ page }) => {
    await page.route('**/api/chat/meat', async (route) => {
      await route.fulfill({
        status: 200,
        json: { reply: 'Xin lưu ý đây không phải là lời khuyên y tế. Vui lòng tham khảo bác sĩ.' }
      });
    });

    await page.fill('input[type="text"]', 'Đau dạ dày thì kê thuốc gì?');
    await page.click('button[type="submit"]');

    await expect(page.locator('.chat-message.assistant').last()).toContainText('lời khuyên y tế');
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
    await expect(page.getByText('Xin vui lòng kiểm tra kết nối đường truyền')).toBeVisible();
  });
});
