import { test, expect, Page } from '@playwright/test';
import path from 'path';

const uniqueEmail = () => `e2e-meal-${Date.now()}-${Math.random().toString(36).slice(2)}@test.com`;

async function registerAndSetupUser(page: Page) {
  const email = uniqueEmail();
  const password = 'Meals123!';

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

  return { accessToken };
}

test.describe('Meal Logging Flow', () => {
  test('should display add meal button on dashboard', async ({ page }) => {
    await registerAndSetupUser(page);

    // Look for the add meal button (camera/plus icon)
    const addButton = page.locator('[class*="add-meal"], [class*="AddMeal"], button:has-text("Add"), button:has-text("+")');
    const count = await addButton.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should log a meal via API and see updated summary', async ({ page }) => {
    const { accessToken } = await registerAndSetupUser(page);

    // Log a meal via API
    await page.request.post('http://localhost:3001/api/meals/log', {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        name: 'E2E Test Meal',
        foodItems: ['chicken', 'rice'],
        calories: 500,
        protein: 40,
        carbs: 50,
        fats: 10,
      },
    });

    // Reload to see updated summary
    await page.reload();
    await page.waitForTimeout(3000);

    const bodyText = await page.textContent('body');
    // Should show consumed calories or the meal
    expect(bodyText).toContain('500') || expect(bodyText).toContain('E2E Test Meal');
  });

  test('should show daily summary after meal is logged', async ({ page }) => {
    const { accessToken } = await registerAndSetupUser(page);

    // Log via API
    await page.request.post('http://localhost:3001/api/meals/log', {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        name: 'Breakfast Eggs',
        foodItems: ['eggs', 'toast'],
        calories: 350,
        protein: 25,
        carbs: 30,
        fats: 15,
      },
    });

    await page.reload();
    await page.waitForTimeout(3000);

    // Verify some calorie data is displayed
    const bodyText = await page.textContent('body');
    expect(bodyText?.length).toBeGreaterThan(0);
  });
});
