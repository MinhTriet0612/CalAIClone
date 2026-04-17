# CƠ SỞ KHOA HỌC Y SINH VÀ CÔNG NGHỆ ÁP DỤNG

Quá trình xây dựng ứng dụng Cal AI được thiết kế dựa trên sự giao thoa giữa hai nền tảng cốt lõi: Khoa học Y sinh (Dinh dưỡng học, Động lực học chuyển hóa) và Khoa học Máy tính (Mô hình AI, Thuật toán Lọc nhiễu).

## 1. Nền tảng Dinh dưỡng Sinh học (Biological Nutrition Models)

### 1.1 Khởi tạo mục tiêu với Phương trình Mifflin-St Jeor

Để cá nhân hóa lượng Calo đầu vào cho người dùng, hệ thống sử dụng phương trình **Mifflin-St Jeor (1990)** để tính toán Tỷ lệ Trao đổi chất Cơ bản (Basal Metabolic Rate - BMR). Đây là công thức được Hiệp hội Đái tháo đường Hoa Kỳ (ADA) công nhận là chính xác nhất hiện nay so với phương thức Harris-Benedict cũ.

* **Nam:** $BMR = 10 \cdot \text{Weight (kg)} + 6.25 \cdot \text{Height (cm)} - 5 \cdot \text{Age} + 5$
* **Nữ:** $BMR = 10 \cdot \text{Weight (kg)} + 6.25 \cdot \text{Height (cm)} - 5 \cdot \text{Age} - 161$

Tổng Lượng Calo Tiêu thụ Hàng ngày (TDEE) sau đó được nội suy bằng cách nhân BMR với hệ số vận động (Activity Multiplier), dao động từ $1.2$ (Ít vận động) đến $1.9$ (Vận động cường độ cao).

### 1.2 Phương pháp Quy nạp ngược tính toán TDEE Khách quan (Reverse Induction Adaptive TDEE)

Theo nguyên lý Bảo toàn Năng lượng (Định luật 1 Nhiệt động lực học), khi cơ thể đốt cháy nhiều năng lượng hơn mức nạp vào, cân nặng sẽ giảm (1kg mỡ tương đương ~7700 kcal).
Tuy nhiên, TDEE tính từ công thức Mifflin chỉ là ước tính (Estimated). Hệ thống Cal AI áp dụng thuật toán **Adaptive Coaching** bằng **Quy nạp ngược** dữ liệu thực tế 14 ngày để tìm ra TDEE thực tế:

$$TDEE_{real} = \text{Avg(Calories In)} - \frac{\Delta W_{14days} \cdot 7700}{14}$$

Thuật toán này loại bỏ hoàn toàn sai số của các thiết bị đo đếm bên ngoài (như Apple Watch), lấy chính biến động cơ thể làm tham chiếu gốc.

### 1.3 Mô hình hóa Suy giảm Chuyển hóa (Metabolic Adaptation & Plateau)

Khi ăn kiêng kéo dài, cơ thể kích hoạt cơ chế sinh tồn (Starvation Mode) làm giảm sinh nhiệt không qua vận động (NEAT), dẫn đến **Chững cân (Plateau)**. Cal AI lượng hóa hiện tượng này bằng Hệ số Thích ứng (Adaptation Ratio - $R$):

$$R = \frac{TDEE_{real}}{TDEE_{initial}}$$

Hệ thống thiết lập ngưỡng cảnh báo (Guardrail Threshold) ở mức **0.90**. Nếu $R \le 0.90$, hệ thống sẽ tự động phát tín hiệu "Metabolic Shift - Plateau Alert" để khuyên người dùng xả kiêng (Diet Break) nhằm hồi phục hoóc-môn.

---

## 2. Nền tảng Toán học và Thuật toán Máy tính

### 2.1 Thuật toán Lọc Nhiễu EMA (Exponential Moving Average)

Trọng lượng cơ thể dao động ngẫu nhiên hàng ngày do viêm cơ, tích nước, và thức ăn dư thừa chưa tiêu hóa. Để thuật toán Adaptive TDEE vận hành chính xác, dữ liệu cân nặng thô bắt buộc phải được làm mượt qua bộ lọc **EMA**:

$$W_{trend, t} = \alpha \cdot W_{actual} + (1 - \alpha) \cdot W_{trend, t-1}$$

Hệ thống tối ưu hóa tham số **$\alpha = 0.1$** (Hệ số làm mượt ở mức độ cao) nhằm lọc bỏ tín hiệu đột biến (spike) ngắn hạn, chỉ giữ lại xu hướng thực chất (True Trend) của khối lượng cơ thể.

### 2.2 Kiến trúc Trí tuệ Nhân tạo Đa phương thức (Multimodal AI)

Cal AI tận dụng sức mạnh của **Google Gemini 1.5 Flash (Vision & Pro)** thông qua API để xử lý cả ảnh chụp và hệ thống hội thoại:

* **Computer Vision (Thị giác máy tính):** Người dùng chụp ảnh bữa ăn. Mô hình phân tích không gian ngữ nghĩa hình ảnh để định danh chủng loại thực phẩm và ước tính khối lượng. Từ đó ánh xạ ra hàm lượng Dinh dưỡng Đa lượng (Macros: Protein, Carbs, Fats).
* **Prompt Engineering & Contextual AI:** Tính năng "Meat Chat" sử dụng LLM để giải đáp thắc mắc người dùng. Đầu vào (Prompt) được hệ thống nhúng tự động (Embed) biến dữ liệu TDEE và Calo thực tế trong ngày, giúp AI đưa ra lời khuyên "Bám sát ngữ cảnh" thay vì các câu trả lời lấy lệ rập khuôn.
* **Medical Guardrails (Hàng rào y tế):** Mọi tin nhắn trả về từ LLM phải đi qua một bộ lọc phân tích rủi ro. Nếu phát hiện các câu hỏi liên quan đến thuốc men, phác đồ điều trị bệnh lý (như tiểu đường, ung thư), AI tự động kích hoạt mã bảo vệ `DISCLAIMER` từ chối tư vấn chuyên khoa theo chuẩn an toàn phần mềm Y tế số.

---

### 3. Nguyên lý Đảm bảo Chất lượng Phần mềm (SQA Foundation)

Toàn bộ hệ thống Backend được phát triển trên Node.js (NestJS) và Typescript.

* **Domain-Driven Design (DDD):** Database (PostgreSQL/Prisma) phân tách rõ định danh người dùng (`User`) và hồ sơ sinh học (`Profile`) nhằm đảm bảo **Tính toàn vẹn (Integrity)**.
* **Traceability (Dò vết logic):** Cấu trúc Data được thiết kế theo phương pháp **Không xóa đè (Append-Only / Period-based)**. Khi làm mới mục tiêu (TargetPeriod), bản ghi quá khứ tự động bị chốt hạn (`EndDate`) thay vì bị ghi đè (`Overwrite`). Điều này đảm bảo tính khả kiểm (Auditability) 100% trong việc đánh giá sự thay đổi chuyển hóa theo mốc thời gian.
