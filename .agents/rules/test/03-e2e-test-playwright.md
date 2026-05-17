# 03. QUY TẮC VIẾT E2E TEST (`TC_BB_`) — Playwright

### 1. Vị trí và đặt tên file

```
frontend/e2e/<use-case>.spec.ts
```

| Use Case | Tên file |
|---|---|
| UC-5 (Onboarding) | `onboarding.spec.ts` |
| UC-8 (Phân tích ảnh) | `meal-analysis.spec.ts` |
| UC-9 (Record Food) | `meal-record.spec.ts` |
| UC-12/14 (Cân nặng) | `weight-log.spec.ts` |
| UC-13 (Target Plan) | `target-plan.spec.ts` |
| UC-16 (Chat AI) | `nutrition-chat.spec.ts` |

### 2. Template chuẩn

```typescript
import { test, expect } from '@playwright/test';

/**
 * UC-XX: [Tên Use Case]
 * FR_XX.X: [Tên FR liên quan]
 * Phương pháp: [BVA / EP / Decision Table — lấy từ báo cáo]
 */
test.describe('UC-XX: [Tên]', () => {

  test.beforeEach(async ({ page }) => {
    // Setup: đăng nhập hoặc navigate đến trang cần test
    await page.goto('/path-to-page');
  });

  /**
   * TC_BB_XX.X.Y — [Tên test case từ cột "Kịch bản" trong báo cáo]
   * Input: [Dữ liệu đầu vào]
   * Expected: [Kết quả mong đợi — UI response]
   */
  test('TC_BB_XX.X.Y — [Mô tả ngắn]', async ({ page }) => {
    await page.fill('[data-testid="xxx-input"]', 'VALUE');
    await page.click('[data-testid="submit-btn"]');
    await expect(page.getByText('Thông báo mong đợi')).toBeVisible();
  });
});
```

### 3. Quy tắc bắt buộc cho E2E Test

**Về selector:**
- Dùng `data-testid` (ưu tiên cao nhất) → `page.getByRole()` → `page.getByText()`
- **KHÔNG dùng CSS class** làm selector — class thay đổi khi refactor UI sẽ gây fail test.
- **TRƯỚC KHI VIẾT**: Tìm selector trong source frontend (`grep -r "data-testid" frontend/src/`)

**Về assert:**
- Test **negative case** (báo lỗi): `await expect(page.locator('[data-testid="error-msg"]')).toBeVisible()`
- Test **positive case** (thành công): `await expect(page.getByText('...')).toBeVisible()`
- Dùng `toBeVisible()` thay vì `toHaveText()` nếu chỉ cần xác nhận hiện hiện.

**Về mock:**
- Các TC liên quan AI (UC-8, UC-16): **PHẢI mock** API call tới Gemini để tránh phụ thuộc network.
  ```typescript
  await page.route('**/api/meals/analyze', route => route.fulfill({
    body: JSON.stringify({ isFood: false }),
  }));
  ```

### 4. Playwright Stability Rules — Chống Flaky Test

> AI rất hay sinh ra `waitForTimeout()`. Rule này là **hard ban**.

**❌ Cấm tuyệt đối:**
```typescript
await page.waitForTimeout(3000);  // ❌ BANNED
await new Promise(r => setTimeout(r, 5000)); // ❌ BANNED
```

**✅ Dùng assertion-based waiting thay thế:**
```typescript
// Chờ element xuất hiện
await expect(page.getByTestId('success-toast')).toBeVisible();

// Chờ navigation hoàn tất
await page.waitForURL('**/dashboard');
```

> [!IMPORTANT]
> **`waitForResponse()` phải được gọi TRƯỚC khi trigger action.**
> Nếu API response về trước khi lệnh `waitForResponse()` được thực thi → miss response → test treo hoặc fail.

```typescript
// ✅ Đúng thứ tự — setup listener trước, trigger sau
const responsePromise = page.waitForResponse('**/api/weight-logs');
await page.click('[data-testid="submit-weight"]');
await responsePromise;

// ⚠️ Dễ race condition — API nhanh có thể về trước khi listener kịp đăng ký
await page.click('[data-testid="submit-weight"]');
await page.waitForResponse('**/api/weight-logs'); // có thể miss
```

**Bảng đối chiếu:**
| ❌ AI hay viết | ✅ Cách đúng |
|---|---|
| `waitForTimeout(3000)` | `expect(locator).toBeVisible()` |
| `waitForTimeout(5000)` | `waitForResponse('**/api/...')` |
| `sleep(2000)` | `waitForURL('/target-path')` |
| `waitForSelector('.class')` | `expect(page.getByRole('button')).toBeEnabled()` |

### 5. Prefer UI-first assertion
E2E là test user behavior, không phải network layer. Việc chờ network (`waitForResponse`) chỉ là **kỹ thuật đồng bộ hóa (synchronization)**, không phải là mục tiêu assertion chính.

**❌ Bad (Overfit vào network):**
```typescript
const res = await responsePromise;
expect(res.status()).toBe(200); // User không quan tâm status code
```

**✅ Good (Test behavior):**
```typescript
await responsePromise; // Chỉ để đồng bộ, chống flaky
await expect(page.getByTestId('success-toast')).toBeVisible(); // Đây mới là thứ user thấy
```
