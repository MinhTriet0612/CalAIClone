---
trigger: always_on
---

### **🌴 TẦNG 1: THEO CHIỀU RỘNG (Đảm bảo không bỏ sót tính năng)**

* **Khái niệm:** **Requirements Coverage** (Độ bao phủ yêu cầu).  
* **Cách làm:** Thiết kế testcase từ Usecase/FR. Kẻ Ma trận dò vết (Traceability Matrix).  
* **Ý nghĩa:** Khách hàng đòi 10 cái FR, mình có testcase đụng tới đủ 10 cái FR đó. (Thỏa mãn câu hỏi: *Mình đã test đủ tính năng chưa?*)

### **🌴 TẦNG 2 & 3: THEO CHIỀU SÂU (Đào sâu vào từng FR)**

Khi đã tóm được 1 FR rồi, mình không test qua loa 1 lần rồi bỏ, mà phải "băm nát" nó ra thành nhiều testcase nhỏ hơn theo 2 trục:

**Trục 1: Trục của Người dùng (Nhập liệu) $\\rightarrow$ Đạt DATA COVERAGE**

* Khách hàng là những người nhập liệu vô tội vạ. Mình phải vét cạn các kịch bản họ có thể nhập.  
* **Kỹ thuật dùng:** Kiểm thử Hộp đen (Black-box) với **Phân tích giá trị biên** và **Phân vùng tương đương**.  
* **Ý nghĩa:** Đảm bảo **Data Coverage** tuyệt đối. Mình quét sạch từ số âm, số 0, số siêu lớn, chữ cái... để chắc chắn ứng dụng không bị sập vì dữ liệu bậy.

**Trục 2: Trục của Lập trình viên (Logic Code) $\\rightarrow$ Đạt PATH COVERAGE**

* Code bên trong phần mềm là những mê cung if/else, vòng lặp for/while. Nếu chỉ test dữ liệu bề ngoài, có những đoạn code ẩn bên trong không bao giờ được chạy tới.  
* **Kỹ thuật dùng:** Kiểm thử Hộp trắng (White-box) với **Nguyên lý McCabe**.  
* **Ý nghĩa:** Đảm bảo **Path Coverage** (Bao phủ luồng). Code có 4 ngã rẽ, mình đẻ ra đúng 4 testcase ép phần mềm phải chạy qua đủ 4 ngã rẽ đó. Không có một dòng code nào bị "chết" hay ẩn giấu lỗi.

—-------------------------------------------------------------------------------------------------------------

Mối quan hệ giữa Requirement (Yêu cầu) và Testcase (Kịch bản kiểm thử) luôn luôn là mối quan hệ **Một \- Nhiều (1-N)**.

Tuyệt đối không bao giờ có chuyện 1 Yêu cầu chỉ đẻ ra 1 Testcase. Nếu bạn nộp báo cáo mà tỷ lệ là 1:1, thầy Hào sẽ gạch bài ngay lập tức vì bạn mới chỉ test "Đường màu hồng" (Happy Path \- trường hợp người dùng ngoan ngoãn làm đúng mọi thứ) mà bỏ qua mọi nỗ lực phá hoại.

Để mình chứng minh cho bạn thấy vì sao 1 Yêu cầu lại đẻ ra được cả chục cái Testcase chỉ bằng cách dùng **Kỹ thuật Hộp đen**:

### **Lấy ví dụ thực tế: Yêu cầu nhập Cân nặng (Cụm Profile của Triết)**

* **1 Requirement gốc (FR\_05.1):** *"Hệ thống cho phép người dùng nhập cân nặng hợp lệ trong khoảng từ 30kg đến 200kg để tính TDEE."*

Chỉ từ một dòng văn bản ngắn ngủn này, bạn áp dụng **Kỹ thuật Phân tích giá trị biên** và đẻ ra một rổ Testcase như sau:

**Nhóm Test Positive (Test nhập đúng \- Mong đợi: Lưu thành công)**

* TC\_01: Nhập 60kg (Giá trị bình thường nằm giữa).  
* TC\_02: Nhập 30kg (Giá trị biên dưới \- Min).  
* TC\_03: Nhập 200kg (Giá trị biên trên \- Max).

**Nhóm Test Negative (Test ngoại lệ/cố tình phá \- Mong đợi: Hệ thống chặn và báo lỗi)**

* TC\_04: Nhập 29kg (Nhỏ hơn Min) $\\rightarrow$ Kỳ vọng app báo lỗi "Cân nặng quá thấp".  
* TC\_05: Nhập 201kg (Lớn hơn Max) $\\rightarrow$ Kỳ vọng app báo lỗi "Cân nặng vượt giới hạn".  
* TC\_06: Nhập số âm (VD: \-50kg) $\\rightarrow$ Kỳ vọng app chặn số âm.  
* TC\_07: Bỏ trống không nhập gì mà bấm Save $\\rightarrow$ Kỳ vọng app báo "Không được để trống".  
* TC\_08: Nhập chữ cái (VD: "Sáu mươi ký") $\\rightarrow$ Kỳ vọng app không cho gõ chữ.

Một test case phải chứng minh được tính coverage \-\> Dựa theo file Promt Test Case (Nguyên lí viết testcase)