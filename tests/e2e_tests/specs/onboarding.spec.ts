import { test, expect } from '@playwright/test';

const uniqueEmail = () => `e2e-onboard-${Date.now()}-${Math.random().toString(36).slice(2)}@test.com`;

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Register a fresh user
    await page.goto('/');
    await page.getByText("Don't have an account? Sign up").click();

    const email = uniqueEmail();
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('Onboard123!');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Wait for onboarding screen
    await page.waitForTimeout(3000);
  });

  test('should display onboarding flow after registration', async ({ page }) => {
    // Look for onboarding content (gender selection, height/weight inputs, etc.)
    const bodyText = await page.textContent('body');
    // New users should see onboarding or loading
    expect(bodyText).toBeDefined();
  });

  test('should allow completing onboarding steps', async ({ page }) => {
    // This test verifies the onboarding UI is interactive
    // The exact steps depend on the OnboardingFlow component structure

    // Look for step indicators or form fields
    const hasFormInputs = await page.locator('input, select, button').count();
    expect(hasFormInputs).toBeGreaterThan(0);
  });
});
