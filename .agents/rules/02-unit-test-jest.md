# 02. QUY TẮC VIẾT UNIT TEST (`TC_WB_`) — Jest

### 1. Vị trí file

```
backend/src/<module>/<service>.spec.ts
```

VD: `TC_WB_14.2.x` → test `calculateEMA` → file `src/scientific/scientific.service.spec.ts`

### 2. Template chuẩn

```typescript
import { ScientificService } from './scientific.service';

describe('ScientificService', () => {
  let service: ScientificService;

  beforeEach(() => {
    // Ưu tiên khởi tạo trực tiếp cho logic nghiệp vụ thuần (không cần DI)
    service = new ScientificService();

    // Dùng TestingModule CHỈ KHI có dependency injection (vd: ConfigService, JwtService)
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

### 3. Quy tắc bắt buộc cho Unit Test

- **Mỗi `it()` block = 1 mã TC** từ báo cáo. KHÔNG gộp nhiều TC vào 1 `it()`.
- **Không gọi Prisma** — nếu hàm có DB call, dùng `jest.fn()` để mock.
- **Số liệu phải khớp chính xác** với cột "Expected Result" trong báo cáo. VD: `TC_WB_14.2.2` → `expect(result).toBe(69.9)`.
- **TRƯỚC KHI VIẾT**: Đọc file service để xác nhận tên hàm chính xác.
- **Khởi tạo service:** Ưu tiên `new Service()` cho hàm pure logic. Dùng `TestingModule` khi service có dependency injection thực sự.

### 4. Ví dụ thực tế — `TC_WB_14.2.x` (calculateEMA)

```typescript
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
