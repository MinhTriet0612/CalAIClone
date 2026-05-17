# 04. CLEAN TEST CODE GUIDELINES

Để đảm bảo mã nguồn test dễ đọc, dễ bảo trì và không bị lỗi ngẫu nhiên (flaky), **bắt buộc** áp dụng các nguyên tắc Clean Code sau:

### 1. Mẫu AAA (Arrange - Act - Assert)
Mọi test case phải được phân tách rõ ràng thành 3 khối, **ngăn cách nhau bởi ĐÚNG 1 dòng trống**. 
- **Arrange:** Chỉ chuẩn bị dữ liệu.
- **Act:** TUYỆT ĐỐI chỉ có 1 dòng thực thi.
- **Assert:** Chỉ chứa các hàm expect.

**❌ Bad (Merge Act vào Arrange):**
```typescript
const user = createMockUser();
const result = service.calculate(user); // Lẫn lộn Act vào Arrange
expect(result).toBe(true);
```

**✅ Good:**

```typescript
it('TC_WB_14.2.2 — Tính EMA', () => {
  // 1. Arrange (Chuẩn bị)
  const actualWeight = 69.0;
  const previousTrend = 70.0;
  const alpha = 0.1;

  // 2. Act (Thực thi)
  const result = service.calculateEMA(actualWeight, previousTrend, alpha);

  // 3. Assert (Kiểm chứng)
  expect(result).toBeCloseTo(69.9, 5);
});
```

### 2. Độc lập dữ liệu & Trạng thái (Idempotency)
- **Không chia sẻ state:** Test 2 tuyệt đối không được phụ thuộc vào dữ liệu được tạo ra từ Test 1.
- **Teardown E2E:** Các test E2E có thao tác tạo dữ liệu phải có bước dọn dẹp hoặc dùng test user độc lập.
- **Clear Mock:** Luôn gọi `jest.clearAllMocks()` trong `afterEach` (an toàn hơn `beforeEach` vì tránh state leak nếu test fail giữa chừng).

### 3. Xử lý Thời gian (Time & Dates)
**KHÔNG BAO GIỜ** dùng `new Date()` thuần túy trong các logic có tính toán thời gian (như streak, báo cáo theo tuần, v.v.) vì test sẽ fail khi qua ngày hôm sau.

**✅ Phải mock System Time:**
```typescript
beforeEach(() => {
  // Cố định thời gian ở 2024-01-01T12:00:00Z
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-01T12:00:00Z'));
});

afterEach(() => {
  jest.useRealTimers(); // Bắt buộc phải restore timer để không lây nhiễm test khác
  jest.clearAllMocks();
});
```

### 4. No Logic Inside Assert (Cấm logic trong Expect)
Tuyệt đối không tính toán, filter, hay map data bên trong hàm `expect()`.

**❌ Bad:**
```typescript
expect(items.filter(x => x.active).length).toBe(2);
```

**✅ Good:**
```typescript
const activeItems = items.filter(x => x.active);
expect(activeItems).toHaveLength(2);
```

### 5. Rich Assertions (Kiểm chứng giàu ngữ nghĩa)
Tránh việc tự tính toán boolean rồi assert true/false. Điều này làm log lỗi rất vô dụng (`Expected true to be false`).

**❌ Bad:**
```typescript
expect(user.roles.includes('ADMIN')).toBeTruthy();
expect(items.length === 2).toBe(true);
```

**✅ Good:**
```typescript
expect(user.roles).toContain('ADMIN'); // Log: Expected array to contain "ADMIN"
expect(items).toHaveLength(2);         // Log: Expected length 2, received 0
```

### 6. Nguyên tắc DAMP thay vì DRY trong Test
- **DRY** (Don't Repeat Yourself) rất tốt cho production code.
- Trong test, ưu tiên **DAMP** (Descriptive And Meaningful Phrases).
- Chấp nhận lặp code setup (Arrange) nếu việc tách helper làm test khó đọc.

**Extract Helper Threshold:**
- ❌ KHÔNG tạo helper nếu: chỉ dùng 1 lần, giấu mất business intent, làm giảm khả năng đọc hiểu.
- ✅ CHỈ tạo helper nếu: code lặp lại $\ge$ 3 lần, setup quá "ồn ào" (noisy), và sau khi tách intent vẫn rõ ràng.

### 7. Test Data Factory (Làm sạch phần Arrange)
Khi cần tạo một Object phức tạp (như User, Meal, Profile) để test, KHÔNG khai báo toàn bộ object thủ công trong từng test case vì sẽ làm file test rất dài và khó nhìn.

**✅ Phải tạo Factory function:**
```typescript
// Định nghĩa 1 lần
const createMockMeal = (overrides?: Partial<Meal>): Meal => ({
  id: '1',
  name: 'Default Meal',
  calories: 500,
  ...overrides,
});

// Trong test: chỉ ghi đè field nào cần thiết cho test case này
it('...', () => {
  const meal = createMockMeal({ calories: 1200 }); // Sạch, gọn, biết ngay test này focus vào calories
});
```

### 7. Mocking Type-Safe (BẮT BUỘC)
**Cấm tuyệt đối** việc dùng `as any` khi mock các dependency (như PrismaService) vì nó làm mất hoàn toàn type-safety của TypeScript. Nếu code gốc đổi tên hàm, TypeScript sẽ không báo lỗi ở test.

**✅ Dùng `jest-mock-extended` cho Prisma:**
```typescript
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

let prismaMock: DeepMockProxy<PrismaClient>;

beforeEach(() => {
  prismaMock = mockDeep<PrismaClient>();
  service = new MealsService(prismaMock);
});

it('...', async () => {
  // Gợi ý code (autocomplete) hoạt động hoàn hảo và type-safe
  prismaMock.meal.findUnique.mockResolvedValue(mockMeal); 
});
```

**✅ Hoặc ép kiểu an toàn với hàm thông thường:**
```typescript
// Thay vì: (myService.fetchData as any).mockReturnValue(...)
(myService.fetchData as jest.MockedFunction<typeof myService.fetchData>).mockReturnValue(...);
```

### 9. Forbidden Test Smells (Danh sách CẤM TUYỆT ĐỐI)
AI rất hay sinh ra các "Test Smell" (code rác) sau đây. Hãy report lỗi ngay lập tức nếu thấy:

- ❌ **Conditional logic (`if`/`switch`):** Test không bao giờ được có rẽ nhánh. Nếu có `if`, tách thành test case mới.
- ❌ **For-loop generated tests:** Test sinh ra từ vòng lặp for/forEach (trừ test parameterized `test.each`).
- ❌ **Multiple assertions for unrelated behavior:** Test 1 lúc nhiều hành vi không liên quan.
- ❌ **Testing implementation details:** Test private variables hay những thứ không thay đổi output.
- ❌ **Magic numbers:** Dùng số cứng mà không giải thích ý nghĩa.
- ❌ **Random data (`Math.random()`):** Test phải luôn deterministic. Dùng data factory tĩnh.
- ❌ **Hardcoded timeout:** Dùng `sleep(3000)` thay vì wait cho logic (xem rule E2E).
