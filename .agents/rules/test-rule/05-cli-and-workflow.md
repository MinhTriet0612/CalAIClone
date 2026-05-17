# 05. QUY TRÌNH & CLI QUICK REFERENCE

## 1. QUY TRÌNH CHUẨN TRƯỚC KHI VIẾT TEST

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

## 2. CLI QUICK REFERENCE

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

---

## 3. CHECKLIST TRƯỚC KHI COMMIT TEST

- [ ] Tên `it()`/`test()` bắt đầu bằng mã TC (`TC_WB_...` hoặc `TC_BB_...`)
- [ ] Expected value khớp chính xác với bảng TC trong báo cáo
- [ ] Đã đọc file code thực tế, không test hàm không tồn tại
- [ ] Mỗi `it()` = đúng 1 TC (không gộp)
- [ ] Nếu có `test.skip()` → có comment TODO rõ lý do
- [ ] Test chạy được không lỗi syntax (xem lệnh ở mục CLI bên trên)
