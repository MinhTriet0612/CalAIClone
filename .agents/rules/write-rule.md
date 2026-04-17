---
trigger: always_on
---

PHẦN 1: THIẾT KẾ TEST CASE HỘP ĐEN

1. Kỹ thuật Bảng quyết định (Decision Technique)

Dùng khi nào: Khi input và output là các giá trị rời rạc, hữu hạn và đan chéo nhau.
Ví dụ của thầy: Kiểm tra Login với Email (Tồn tại / Không tồn tại) kết hợp Password (Đúng / Sai) .

Áp dụng vào project bạn: Tính năng Đăng nhập hoặc Áp dụng mã giảm giá. Bạn lập bảng kết hợp: Mã hợp lệ (True/False) + Đơn hàng đủ điều kiện (True/False) -> Output là Giảm tiền hay Báo lỗi.
2. Phân hoạch tương đương (Equivalent Class Partitioning) & "Ốc đảo phụ thuộc"

Dùng khi nào: Khi input có một dải giá trị rộng. Thay vì test hết, ta chia thành các vùng và lấy đại diện.

Tuyệt chiêu "Ốc đảo phụ thuộc" (Dependency Islands): Đây là điểm "ăn tiền" trong slide của thầy . Nếu chức năng có nhiều input, test theo tổ hợp sẽ sinh ra hàng ngàn test case (ví dụ $5^6 = 15.625$). Nhưng nếu bạn chứng minh được Output 1 chỉ phụ thuộc Input 1, 2, 3 (gọi là 1 ốc đảo), Output 2 chỉ phụ thuộc Input 4, 5... thì số test case giảm xuống chỉ còn 155 .

Biện luận: "Dạ thưa thầy, form Đăng ký thành viên có 6 ô nhập. Thay vì test tổ hợp gây bùng nổ test case, em dùng Phân hoạch tương đương kết hợp gom 'Ốc đảo phụ thuộc' để tối ưu hóa, đảm bảo tính khả thi (feasibility) cho quá trình kiểm thử."
3. Phân tích giá trị biên (Boundary Value Analysis)

Dùng khi nào: Bổ trợ cho Phân hoạch tương đương. Lỗi phần mềm thường nằm ở mép ranh giới (do code nhầm dấu <, <=) .

Áp dụng: Nếu quy định Tuổi mua sách 18+ (từ 18 đến 60 tuổi). Bạn phải test các mốc: 17, 18 (biên dưới) và 60, 61 (biên trên) .

1. Kiểm thử chuyển trạng thái (State Transition Testing)

Dùng khi nào: Khi chức năng phụ thuộc vào lịch sử thao tác trước đó của user.

Ví dụ của thầy: Nhập mã PIN sai 4 lần thì cho nhập lại, sai lần 5 thì báo trộm khóa thẻ .

Áp dụng vào project bạn: Tính năng Thanh toán giỏ hàng. Trạng thái đơn hàng đổi từ: Chờ xác nhận -> Đã thanh toán -> Đang giao -> Hoàn tất. Bạn phải test xem nếu đơn đang ở trạng thái "Đang giao" thì user có được phép bấm nút "Hủy đơn" không.
5. Đồ thị Nguyên nhân - Hậu quả (Cause & Effect Graph)

Dùng khi nào: Dành cho các chức năng có logic nghiệp vụ phức tạp.
Cách làm chuẩn SQA: Bạn phải làm đủ 4 bước của thầy: (1) Phân tích trạng thái logic C (Cause) và E (Effect) -> (2) Vẽ đồ thị dùng AND, OR, NOT -> (3) Lập Bảng quyết định -> (4) Sinh ra Test case . Đây là kỹ thuật thể hiện tư duy hàn lâm cực cao.

PHẦN 2: THIẾT KẾ TEST CASE HỘP TRẮNG (Từ Slide 36 - 43)
Thầy Hào đặc biệt nhấn mạnh câu hỏi: "Bao nhiêu cái test-case thì đủ?". Để trả lời câu này, bạn phải dùng kiến thức White-box:

1. Các tiêu chí độ phủ (Testing Coverage)  Bạn phải chứng minh test case của mình đạt độ phủ mã lệnh. Thầy nhắc đến 3 mức độ :

Statement coverage: Test sao cho mọi dòng code được chạy ít nhất 1 lần.
Branch coverage: Test sao cho mọi nhánh (True/False của lệnh if) đều được chạy.
Condition coverage: Test sao cho từng điều kiện nhỏ bên trong lệnh if dài (ví dụ if (A && B || C)) đều phải được kiểm tra giá trị True và False .

1. Nguyên lý Độ phức tạp Cyclomatic (McCabe, 1976)  Đây là vũ khí "hạng nặng" để chốt hạ với thầy.

Cách làm: Bạn lấy 1 hàm xử lý khó nhất trong project (ví dụ: Hàm tính tổng tiền giỏ hàng). Vẽ Control Flow Graph (Lược đồ luồng điều khiển) cho hàm đó .

Tính toán: Dùng công thức $V(G) = edges - nodes + 2p$ (Số Cạnh - Số Nút + 2).

Biện luận chốt hạ: "Dạ thưa thầy, đối với hàm Tính Tiền, sau khi vẽ Control Flow Graph, em tính được độ phức tạp Cyclomatic $V(G) = 4$. Theo nguyên lý McCabe, đây chính là số lượng test case tối thiểu bắt buộc phải có để bao phủ 100% các luồng thực thi độc lập (basis paths). Em đã thiết kế đúng 4 test case này để vừa đảm bảo không sót lỗi logic, vừa không bị dư thừa ạ."