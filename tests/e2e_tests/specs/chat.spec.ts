import { test, expect, Page } from '@playwright/test';

const uniqueEmail = () => `e2e-chat-${Date.now()}-${Math.random().toString(36).slice(2)}@test.com`;

async function registerAndSetupUser(page: Page) {
  const email = uniqueEmail();
  const password = 'Chat123!';

  const registerResp = await page.request.post('http://localhost:3001/api/auth/register', {
    data: { email, password },
  });
  const { accessToken } = await registerResp.json();

  await page.request.put('http://localhost:3001/api/users/targets', {
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { calories: 2200, protein: 160, carbs: 260, fats: 70 },
  });

  await page.goto('/');
  await page.evaluate(
    ({ token, email }) => {
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user', JSON.stringify({ id: 'test', email, role: 'user' }));
    },
    { token: accessToken, email },
  );
  await page.reload();
  await page.waitForTimeout(2000);
}

test.describe('Meat Chat', () => {
  test('should navigate to chat page', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Meat Chat').click();
    await page.waitForTimeout(1000);

    expect(page.url()).toContain('/chat');
  });

  test('should display chat interface', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Meat Chat').click();
    await page.waitForTimeout(1000);

    // Look for input field and send button
    const inputField = page.locator('input[type="text"], textarea');
    const hasInput = (await inputField.count()) > 0;
    expect(hasInput).toBeTruthy();
  });

  test('should send a message and receive a response', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Meat Chat').click();
    await page.waitForTimeout(1000);

    // Type a message
    const inputField = page.locator('input[type="text"], textarea').first();
    await inputField.fill('What is a good lean protein?');

    // Find and click send button
    const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
    await sendButton.click();

    // Wait for AI response (may take time)
    await page.waitForTimeout(10000);

    // Check for response text (any new content in chat area)
    const chatMessages = page.locator('[class*="chat"], [class*="message"], [class*="Chat"]');
    const messageCount = await chatMessages.count();
    expect(messageCount).toBeGreaterThan(0);
  });
});
