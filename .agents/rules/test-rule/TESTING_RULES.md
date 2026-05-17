# TESTING RULES — CalAI Clone (Nhóm 16)

> Tài liệu này là bộ quy tắc BẮT BUỘC khi dùng AI (GitHub Copilot, Cursor, v.v.)
> để viết test cho dự án. Mọi thành viên phải đọc trước khi generate test.

Do file gốc quá dài, bộ quy tắc đã được chia nhỏ thành các module riêng biệt để AI và dev dễ dàng tìm kiếm và đọc hiểu:

### 📑 DANH MỤC QUY TẮC

1. **[00-golden-rule.md](./00-golden-rule.md)**
   - Rule SỐNG CÒN: Cách xử lý khi Báo cáo và Code thực tế bị lệch nhau.
   - Cách dùng `test.skip()` an toàn.

2. **[01-folder-structure.md](./01-folder-structure.md)**
   - Cấu trúc thư mục Test (Unit, E2E, API).
   - Ánh xạ từ mã `TC_` sang loại Test Framework tương ứng.

3. **[02-unit-test-jest.md](./02-unit-test-jest.md)**
   - Template chuẩn cho Unit Test.
   - Nguyên tắc Mocking.
   - Cấu trúc file và cách khởi tạo class.

4. **[03-e2e-test-playwright.md](./03-e2e-test-playwright.md)**
   - Template chuẩn cho E2E UI Test.
   - Quy tắc chống Flaky test (cấm `waitForTimeout`).
   - Mocking mạng và xử lý wait an toàn.

5. **[04-clean-test-code.md](./04-clean-test-code.md)**
   - 5 nguyên tắc mã sạch (Clean Code) cho Test.
   - Mẫu AAA (Arrange - Act - Assert).
   - Cách mock thời gian (`jest.setSystemTime`).

6. **[05-cli-and-workflow.md](./05-cli-and-workflow.md)**
   - Quy trình 4 bước chuẩn bị trước khi viết test.
   - Danh sách lệnh CLI (`npm test`, `yarn test:e2e`, Docker).
   - Checklist trước khi commit.

---

### 💡 VÍ DỤ PROMPT CHUẨN CHO AI

Khi dùng công cụ AI, hãy copy mẫu prompt sau và điều chỉnh thông số:

```text
Viết Jest Unit Test cho TC_WB_9.3.2 từ báo cáo nhóm 16.

TC cần implement:
- Mã: TC_WB_9.3.2
- Hàm: MealsService.calculateHealthScore (private method)
- Input: calories=250, protein=30, carbs=20, fats=10
- Expected: score = 5 + 1.5 + 1 + 0.5 = 8, hàm trả về 8

File cần đọc trước khi viết: backend/src/meals/meals.service.ts

Chú ý:
- Áp dụng template từ .agents/rules/02-unit-test-jest.md.
- Tuân thủ các nguyên tắc mã sạch từ .agents/rules/04-clean-test-code.md.
```
