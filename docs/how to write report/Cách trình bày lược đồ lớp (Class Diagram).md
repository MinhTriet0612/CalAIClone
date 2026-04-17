# Hướng dẫn trình bày Lược đồ lớp (Class Diagram) chuẩn SQA

## 1. Lược đồ lớp là gì?

Lược đồ lớp (Class Diagram) là một lược đồ cấu trúc tĩnh trong UML, mô tả các thành phần cấu trúc của hệ thống. Trong báo cáo SQA mức độ Phân tích hệ thống (Analysis), Lược đồ lớp tập trung vào việc mô tả các **Thực thể (Entities)** - những đối tượng mang dữ liệu cốt lõi của bài toán.

## 2. Quy tắc triển khai chuẩn Entities (Conceptual Model)

Để đảm bảo tính hàn lâm và tập trung vào dữ liệu, lược đồ lớp cần tuân thủ các quy tắc sau:

### Quy tắc 1: Cấu trúc 3 phần bắt buộc

Mỗi lớp thực thể bắt buộc phải hiển thị đủ 3 ngăn:

1. **Tên lớp**: Tên của thực thể (V/d: `Người dùng`, `Bữa ăn`).
2. **Ngăn thuộc tính**: Liệt kê các biến kèm kiểu dữ liệu (V/d: `- calories: Integer`). Đây là phần quan trọng nhất của một Thực thể.
3. **Ngăn phương thức**: Liệt kê các hàm thao tác trên chính dữ liệu đó (V/d: `+ calculateBMR()`).

### Quy tắc 2: Loại bỏ hoàn toàn các lớp kỹ thuật

Trong lược đồ lớp mức Phân tích, tuyệt đối **KHÔNG** đưa vào:

- **Boundary (Giao diện)**: Màn hình, Form.
- **Control (Điều khiển)**: Controller, Biến môi trường.
- **Infrastructure**: DAO, Repository, Database.
*Lý do: Lược đồ lúc này chỉ đóng vai trò mô tả "Dữ liệu có gì", không quan tâm đến "Dữ liệu được lưu vào đâu hay bằng cách nào".*

### Quy tắc 3: Tập trung vào Mối quan hệ giữa các Thực thể

Bạn cần thể hiện rõ cách các thực thể kết nối với nhau:

- **Association (Kết hợp)**: Mối quan hệ giữa 2 lớp độc lập.
- **Aggregation / Composition (Kết tập / Cấu thành)**: Thể hiện quan hệ "Một - Nhiều" (V/d: Một `Hồ sơ` chứa nhiều `Giai đoạn mục tiêu`).

### Quy tắc 4: Khớp với đặc tả thuộc tính

Tất cả các thuộc tính được liệt kê trong Lược đồ lớp phải khớp với các "Dữ liệu tham số" mà bạn đã mô tả trong Bảng đặc tả Use Case và Sơ đồ tuần tự.

---
*Ghi chú: Việc lược bỏ DAO/Repository giúp lược đồ lớp trở nên trong sáng, tập trung hoàn toàn vào mô hình nghiệp vụ của bài toán (Domain Model).*
