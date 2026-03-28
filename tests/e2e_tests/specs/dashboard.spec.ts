import { test, expect, Page } from '@playwright/test';

const uniqueEmail = () => `e2e-dash-${Date.now()}-${Math.random().toString(36).slice(2)}@test.com`;

/**
 * Helper to register a user and complete onboarding via API
 */
async function registerAndSetupUser(page: Page) {
  const email = uniqueEmail();
  const password = 'Dashboard123!';

  // Register via API
  const registerResp = await page.request.post('http://localhost:3001/api/auth/register', {
    data: { email, password },
  });
  const { accessToken } = await registerResp.json();

  // Set macro targets to skip onboarding
  await page.request.put('http://localhost:3001/api/users/targets', {
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { calories: 2200, protein: 160, carbs: 260, fats: 70 },
  });

  // Set token in browser
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

  return { email, password, accessToken };
}

test.describe('Dashboard', () => {
  test('should display macro targets card', async ({ page }) => {
    await registerAndSetupUser(page);

    // Dashboard should show calorie/macro information
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeDefined();

    // Check for common dashboard elements
    const hasCalorieInfo =
      bodyText?.includes('Calories') ||
      bodyText?.includes('calories') ||
      bodyText?.includes('cal');
    expect(hasCalorieInfo).toBeTruthy();
  });

  test('should display navigation tabs', async ({ page }) => {
    await registerAndSetupUser(page);

    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Meat Chat')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
  });

  test('should navigate to Meat Chat page', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Meat Chat').click();
    await page.waitForTimeout(1000);

    // Should show chat interface
    const url = page.url();
    expect(url).toContain('/chat');
  });

  test('should navigate to Settings page', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Settings').click();
    await page.waitForTimeout(1000);

    const url = page.url();
    expect(url).toContain('/settings');
  });

  test('should show logout button', async ({ page }) => {
    await registerAndSetupUser(page);

    await expect(page.getByText('Logout')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await registerAndSetupUser(page);

    await page.getByText('Logout').click();
    await page.waitForTimeout(1000);

    // Should redirect to login
    await expect(page.getByText('Sign In')).toBeVisible({ timeout: 5000 });
  });
});
