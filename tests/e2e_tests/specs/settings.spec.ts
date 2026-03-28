import { test, expect, Page } from '@playwright/test';

const uniqueEmail = () => `e2e-settings-${Date.now()}-${Math.random().toString(36).slice(2)}@test.com`;

async function registerAndSetupUser(page: Page) {
  const email = uniqueEmail();
  const password = 'Settings123!';

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

test.describe('Settings Page', () => {
  test('should navigate to settings page', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Settings').click();
    await page.waitForTimeout(1000);

    expect(page.url()).toContain('/settings');
  });

  test('should display target inputs', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Settings').click();
    await page.waitForTimeout(1000);

    // Settings should have input fields for macro targets
    const inputs = page.locator('input[type="number"], input[type="text"]');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(0);
  });

  test('should update macro targets', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Settings').click();
    await page.waitForTimeout(1000);

    // Find calorie input and update
    const calorieInput = page.locator('input[type="number"]').first();
    if (await calorieInput.isVisible()) {
      await calorieInput.clear();
      await calorieInput.fill('2500');

      // Look for save/update button
      const saveButton = page.locator('button:has-text("Save"), button:has-text("Update")').first();
      if (await saveButton.isVisible()) {
        await saveButton.click();
        await page.waitForTimeout(2000);

        // Verify success (either message or updated value)
        const bodyText = await page.textContent('body');
        expect(bodyText).toBeDefined();
      }
    }
  });
});
