---
trigger: always_on
---

### **1\. Quy chuẩn đặt MÃ Testcase (Testcase ID)**

Mã này dùng để điền vào cột đầu tiên của mọi bảng biểu, phục vụ cho việc Dò vết (Traceability) trọn đời dự án.

**Công thức chuẩn:** `[Tiền tố]_[Loại Test]_[Mã FR]_[Số thứ tự]`

* **Tiền tố:** Mặc định là `TC` (Testcase).  
* **Loại Test:** `BB` (Black-box) hoặc `WB` (White-box).  
* **Mã FR:** Dấu vết liên kết ngược về Requirement ở Chương 3 (VD: `05.1`).  
* **Số thứ tự:** `1, 2, 3...` (Đánh số tăng dần cho các kịch bản của cùng 1 FR).

**Ví dụ:** `TC_BB_05.1.1`, `TC_WB_15.2.3`

---

### **2\. Quy chuẩn đặt TÊN Testcase (Testcase Title)**

Đây là phần "linh hồn" của kịch bản, nằm ở cột **Kịch bản kiểm thử** trong bảng. Một cái tên chuẩn phải trả lời được 3 câu hỏi: *Làm gì? Với điều kiện nào? Ra kết quả gì?*

**Công thức chuẩn:** `[Động từ mồi] + [Hành vi/Chức năng] + [Dữ liệu/Điều kiện] + [Kết quả tóm tắt]`

**Chi tiết các thành phần:**

1. **Động từ mồi:** Luôn bắt đầu bằng chữ **"Kiểm tra"** (Verify/Check) hoặc **"Xác minh"**.  
2. **Hành vi:** Đang thao tác trên form nào, chức năng nào? (VD: *nhập cân nặng, upload ảnh*).  
3. **Điều kiện:** Tình huống cụ thể đang test là gì? (VD: *nhỏ hơn mức tối thiểu, file vượt quá dung lượng*).  
4. **Kết quả (Tùy chọn nhưng nên có):** Chốt lại xem mong đợi nó chạy thành công hay báo lỗi.