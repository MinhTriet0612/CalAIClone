# TESTING RULES — CalAI Clone (Nhóm 16)

> Tài liệu này là bộ quy tắc BẮT BUỘC khi dùng AI (GitHub Copilot, Cursor, v.v.)
> để viết test cho dự án. Mọi thành viên phải đọc trước khi generate test.

---

## ⚠️ GOLDEN RULE — Report ≠ Source of Truth

> **Đây là rule quan trọng nhất. Vi phạm rule này dẫn đến toàn bộ test suite vô nghĩa.**

**The report defines intended behavior. Actual implementation MUST be verified before writing any test.**

### Quy trình bắt buộc khi phát hiện lệch giữa báo cáo và code

```
Báo cáo nói A  ≠  Code làm B
         ↓
1. Kiểm tra xem B có đúng về mặt nghiệp vụ không
2. Thảo luận với team (KHÔNG tự quyết)
3. Chọn một trong hai:
   - Fix code → cho phù hợp báo cáo
   - Update báo cáo → ghi nhận thay đổi thiết kế
4. Sau đó mới viết test
```

### ❌ Tuyệt đối không làm

- **KHÔNG** sửa Expected Result trong `expect()` để test pass mà không cập nhật báo cáo.
- **KHÔNG** bỏ qua sự lệch nhau và cứ viết test theo code hiện tại mà không ghi chú.
- **KHÔNG** để AI tự quyết Expected Result — AI không đọc được báo cáo của bạn.

### ✅ Phải làm khi phát hiện lệch

```typescript
// ⚠️ LỆCH BÁO CÁO — cần team review
// Báo cáo (TC_BB_14.1.x): ràng buộc 20kg ≤ weight ≤ 300kg
// Code thực tế (CreateWeightLogDto): chỉ có @IsPositive(), không có @Min(20) / @Max(300)
// Quyết định: cần thêm @Min(20) @Max(300) vào DTO trước khi implement test này
// Người phụ trách: [tên thành viên] — ngày: [ngày phát hiện]
test.skip('TC_BB_14.1.2 — PENDING: DTO chưa có @Min(20)', ...);
```

### Ví dụ thực tế trong project này

| Báo cáo nói | Code hiện tại | Trạng thái |
|---|---|---|
| `TC_BB_14.1.x`: weight ∈ [20, 300] kg | `CreateWeightLogDto`: chỉ `@IsPositive()` | ⚠️ Cần fix DTO |
| `TC_WB_14.2.2`: EMA = 69.9 | `calculateEMA(69.0, 70.0, 0.1)` = 69.9 ✓ | ✅ Khớp |
| `TC_WB_15.2.1`: days=0 → trả về avgIntake | `if (days <= 0) return avgIntake` ✓ | ✅ Khớp |

---

## 0. QUY TẮC VỀ AI

Khi prompt AI viết test, **BẮT BUỘC cung cấp đủ 3 thông tin**:

1. Mã `TC_` từ báo cáo (VD: `TC_WB_14.2.1`)
2. File code liên quan (VD: `scientific.service.ts`)
3. Hành vi mong đợi theo báo cáo (Expected Result từ bảng TC)

**TUYỆT ĐỐI KHÔNG** để AI tự đặt tên test case — tên phải khớp chính xác mã TC trong báo cáo.

---

## 1. CẤU TRÚC THƯ MỤC TEST

```
backend/
├── src/
│   ├── scientific/
│   │   └── scientific.service.spec.ts   ← Unit Test (TC_WB_)
│   ├── meals/
│   │   └── meals.service.spec.ts         ← Unit Test (TC_WB_)
│   └── onboarding/
│       └── onboarding.service.spec.ts    ← Unit Test (TC_WB_)
├── test/
│   ├── helpers/
│   │   └── db-teardown.ts               ← Dọn DB giữa các E2E test
│   ├── meals.e2e-spec.ts             ← Supertest API test
│   ├── weight-logs.e2e-spec.ts       ← Supertest API test
│   └── jest-e2e.json                ← Jest config cho E2E

frontend/
└── e2e/                              ← Playwright (TC_BB_ UI)
    ├── playwright.config.ts
    ├── weight-log.spec.ts            ← TC_BB_14.1.x (nhập cân nặng)
    └── onboarding.spec.ts            ← TC_BB_05.x (form đăng ký)
```

---

## 2. PHÂN LOẠI TEST — ÁNH XẠ THEO BÁO CÁO

| Ký hiệu báo cáo | Tool viết test | Vị trí file | Lệnh chạy |
|---|---|---|---|
| `TC_WB_` (Hộp trắng) | **Jest** | `backend/src/**/*.spec.ts` | `npm test` |
| `TC_BB_` (Hộp đen) | **Playwright** | `frontend/e2e/**/*.spec.ts` | `yarn test:e2e` |

**KHÔNG dùng Supertest để implement `TC_BB_`** — báo cáo mô tả TC_BB theo góc nhìn UI ("Gõ vào TextBox", "Bấm nút", "UI hiển thị...").

---

## 2. QUY TẮC VIẾT UNIT TEST (`TC_WB_`) — Jest

### 2.1 Vị trí file

```
backend/src/<module>/<service>.spec.ts
```

VD: `TC_WB_14.2.x` → test `calculateEMA` → file `src/scientific/scientific.service.spec.ts`

### 2.2 Template chuẩn

```typescript
import { ScientificService } from './scientific.service';

describe('ScientificService', () => {
  let service: ScientificService;

  beforeEach(() => {
    // Prefer direct instantiation for pure business logic (no DI needed)
    service = new ScientificService();

    // Use TestingModule only when DI is required, e.g:
    // constructor(private config: ConfigService) hoặc JwtService
    // const module = await Test.createTestingModule({
    //   providers: [MyService, { provide: ConfigService, useValue: mockConfig }],
    // }).compile();
    // service = module.get(MyService);
  });

  describe('UC-XX: [Tên Use Case từ báo cáo]', () => {
    describe('FR_XX.X: [Tên FR từ báo cáo]', () => {
      /**
       * TC_WB_XX.X.Y — [Tên test case từ cột "Luồng bao phủ" trong báo cáo]
       * Path: [Mô tả nhánh đang test]
       * Input: [Giá trị từ cột "Dữ liệu kiểm thử" trong báo cáo]
       * Expected: [Giá trị từ cột "Kết quả mong đợi" trong báo cáo]
       */
      it('TC_WB_XX.X.Y — [Tên nhánh]', () => {
        const result = service.tenHam(input1, input2);
        expect(result).toBe(expectedValue); // Con số phải khớp chính xác trong báo cáo
      });
    });
  });
});
```

### 2.3 Quy tắc bắt buộc cho Unit Test

- **Mỗi `it()` block = 1 mã TC** từ báo cáo. KHÔNG gộp nhiều TC vào 1 `it()`.
- **Không gọi Prisma** — nếu hàm có DB call, dùng `jest.fn()` để mock.
- **Số liệu phải khớp chính xác** với cột "Expected Result" trong báo cáo. VD: `TC_WB_14.2.2` → `expect(result).toBe(69.9)`.
- **TRƯỚC KHI VIẾT**: Đọc file service để xác nhận tên hàm chính xác.
- **Khởi tạo service:** Ưu tiên `new Service()` cho hàm pure logic. Dùng `TestingModule` khi service có dependency injection thực sự (ConfigService, JwtService...).

### 2.4 Ví dụ thực tế — `TC_WB_14.2.x` (calculateEMA)

```typescript
// Kiểm tra trước: ScientificService.calculateEMA(actual, previousTrend, alpha)
// File: backend/src/scientific/scientific.service.ts

describe('UC-14: Xu hướng cân nặng', () => {
  describe('FR_14.2: calculateEMA', () => {
    it('TC_WB_14.2.1 — Nhánh 1: previousTrend = null → trả về actual', () => {
      const result = service.calculateEMA(70.0, null, 0.1);
      expect(result).toBe(70.0);
    });

    it('TC_WB_14.2.2 — Nhánh 2: Có previousTrend → tính EMA đúng công thức', () => {
      // 69.0 * 0.1 + 70.0 * 0.9 = 6.9 + 63.0 = 69.9
      const result = service.calculateEMA(69.0, 70.0, 0.1);
      expect(result).toBeCloseTo(69.9, 5);
    });
  });
});
```

---

## 3. QUY TẮC VIẾT E2E TEST (`TC_BB_`) — Playwright

### 3.1 Vị trí file

```
frontend/e2e/<use-case>.spec.ts
```

VD: `TC_BB_14.1.x` → file `frontend/e2e/weight-log.spec.ts`

### 3.2 Quy tắc đặt tên file

| Use Case | Tên file |
|---|---|
| UC-5 (Onboarding) | `onboarding.spec.ts` |
| UC-8 (Phân tích ảnh) | `meal-analysis.spec.ts` |
| UC-9 (Record Food) | `meal-record.spec.ts` |
| UC-12/14 (Cân nặng) | `weight-log.spec.ts` |
| UC-13 (Target Plan) | `target-plan.spec.ts` |
| UC-16 (Chat AI) | `nutrition-chat.spec.ts` |

### 3.3 Template chuẩn

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

### 3.4 Quy tắc bắt buộc cho E2E Test

**Về selector:**

- Dùng `data-testid` (ưu tiên cao nhất) → `page.getByRole()` → `page.getByText()`
- **KHÔNG dùng CSS class** làm selector — class thay đổi khi refactor UI sẽ gây fail test.
- **TRƯỚC KHI VIẾT**: Tìm selector trong source frontend (`grep -r "data-testid" frontend/src/`)

**Về assert:**

- Test **negative case** (báo lỗi): `await expect(page.locator('[data-testid="error-msg"]')).toBeVisible()`
- Test **positive case** (thành công): `await expect(page.getByText('...')).toBeVisible()`
- Dùng `toBeVisible()` thay vì `toHaveText()` nếu chỉ cần xác nhận hiện diện.

**Về mock:**

- Các TC liên quan AI (UC-8, UC-16): **PHẢI mock** API call tới Gemini để tránh phụ thuộc network.

  ```typescript
  await page.route('**/api/meals/analyze', route => route.fulfill({
    body: JSON.stringify({ isFood: false }),
  }));
  ```

### 3.5 Ví dụ thực tế — `TC_BB_14.1.2` (Cân nặng dưới Min)

```typescript
test('TC_BB_14.1.2 — Nhập 19.9kg (dưới Min) → UI hiển thị lỗi', async ({ page }) => {
  // TRƯỚC KHI VIẾT: kiểm tra DTO backend
  // CreateWeightLogDto có @IsPositive() — không có @Min(20)
  // → Cần confirm với team validation ở FE hay BE?

  await page.fill('[data-testid="weight-input"]', '19.9');
  await page.click('[data-testid="submit-weight"]');
  await expect(page.locator('[data-testid="weight-error"]')).toBeVisible();
});
```

### 3.6 Playwright Stability Rules — Chống Flaky Test

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

---


## 4. QUY TRÌNH CHUẨN TRƯỚC KHI VIẾT TEST

**Bước 1: Đọc TC trong báo cáo**
Mở `docs/final-report/Nhom_16_Bao_cao_tien_do.md`, tìm mã TC cần implement.

**Bước 2: Verify code thực tế**

Cho `TC_WB_` (Unit):

```bash
cat backend/src/<module>/<service>.ts | grep -A 20 "tenHam"
```

Cho `TC_BB_` (E2E):

```bash
# Tìm selector trong Frontend
grep -r "data-testid" frontend/src/ | grep "weight"

# Kiểm tra DTO validation tương ứng
cat backend/src/<module>/dto/<dto>.ts
```

**Bước 3: Đối chiếu — ghi chú nếu có lệch**

- Nếu code thực tế **khác** với Expected Result trong báo cáo → ghi comment `// ⚠️ LỆCH BÁO CÁO` và mô tả sự khác biệt.
- KHÔNG sửa Expected Result để test pass mà không cập nhật báo cáo.

**Bước 4: Viết test theo template ở Mục 2/3**

---

## 5. Ví dụ PROMPT chuẩn cho AI

```
Viết Jest Unit Test cho TC_WB_9.3.2 từ báo cáo nhóm 16.

TC cần implement:
- Mã: TC_WB_9.3.2
- Hàm: MealsService.calculateHealthScore (private method)
- Input: calories=250, protein=30, carbs=20, fats=10
- Expected: score = 5 + 1.5 + 1 + 0.5 = 8, hàm trả về 8

File cần đọc trước khi viết: backend/src/meals/meals.service.ts

Áp dụng template từ TESTING_RULES.md mục 2.4.
Chú ý hàm là private — cần cast sang any để test.
```

---

## 6. CHECKLIST TRƯỚC KHI COMMIT TEST

- [ ] Tên `it()`/`test()` bắt đầu bằng mã TC (`TC_WB_...` hoặc `TC_BB_...`)
- [ ] Expected value khớp chính xác với bảng TC trong báo cáo
- [ ] Đã đọc file code thực tế, không test hàm không tồn tại
- [ ] Mỗi `it()` = đúng 1 TC (không gộp)
- [ ] Nếu có `test.skip()` → có comment TODO rõ lý do
- [ ] Test chạy được không lỗi syntax (xem lệnh ở mục 7 bên dưới)

---

## 7. CLI QUICK REFERENCE

### Backend — Unit Test (TC_WB_)
```bash
# Chạy toàn bộ unit test
cd backend && npm test

# Chạy test của 1 file cụ thể
npm test -- --testPathPattern="scientific.service"

# Chạy 1 test case theo tên (mã TC)
npm test -- --testNamePattern="TC_WB_14.2.1"

# Chạy với coverage report
npm test -- --coverage
```

### Backend — E2E/Integration Test (Supertest, nếu có)
```bash
# Đảm bảo db-test đang chạy trước
docker compose up -d db-test

# Chạy e2e (tự động push schema + load .env.test)
cd backend && npm run test:e2e
```

### Frontend — E2E Test Playwright (TC_BB_)
```bash
# Đảm bảo backend đang chạy ở port 3001 trước
cd backend && npm run start:dev

# Chạy toàn bộ E2E (headless, tự khởi động Vite)
cd frontend && yarn test:e2e

# Chạy với UI debug (thấy browser)
yarn test:e2e:ui

# Chạy 1 file cụ thể
yarn test:e2e -- e2e/weight-log.spec.ts

# Chạy 1 test theo tên
yarn test:e2e -- --grep "TC_BB_14.1.2"

# Xem báo cáo HTML sau khi chạy
npx playwright show-report
```

### Kiểm tra selector nhanh
```bash
# Tìm data-testid trong frontend source
grep -r "data-testid" frontend/src/ | grep "weight"

# Verify DTO validation của backend
cat backend/src/weight-logs/dto/*.ts

# Verify business logic của service
grep -A 20 "calculateEMA" backend/src/scientific/scientific.service.ts
```

### Docker — Quản lý Test DB
```bash
# Khởi động cả 2 DB (dev + test)
docker compose up -d

# Chỉ khởi động test DB
docker compose up -d db-test

# Kiểm tra DB đang chạy
docker compose ps

# Dừng tất cả
docker compose down
```

