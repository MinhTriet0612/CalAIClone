

### **SƯỜN MẪU TRÌNH BÀY DÒ VẾT & V\&V (Cho 1 Chức năng)**

**Tiêu đề: Kiểm soát chất lượng (V\&V) cho tính năng \[Tên tính năng\]**

* **Bước 1: Ma trận Dò vết (Traceability Matrix):** Lập bảng 3 cột (hoặc 4 cột) nối thẳng Yêu cầu nghiệp vụ $\\rightarrow$ Hàm/API thiết kế $\\rightarrow$ Mã Test Case. Bước này là cái "xương sống".  
* **Bước 2: Thực hiện Verification (Rà soát thiết kế):** Lập bảng đối chiếu giữa Yêu cầu (SRS) và Thiết kế (DS). Mục đích là để "khoe" với thầy rằng nhóm có bắt lỗi trên bản vẽ/thiết kế *trước khi* code. Phải cố tình tạo ra 1-2 lỗi "vênh" nhau để xử lý (như ví dụ OTP 6 số của thầy).  
* **Bước 3: Thực hiện Validation (Kiểm thử sản phẩm):** Lập bảng chạy thử nghiệm thực tế dựa trên Test Case ở Bước 1\. Cột kết quả phải khẳng định phần mềm đã chạy đúng ý khách hàng.

---

### **VÍ DỤ THỰC TẾ ÁP DỤNG VÀO CAL AI: CHỨC NĂNG UC-13**

Dưới đây là cách bạn trình bày nội dung vào file Word cho chức năng **UC-13: Set Custom Daily Targets** (Người dùng tự nhập mục tiêu Calo/Macro trong ngày).

#### **1\. Ma trận Dò vết (Traceability Matrix)**

*Bảng này giúp quản lý dự án khoanh vùng được: Khi tính năng này thay đổi, Dev phải sửa API nào và Tester phải chạy lại Test case nào.*

| Mã Yêu cầu (Requirements) | Lớp Xử lý / Thiết kế (Functions) | Mã Kiểm thử (Test Cases) |
| :---- | :---- | :---- |
| **FR\_13.1:** Cho phép user nhập số Calo/Macro mục tiêu. | DailyTargetsController.setDailyTargets() | TC\_13\_Pos\_01 |
| **FR\_13.2:** Giá trị nhập vào bắt buộc phải là số dương ($\\ge$ 0). | DailyTargetsService.setDailyTargets() | TC\_13\_Neg\_01 |
| **FR\_13.3:** Giới hạn điểm HealthScore từ 1-10. | DailyTargetsService.setDailyTargets() | TC\_13\_Neg\_02 |

#### **2\. Rà soát Thiết kế \- Verification (Inspection)**

*"Nhóm tiến hành rà soát (Inspection) bản thiết kế API so với tài liệu Đặc tả Yêu cầu (SRS) để đảm bảo tính Toàn diện (Coverage) và tính Dẫn xuất (Derivation)."*

| Tiêu chí Rà soát | Có trong Yêu cầu (SRS)? | Có trong Thiết kế (DS)? | Kết quả (Action) |
| :---- | :---- | :---- | :---- |
| Cập nhật Data vào bảng DailyTarget | Có | Có | OK |
| Thuật toán chặn nhập số âm | Có | Có | OK |
| **Thuật toán chặn nhập quá 10,000 Calo** | **Không** | **Có** | **Xác minh lại (1)** |
| Chặn điểm Health Score \> 10 | Có | Không | **Sửa lỗi thiết kế (2)** |

**Ghi chú SQA:**

* *(1) Vi phạm Tính Dẫn xuất:* Dev tự ý code thêm logic "chặn nhập quá 10,000 Calo" trong khi BA không yêu cầu. SQA bắt buộc Dev bỏ logic này hoặc phải xin phép BA cập nhật lại SRS.  
* *(2) Vi phạm Tính Toàn diện:* Thiết kế API bỏ quên việc chặn Health Score vượt quá 10\. SQA yêu cầu Dev bổ sung logic clamp (1-10) vào DailyTargetsService trước khi tiến hành code.

#### **3\. Kiểm thử Chấp nhận \- Validation (Test Execution)**

*"Sau khi Code hoàn thiện, nhóm sử dụng các Test Case từ Ma trận Dò vết để tiến hành Validation, xác nhận phần mềm hoạt động đúng thực tế."*

| Mã Test Case (Từ Ma trận) | Kịch bản / Thao tác người dùng | Phản hồi của Hệ thống | Kết quả Validation |
| :---- | :---- | :---- | :---- |
| TC\_13\_Pos\_01 | Nhập Calo \= 2000, Protein \= 150 $\\rightarrow$ Bấm Save. | Database lưu thành công vào bảng DailyTarget, UI cập nhật thanh tiến độ. | **PASS** \- Thỏa mãn FR\_13.1 |
| TC\_13\_Neg\_01 | Nhập Calo \= \-500 (Số âm) $\\rightarrow$ Bấm Save. | API trả về lỗi 400 Bad Request, UI hiện cảnh báo "Calo must be positive". | **PASS** \- Thỏa mãn FR\_13.2 |
| TC\_13\_Neg\_02 | Nhập Health Score \= 15 $\\rightarrow$ Bấm Save. | Hệ thống tự động Clamp (giới hạn) điểm về 10 và lưu thành công. | **PASS** \- Thỏa mãn FR\_13.3 |

---

### **TÓM LẠI: TẠI SAO SƯỜN NÀY LẠI "ĂN ĐIỂM"?**

1. **Có tính ứng dụng cao:** Bạn không nói lý thuyết suông. Bạn lấy 1 tính năng thật trong app Cal AI ra để mổ xẻ.  
2. **Thể hiện đúng slide của thầy:** Cái bảng Verification số 2 có dòng *"Xác minh lại"* là bắt chước chính xác "tuyệt chiêu" trong ví dụ OTP 6 số của thầy Hào ở Slide 27\. Nó chứng tỏ bạn hiểu rất rõ bản chất của việc rà soát thiết kế.  
3. **Mạch lạc:** Đường dây liên kết rất rõ ràng: **FR\_13.2** $\\rightarrow$ Rà soát thấy **OK** $\\rightarrow$ Viết ra **TC\_13\_Neg\_01** $\\rightarrow$ Test ra chữ **PASS**.

Bạn chỉ cần bốc khoảng 3-4 chức năng cốt lõi nhất của dự án (ví dụ: Tính TDEE, Log Meal, Set Custom Targets) và làm đúng cái sườn 3 bước này, cuốn báo cáo của bạn sẽ cực kỳ chuyên nghiệp và đánh trúng tâm lý chấm điểm của thầy Hào\!

