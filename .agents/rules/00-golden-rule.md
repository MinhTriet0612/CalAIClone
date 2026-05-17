# 00. GOLDEN RULE — Report ≠ Source of Truth

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
