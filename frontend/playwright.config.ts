import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration
 * Maps to TC_BB_ test cases from báo cáo tiến độ (Chương V)
 *
 * Chạy: yarn test:e2e
 * Cần: Backend + Frontend dev server đang chạy
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // Chạy tuần tự để tránh conflict DB
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],

  use: {
    // Base URL của Frontend dev server
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Headless trong CI, có UI khi dev local
    headless: !!process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Tự động khởi động dev server trước khi chạy test
  webServer: {
    command: 'npx yarn dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
