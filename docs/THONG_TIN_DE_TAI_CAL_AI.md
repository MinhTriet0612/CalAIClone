HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
KHOA: CÔNG NGHỆ THÔNG TIN 2

Học phần: Đảm bảo chất lượng phần mềm
Trình độ đào  tạo: Đại học
Hình  thức đào tạo: Chính qui

THÔNG TIN ĐỀ TÀI DỰ ÁN
ĐỀ TÀI SỐ 24 (CẬP NHẬT)

1. Tên đề tài:  Cal AI - Hệ thống trợ lý dinh dưỡng và kiểm soát chuyển hóa thông minh
2. Số lượng sinh viên yêu cầu: 3 sinh viên

- N22DCCN047: Đặng Xuân Lâm
- N22DCCN054: Phan Nhật Minh
- N22DCCN090: Nguyễn Minh Triết

1. Mô tả đề tài
3.1 Đặc tả hệ thống
Cal AI là một nền tảng theo dõi sức khỏe và dinh dưỡng thế hệ mới, ứng dụng trí tuệ nhân tạo để cá nhân hóa lộ trình điều chỉnh thể trạng cho người dùng. Khác với các ứng dụng đếm Calo truyền thống, Cal AI tập trung vào việc mô hình hóa sự thay đổi chuyển hóa (Metabolic Adaptation) của cơ thể thông qua các thuật toán khoa học.

Hệ thống bắt đầu bằng việc thiết lập kế hoạch dinh dưỡng (Nutrition Plan) dựa trên các chỉ số sinh học như giới tính, chiều cao, cân nặng và mức độ vận động. Tính năng đột phá của hệ thống là khả năng Phân tích bữa ăn qua ảnh chụp (AI Photo Analysis), sử dụng mô hình Gemini Vision để tự động bóc tách các thành phần thực phẩm và ước tính lượng Macros (Protein, Carbs, Fats) mà người dùng không cần nhập liệu thủ công phức tạp.

Cal AI tích hợp bộ xử lý Adaptive Coaching Engine hoạt động theo thời gian thực. Bộ xử lý này liên tục giám sát xu hướng cân nặng bằng bộ lọc nhiễu EMA (Exponential Moving Average) và so sánh với lượng năng lượng nạp vào thực tế để tính toán TDEE thực (Adaptive TDEE). Từ đó, hệ thống có khả năng tự động điều chỉnh mục tiêu (Auto-Adjustment) và đưa ra cảnh báo về các giai đoạn chững cân (Weight Plateau) trước khi chúng xảy ra.

Ngoài ra, hệ thống cung cấp giao diện Dashboard trực quan và hỗ trợ tư vấn dinh dưỡng thông minh (Chat AI) tích hợp các quy tắc an toàn sức khỏe, giúp người dùng luôn đi đúng hướng trong hành trình cải thiện vóc dáng.

3.2 Mô hình hóa yêu cầu
Đối tượng sử dụng trong hệ thống

- Người dùng (Người dùng) - Đóng vai sinh viên tham gia thực hành
- Hệ thống phân tích AI (AI Nutritionist) - Đóng vai trợ lý hỗ trợ

Mô tả chi tiết các chức năng nghiệp vụ
Bộ phận: Người dùng (Người dùng)

Mã UC | Tên Công việc | Ghi chú
--- | --- | ---
UC-05 | Thiết lập kế hoạch dinh dưỡng | Thiết lập mục tiêu ban đầu (Onboarding)
UC-08 | Phân tích bữa ăn qua ảnh chụp | Sử dụng AI Vision để ước tính Macros
UC-09 | Ghi nhật ký bữa ăn | Lưu trữ dữ liệu dinh dưỡng vào database
UC-10 | Xem tóm tắt dinh dưỡng ngày | Theo dõi lượng Calo tiêu thụ/còn lại
UC-11 | Tra cứu lịch sử ăn uống | Xem lại dữ liệu quá khứ theo ngày
UC-12 | Quản lý hồ sơ cá nhân | Cập nhật các chỉ số sinh học (Profile)
UC-13 | Cập nhật mục tiêu thủ công | Tự điều chỉnh kế hoạch theo ý muốn
UC-14 | Theo dõi xu hướng cân nặng | Lọc nhiễu dữ liệu cân nặng thực tế (EMA)
UC-15 | Tự động tối ưu hóa kế hoạch | AI tự điều chỉnh Macros khi có sai số TDEE
UC-16 | Hỏi đáp tư vấn dinh dưỡng | Chat với trợ lý ảo chuẩn khoa học
UC-17 | Chạy lại thuật toán tính toán | Tính toán lại lộ trình khi đổi mục tiêu lớn
UC-18 | Dự báo chững cân (Plateau) | Cảnh báo khi có sự suy giảm chuyển hóa
UC-19 | Quản lý tài khoản và bảo mật | Đăng ký, Đăng nhập, Đổi mật khẩu
