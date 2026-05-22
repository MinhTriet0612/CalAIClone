# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: uc10-daily-summary.spec.ts >> UC-10: View Daily Summary - FR_10.3 >> TC_BB_10.4.1 - Kiểm tra thiếu target thì chuyển hướng setup, không hiển thị summary
- Location: e2e\uc10-daily-summary.spec.ts:23:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1').filter({ hasText: 'CalAI' }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('h1').filter({ hasText: 'CalAI' }).first()

```

```yaml
- heading "Welcome Back" [level=2]
- paragraph: Sign in to access your metabolic health dashboard
- text: Email Address
- textbox "Email Address":
  - /placeholder: e.g. nutrition@calai.com
- text: Password
- textbox "Password":
  - /placeholder: Min. 6 characters
- button "Sign In"
- button "Don't have an account? Sign up"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('UC-10: View Daily Summary - FR_10.3', () => {
  4  |   const testEmail = `test_ui_10_3_${Date.now()}@gmail.com`;
  5  | 
  6  |   test.beforeEach(async ({ page, request }) => {
  7  |     // Đăng ký tài khoản mới ngầm qua API để đảm bảo nhanh và không dính lỗi UI
  8  |     await request.post('http://localhost:3000/api/auth/register', {
  9  |       data: { email: testEmail, password: 'password123' }
  10 |     });
  11 | 
  12 |     await page.goto('/');
  13 | 
  14 |     // Màn hình Login
> 15 |     await expect(page.locator('h1').filter({ hasText: 'CalAI' }).first()).toBeVisible({ timeout: 10000 });
     |                                                                           ^ Error: expect(locator).toBeVisible() failed
  16 | 
  17 |     // Đăng nhập bằng tài khoản vừa tạo
  18 |     await page.locator('input[type="email"]').fill(testEmail);
  19 |     await page.locator('input[type="password"]').fill('password123');
  20 |     await page.getByRole('button', { name: 'Sign In' }).click();
  21 |   });
  22 | 
  23 |   test('TC_BB_10.4.1 - Kiểm tra thiếu target thì chuyển hướng setup, không hiển thị summary', async ({ page }) => {
  24 |     // Theo FR_10.3: Nếu người dùng chưa thiết lập mục tiêu dinh dưỡng, hệ thống phải
  25 |     // hiển thị thông báo yêu cầu thiết lập mục tiêu và không hiển thị tóm tắt.
  26 | 
  27 |     // Xác minh hệ thống đã chuyển hướng sang flow Onboarding thay vì Dashboard
  28 |     await expect(page.locator('.onboarding-container')).toBeVisible({ timeout: 5000 });
  29 |     
  30 |     // Kiểm tra thông điệp yêu cầu thiết lập (VD: "Choose your Gender" nằm ở step 1)
  31 |     await expect(page.locator('h2').filter({ hasText: 'Choose your Gender' })).toBeVisible();
  32 |     await expect(page.locator('p.subtitle').filter({ hasText: 'This will be used to calibrate your custom plan.' })).toBeVisible();
  33 | 
  34 |     // Đảm bảo tuyệt đối màn hình Dashboard (có class .dashboard) và tóm tắt KHÔNG được hiển thị
  35 |     await expect(page.locator('.dashboard')).not.toBeVisible();
  36 |     await expect(page.locator('.macro-targets-card')).not.toBeVisible();
  37 |   });
  38 | });
  39 | 
```