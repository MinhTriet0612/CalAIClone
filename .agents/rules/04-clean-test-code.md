# 04. CLEAN TEST CODE GUIDELINES

Để đảm bảo mã nguồn test dễ đọc, dễ bảo trì và không bị lỗi ngẫu nhiên (flaky), **bắt buộc** áp dụng các nguyên tắc Clean Code sau:

### 1. Mẫu AAA (Arrange - Act - Assert)
Mọi test case (cả Jest và Playwright) phải được phân tách rõ ràng thành 3 khối bằng dòng trống và comment. AI **phải** tạo comment này.

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
- **Teardown E2E:** Các test E2E có thao tác tạo dữ liệu (nhập cân nặng, thêm bữa ăn) phải có bước dọn dẹp hoặc dùng test user độc lập để chạy đi chạy lại không bị lỗi trùng lặp.
- **Clear Mock:** Trong Unit test, luôn gọi `jest.clearAllMocks()` trong `beforeEach` để tránh số đếm (call count) của hàm mock bị cộng dồn sang test khác.

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
  jest.useRealTimers();
});
```

### 4. Rich Assertions (Kiểm chứng giàu ngữ nghĩa)
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

### 5. Nguyên tắc DAMP thay vì DRY trong Test
- **DRY** (Don't Repeat Yourself) rất tốt cho production code.
- Nhưng trong test code, hãy ưu tiên **DAMP** (Descriptive And Meaningful Phrases). 
- **Rule:** Chấp nhận lặp lại một chút code setup (Arrange) nếu việc tách nó ra file helper làm bài test trở nên khó đọc, buộc người đọc phải nhảy qua lại giữa nhiều file để hiểu test đó đang chuẩn bị dữ liệu gì.
