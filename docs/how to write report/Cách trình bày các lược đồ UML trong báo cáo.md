**CHƯƠNG III: PHÂN TÍCH HỆ THỐNG (Mô hình hóa nghiệp vụ)**

**1\. Lược đồ mô tả Hiện trạng và Đề xuất giải pháp (Lược đồ Tuần tự, Cộng tác hoặc Hoạt động)**

* **Với hiện trạng:** Các đối tượng tham gia phải được đặt tên theo **vai trò thực tế** trong tổ chức (VD: Khách hàng, Giao dịch viên, Thủ kho),. Lược đồ này dùng để chỉ ra tình huống bất lợi của tổ chức cần giải quyết.  
* **Với giải pháp đề xuất:** Phần mềm của bạn (VD: Website bán hàng) phải được đưa vào lược đồ như **một công cụ (hoặc một đối tượng)** tham gia trợ giúp tổ chức để giải quyết các khó khăn đã nêu,.

**2\. Lược đồ Use Case**

* **Tuyệt đối không dùng** các Actor chung chung như "Admin" hay "User". Actor phải là vai trò có thực (VD: "Thủ kho", "Shipper").  
* **Không vẽ các Use Case hệ thống** như "Đăng nhập" hay "Phân quyền" ở mức này, vì đây là thủ tục bảo mật của hệ thống chứ không phải mong muốn từ người dùng. Các thiết bị phần cứng (máy POS, Barcode) cũng không được xuất hiện ở lược đồ này.  
* Nên sử dụng các mối quan hệ `<<includes>>` (gồm) và `<<extendes>>` (đôi lúc cần thêm) để cấu trúc hóa các use case.

**3\. Lược đồ Tuần tự (Sequence Diagram) định nghĩa tương tác (Quan trọng nhất)**

* Mỗi Use Case phải được mô tả chi tiết bằng một lược đồ Tuần tự.  
* **Bắt buộc:** Vì phần mềm cần dữ liệu để xử lý, mọi thông điệp (message) gửi đến phần mềm **phải chứa tham số dữ liệu đầu vào**.  
* *Ví dụ:* Thay vì vẽ mũi tên ghi chung chung là `Phân công()`, bạn phải vẽ chuẩn xác là `OrderAllocation(shipperId, orderId, DeliveryStatus)`,. Từ các thông điệp có tham số này, sau này bạn mới suy ra được các API ở Chương 4\.

**4\. Lược đồ Hoạt động (Activity) và Lược đồ Trạng thái (State)**

* **Lược đồ Hoạt động:** Dùng để đối chiếu với Lược đồ Tuần tự, giúp bạn rà soát xem mình có bỏ sót các luồng ngoại lệ (Alternative flows) nào trong quy trình hay không.  
* **Lược đồ Trạng thái:** Rất quan trọng để diễn tả các trạng thái hợp lệ của dữ liệu (VD: `ALLOCATED` $\\rightarrow$ `DELIVERED` hoặc `EXCEPTION`). Đây sẽ là cơ sở để bạn thiết kế các Trigger hay ràng buộc dữ liệu ở dưới CSDL.

---

**CHƯƠNG IV: THIẾT KẾ PHẦN MỀM (Mô hình hóa hệ thống)**

**1\. Lược đồ Lớp (Class Diagram) và Thiết kế Database**

* Mỗi đối tượng thành phần phải được mô tả bằng một Class Diagram gồm 3 phần rõ ràng: Tên lớp, Thuộc tính, và Hành vi (Phương thức).  
* **Quy tắc Dò vết tính nhất quán (Ăn điểm SQA):** Tên các phương thức và tham số trong Lược đồ Lớp **phải khớp 100%** với các thông điệp bạn đã vẽ trong Lược đồ Tuần tự. (VD: Bên lược đồ tuần tự gọi `sendPOD(orderId, POD, status)` thì trong Class Diagram của lớp tương ứng bắt buộc phải có phương thức y hệt).  
* **Thiết kế CSDL trong UML:** Thay vì vẽ Database bằng một tập các bảng với các câu lệnh SQL lộn xộn, hướng tiếp cận SQA yêu cầu bạn vẽ DB như một lớp **Data Access Object (DAO) hoặc Repository** (VD: lớp `OrderRepository` thay cho bảng `Orders`). Lớp này sẽ chứa các phương thức public như `updateOrderStatus()` để che giấu mã SQL khỏi các tầng nghiệp vụ phía trên,.

**Tóm lại:** Cách trình bày UML trong báo cáo SQA không cho phép vẽ các hình khối chung chung. Mỗi thông điệp, mỗi phương thức trên lược đồ Tuần tự và lược đồ Lớp phải chứa tham số dữ liệu cực kỳ chi tiết, nhất quán với nhau để thầy chấm điểm khả năng "Dò vết" (Traceability) từ lúc phân tích luồng cho đến khi gọi API và cập nhật CSDL.

