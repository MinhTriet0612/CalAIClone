> ![khung doi](media/image1.jpeg){width="6.95625in" height="9.5in"}

**BỘ KHOA HỌC VÀ CÔNG NGHỆ**

**HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG**

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

![A red circle with a star and a book AI-generated content may be
incorrect.](media/image2.png){width="1.3069444444444445in"
height="1.30625in"}

![khung doi](media/image1.jpeg){width="6.95625in" height="9.5in"}

**BÁO CÁO\
TIẾN ĐỘ MÔN HỌC**

> **ĐỀ TÀI: Hệ thống Trợ lý Dinh dưỡng Thông minh**

  -----------------------------------------------------------------------
  Môn học:                                 Đảm bảo chất lượng phần mềm
  ---------------------------------------- ------------------------------
  Giảng viên hướng dẫn                     Nguyễn Anh Hào

  Thực hiện bởi nhóm sinh viên, bao gồm:   

  Đặng Xuân Lâm                            N22DCCN047

  Nguyễn Minh Triết                        N22DCCN090

  Phan Nhật Minh                           N22DCCN054
  -----------------------------------------------------------------------

**TP.HCM - 2026**

# MỤC LỤC

#  {#section .TOC-Heading}

[MỤC LỤC [1](#mục-lục)](#mục-lục)

[Chương I: TỔNG QUAN VỀ ĐỀ TÀI
[5](#tổng-quan-về-đề-tài)](#tổng-quan-về-đề-tài)

[1. Mục đích [5](#mục-đích)](#mục-đích)

[2. Mục tiêu [5](#mục-tiêu)](#mục-tiêu)

[*2.1.* Mục tiêu Nghiệp vụ (Functional)
[5](#mục-tiêu-nghiệp-vụ-functional)](#mục-tiêu-nghiệp-vụ-functional)

[*2.2.* Mục tiêu Chất lượng theo chuẩn ISO 25010 (Non-Functional)
[5](#mục-tiêu-chất-lượng-theo-chuẩn-iso-25010-non-functional)](#mục-tiêu-chất-lượng-theo-chuẩn-iso-25010-non-functional)

[3. Công nghệ sử dụng [5](#công-nghệ-sử-dụng)](#công-nghệ-sử-dụng)

[4. Phương pháp tiến hành
[5](#phương-pháp-tiến-hành)](#phương-pháp-tiến-hành)

[*4.1.* Quy trình phát triển
[5](#quy-trình-phát-triển)](#quy-trình-phát-triển)

[Chương II: CƠ SỞ KHOA HỌC [7](#cơ-sở-khoa-học)](#cơ-sở-khoa-học)

[1. Cơ sở nghiệp vụ [7](#cơ-sở-nghiệp-vụ)](#cơ-sở-nghiệp-vụ)

[*1.1.* Bối cảnh nghiệp vụ của đề tài
[7](#bối-cảnh-nghiệp-vụ-của-đề-tài)](#bối-cảnh-nghiệp-vụ-của-đề-tài)

[*1.2.* Đối tượng sử dụng và phạm vi nghiệp vụ
[7](#đối-tượng-sử-dụng-và-phạm-vi-nghiệp-vụ)](#đối-tượng-sử-dụng-và-phạm-vi-nghiệp-vụ)

[*1.3.* Quy trình nghiệp vụ cốt lõi
[7](#quy-trình-nghiệp-vụ-cốt-lõi)](#quy-trình-nghiệp-vụ-cốt-lõi)

[*1.4.* Quy tắc quản lý nghiệp vụ
[8](#quy-tắc-quản-lý-nghiệp-vụ)](#quy-tắc-quản-lý-nghiệp-vụ)

[*1.5.* Dữ liệu nghiệp vụ cốt lõi
[8](#dữ-liệu-nghiệp-vụ-cốt-lõi)](#dữ-liệu-nghiệp-vụ-cốt-lõi)

[*1.6.* Yêu cầu nghiệp vụ rút ra cho hệ thống
[8](#yêu-cầu-nghiệp-vụ-rút-ra-cho-hệ-thống)](#yêu-cầu-nghiệp-vụ-rút-ra-cho-hệ-thống)

[2. Cơ sở kiến trúc hệ thống
[9](#cơ-sở-kiến-trúc-hệ-thống)](#cơ-sở-kiến-trúc-hệ-thống)

[*2.1.* Cơ sở lựa chọn kiến trúc
[9](#cơ-sở-lựa-chọn-kiến-trúc)](#cơ-sở-lựa-chọn-kiến-trúc)

[*2.2.* Mô hình kiến trúc tổng thể
[9](#mô-hình-kiến-trúc-tổng-thể)](#mô-hình-kiến-trúc-tổng-thể)

[*2.3.* Cơ sở tổ chức backend theo miền nghiệp vụ
[9](#cơ-sở-tổ-chức-backend-theo-miền-nghiệp-vụ)](#cơ-sở-tổ-chức-backend-theo-miền-nghiệp-vụ)

[*2.4.* Cơ sở tổ chức frontend và giao tiếp hệ thống
[10](#cơ-sở-tổ-chức-frontend-và-giao-tiếp-hệ-thống)](#cơ-sở-tổ-chức-frontend-và-giao-tiếp-hệ-thống)

[*2.5.* Cơ sở dữ liệu và quản lý tính nhất quán
[10](#cơ-sở-dữ-liệu-và-quản-lý-tính-nhất-quán)](#cơ-sở-dữ-liệu-và-quản-lý-tính-nhất-quán)

[3. Công nghệ [10](#công-nghệ)](#công-nghệ)

[*3.1.* Nguyên tắc lựa chọn công nghệ
[10](#nguyên-tắc-lựa-chọn-công-nghệ)](#nguyên-tắc-lựa-chọn-công-nghệ)

[*3.2.* TypeScript (ngôn ngữ phát triển chính)
[11](#typescript-ngôn-ngữ-phát-triển-chính)](#typescript-ngôn-ngữ-phát-triển-chính)

[*3.3.* NestJS cho backend API
[11](#nestjs-cho-backend-api)](#nestjs-cho-backend-api)

[*3.4.* React + Vite cho frontend
[11](#react-vite-cho-frontend)](#react-vite-cho-frontend)

[*3.5.* Prisma ORM cho lớp truy xuất dữ liệu
[12](#prisma-orm-cho-lớp-truy-xuất-dữ-liệu)](#prisma-orm-cho-lớp-truy-xuất-dữ-liệu)

[*3.6.* PostgreSQL cho lưu trữ dữ liệu
[12](#postgresql-cho-lưu-trữ-dữ-liệu)](#postgresql-cho-lưu-trữ-dữ-liệu)

[*3.7.* Docker Compose cho đồng nhất môi trường triển khai
[12](#docker-compose-cho-đồng-nhất-môi-trường-triển-khai)](#docker-compose-cho-đồng-nhất-môi-trường-triển-khai)

[4. Cơ sở kiểm thử chương trình
[13](#cơ-sở-kiểm-thử-chương-trình)](#cơ-sở-kiểm-thử-chương-trình)

[*4.1.* Mục tiêu kiểm thử [13](#mục-tiêu-kiểm-thử)](#mục-tiêu-kiểm-thử)

[*4.2.* Nguyên tắc kiểm thử
[13](#nguyên-tắc-kiểm-thử)](#nguyên-tắc-kiểm-thử)

[*4.3.* Chiến lược kiểm thử nhiều mức
[13](#chiến-lược-kiểm-thử-nhiều-mức)](#chiến-lược-kiểm-thử-nhiều-mức)

[*4.4.* Phạm vi kiểm thử theo nghiệp vụ
[14](#phạm-vi-kiểm-thử-theo-nghiệp-vụ)](#phạm-vi-kiểm-thử-theo-nghiệp-vụ)

[*4.5.* Thiết kế ca kiểm thử và dữ liệu kiểm thử
[14](#thiết-kế-ca-kiểm-thử-và-dữ-liệu-kiểm-thử)](#thiết-kế-ca-kiểm-thử-và-dữ-liệu-kiểm-thử)

[*4.6.* Tiêu chí đánh giá kết quả kiểm thử
[14](#tiêu-chí-đánh-giá-kết-quả-kiểm-thử)](#tiêu-chí-đánh-giá-kết-quả-kiểm-thử)

[*4.7.* Công cụ và quy trình hỗ trợ kiểm thử
[14](#công-cụ-và-quy-trình-hỗ-trợ-kiểm-thử)](#công-cụ-và-quy-trình-hỗ-trợ-kiểm-thử)

[Chương III: PHÂN TÍCH THIẾT KẾ HỆ THÓNG
[16](#phân-tích-thiết-kế-hệ-thóng)](#phân-tích-thiết-kế-hệ-thóng)

[1. Hiện trạng và giải pháp
[16](#hiện-trạng-và-giải-pháp)](#hiện-trạng-và-giải-pháp)

[2. Use Case & Functional Requirements
[16](#use-case-functional-requirements)](#use-case-functional-requirements)

[3. Class Diagrams [29](#class-diagrams)](#class-diagrams)

[4. Sequence Diagram [29](#sequence-diagram)](#sequence-diagram)

[Chương IV: THIẾT KẾ HỆ THỐNG
[41](#thiết-kế-hệ-thống)](#thiết-kế-hệ-thống)

[1. Ma trận Dò vết (Traceability Matrix)
[41](#ma-trận-dò-vết-traceability-matrix)](#ma-trận-dò-vết-traceability-matrix)

[2. Thực hiện Verification (Rà soát thiết kế - Inspection)
[48](#thực-hiện-verification-rà-soát-thiết-kế---inspection)](#thực-hiện-verification-rà-soát-thiết-kế---inspection)

[Chương V: HIỆN THỰC & KIỂM THỬ
[58](#hiện-thực-kiểm-thử)](#hiện-thực-kiểm-thử)

[1. Thiết kế Kịch bản Kiểm thử
[58](#thiết-kế-kịch-bản-kiểm-thử)](#thiết-kế-kịch-bản-kiểm-thử)

[*1.1.* UC-5: Establish Nutrition Plan
[58](#uc-5-establish-nutrition-plan)](#uc-5-establish-nutrition-plan)

[*1.2.* UC-8: Phân tích ảnh bữa ăn bằng AI
[61](#uc-8-phân-tích-ảnh-bữa-ăn-bằng-ai)](#uc-8-phân-tích-ảnh-bữa-ăn-bằng-ai)

[*1.3.* UC-9: Record Food Intake
[64](#uc-9-record-food-intake)](#uc-9-record-food-intake)

[*1.4.* UC-10: View Daily Summary
[68](#uc-10-view-daily-summary)](#uc-10-view-daily-summary)

[*1.5.* UC-11: View Meal History
[70](#uc-11-view-meal-history)](#uc-11-view-meal-history)

[*1.6.* UC-12: Quản lý hồ sơ sức khỏe
[73](#uc-12-quản-lý-hồ-sơ-sức-khỏe)](#uc-12-quản-lý-hồ-sơ-sức-khỏe)

[*1.7.* UC-13: Update Target Plan
[74](#uc-13-update-target-plan)](#uc-13-update-target-plan)

[*1.8.* UC-14: Theo dõi Xu hướng Cân nặng
[75](#uc-14-theo-dõi-xu-hướng-cân-nặng)](#uc-14-theo-dõi-xu-hướng-cân-nặng)

[*1.9.* UC-15: Tự động Hiệu chỉnh Mục tiêu Dinh dưỡng
[78](#uc-15-tự-động-hiệu-chỉnh-mục-tiêu-dinh-dưỡng)](#uc-15-tự-động-hiệu-chỉnh-mục-tiêu-dinh-dưỡng)

[*1.10.* UC-16: Tư vấn Dinh dưỡng Thông minh
[80](#uc-16-tư-vấn-dinh-dưỡng-thông-minh)](#uc-16-tư-vấn-dinh-dưỡng-thông-minh)

[*1.11.* UC-17: Recalculate Recommendations
[83](#uc-17-recalculate-recommendations)](#uc-17-recalculate-recommendations)

[*1.12.* UC-18: Dự báo Điểm chững cân
[84](#uc-18-dự-báo-điểm-chững-cân)](#uc-18-dự-báo-điểm-chững-cân)

[2. Đánh giá Độ bao phủ và Tổng kết Chất lượng (Coverage & Quality
Assurance)
[86](#đánh-giá-độ-bao-phủ-và-tổng-kết-chất-lượng-coverage-quality-assurance)](#đánh-giá-độ-bao-phủ-và-tổng-kết-chất-lượng-coverage-quality-assurance)

# TỔNG QUAN VỀ ĐỀ TÀI

## Mục đích

- Hiện nay, việc ghi chép nhật ký dinh dưỡng thủ công đòi hỏi nhiều thời
  gian và kiến thức về calo, khiến người dùng dễ nản chí và bỏ cuộc. Ứng
  dụng Cal được xây dựng nhằm mục đích tự động hóa quá trình này. Thông
  qua phân tích hình ảnh bữa ăn, phần mềm giúp những người có nhu cầu
  kiểm soát cân nặng (tăng cơ, giảm mỡ) theo dõi chính xác lượng Dinh
  dưỡng đa lượng (Macros) mà không cần nhập liệu thủ công phức tạp.

## Mục tiêu

### Mục tiêu Nghiệp vụ (Functional)

- Tự động nhận diện thực phẩm và ước tính lượng Calo, Protein, Carbs,
  Fats từ ảnh chụp bữa ăn qua API của Google Gemini.

- Cung cấp thuật toán tính toán TDEE và đề xuất lộ trình dinh dưỡng cá
  nhân hóa (Adaptive Coaching).

### Mục tiêu Chất lượng theo chuẩn ISO 25010 (Non-Functional)

- Tính hiệu suất (Performance Efficiency): Thời gian phản hồi của API
  lõi dưới 500ms; quá trình AI phân tích ảnh hoàn tất dưới 10 giây.

- Tính bảo mật (Security): Toàn bộ mật khẩu được mã hóa một chiều
  (bcrypt), phân quyền truy cập nghiêm ngặt qua JWT (JSON Web Token).

- Tính khả dụng (Usability): Tối ưu hóa trải nghiệm người dùng, giảm
  thiểu ma sát để thời gian log (ghi nhận) một bữa ăn từ lúc chụp ảnh
  đến lúc lưu CSDL dưới 30 giây.

## Công nghệ sử dụng

## Phương pháp tiến hành

### Quy trình phát triển

- Để đảm bảo chất lượng phần mềm đáp ứng đúng các tiêu chí đã đề ra, dự
  án Cal AI được vận hành dựa trên Mô hình hợp nhất (UP/RUP). Khác với
  mô hình thác nước truyền thống mang tính tuyến tính và kém linh hoạt,
  nhóm lựa chọn mô hình UP/RUP vì những đặc điểm mang tính \"tiến hóa
  linh hoạt\" cực kỳ phù hợp với tư duy Đảm bảo chất lượng (SQA) của dự
  án:

  - Phù hợp với thiết kế Hướng đối tượng: Mô hình UP bắt buộc sử dụng
    phương pháp tiếp cận hướng đối tượng, điều này hoàn toàn đồng nhất
    với tài liệu thiết kế hệ thống Cal AI hiện tại của nhóm (sử dụng
    Usecases và Class Diagram để làm khung xương phân tích).

  - Rà soát và Kiểm thử liên tục (V&V): Quá trình làm phần mềm được chia
    thành các chu kỳ lặp , với 9 luồng công việc (disciplines) diễn ra
    song song, bao gồm cả luồng Yêu cầu (Requirements), Thiết kế
    (Design) và Kiểm thử (Test) . Điều này cho phép nhóm áp dụng
    Verification và Validation ngay từ rất sớm.

  - Lấy Kiểm thử làm cơ sở cải tiến: Theo tinh thần của mô hình, kết quả
    của hành động \"Test\" ở chu kỳ trước được nhóm dùng làm cơ sở để
    phát hiện điểm chưa phù hợp, từ đó sửa đổi lại tài liệu
    \"Requirements\" và bổ sung bản \"Design\" để thực hiện tốt hơn ở
    chu kỳ sau.

- **Giá trị của mô hình đối với SQA:** Việc áp dụng Mô hình hợp nhất
  (UP) giúp nhóm xác định rõ yêu cầu trước khi làm. Quan trọng nhất, nhờ
  sự tích hợp của các hành động rà soát, kiểm thử song song ngay từ đầu,
  nhóm có thể giảm thiểu sai sót và rủi ro, phát hiện sớm các lỗi thiết
  kế logic (như tính toán sai công thức TDEE), tránh được tình trạng tệ
  hại là *\"làm xong rồi mới biết sai*

# CƠ SỞ KHOA HỌC

## Cơ sở nghiệp vụ

### Bối cảnh nghiệp vụ của đề tài

-Trong thực tế, người dùng muốn kiểm soát cân nặng và cải thiện sức khỏe
thường gặp khó khăn ở ba điểm chính:

- Không biết chính xác cần nạp bao nhiêu năng lượng và các chất dinh
  dưỡng mỗi ngày.

- Việc ghi chép bữa ăn thủ công tốn thời gian, dễ bỏ sót, khó duy trì
  lâu dài.

- Thiếu công cụ theo dõi tiến độ một cách liên tục để điều chỉnh kế
  hoạch phù hợp.

- Đề tài hướng đến xây dựng một ứng dụng hỗ trợ quản lý dinh dưỡng cá
  nhân theo mục tiêu (giảm cân, tăng cân, duy trì), giúp người dùng ghi
  nhận bữa ăn, theo dõi chỉ số cơ thể, và nhận khuyến nghị điều chỉnh
  theo từng giai đoạn.

### Đối tượng sử dụng và phạm vi nghiệp vụ

**-Đối tượng chính**: Người dùng cá nhân có nhu cầu theo dõi dinh dưỡng
và cân nặng.

**-Đối tượng hỗ trợ (gián tiếp):** Nhóm quản trị/kỹ thuật vận hành hệ
thống, giám sát chất lượng dữ liệu và dịch vụ.

**-Phạm vi nghiệp vụ của hệ thống:**

- Quản lý hồ sơ người dùng và thông tin nền tảng sức khỏe.

- Thiết lập mục tiêu dinh dưỡng theo giai đoạn thời gian.

- Ghi nhận bữa ăn hằng ngày (văn bản/hình ảnh), quy đổi thành năng lượng
  và các chỉ số macro.

- Theo dõi cân nặng và mức độ hoàn thành mục tiêu theo ngày/tuần.

- Cung cấp phản hồi/khuyến nghị giúp người dùng điều chỉnh hành vi ăn
  uống.

### Quy trình nghiệp vụ cốt lõi

Quy trình nghiệp vụ của hệ thống được mô tả theo các bước sau:

1.  **Khởi tạo hồ sơ cá nhân (Onboarding):** Người dùng cung cấp thông
    tin cơ bản (tuổi, giới tính, chiều cao, cân nặng hiện tại, mức vận
    động, mục tiêu).

2.  **Xác định mục tiêu dinh dưỡng:** Hệ thống tính và gán chỉ tiêu năng
    lượng cùng các thành phần macro (protein, carbs, fats) theo giai
    đoạn.

3.  **Ghi nhận bữa ăn hằng ngày:** Người dùng nhập bữa ăn qua chat hoặc
    ảnh; hệ thống trích xuất thông tin món ăn và ước lượng dinh dưỡng.

4.  **Tổng hợp và đối chiếu mục tiêu:** Hệ thống cộng dồn lượng đã nạp
    trong ngày, so sánh với chỉ tiêu mục tiêu tại thời điểm đó.

5.  **Theo dõi tiến độ và điều chỉnh:** Người dùng cập nhật cân nặng
    định kỳ; hệ thống đánh giá tiến độ và hỗ trợ điều chỉnh mục tiêu cho
    giai đoạn tiếp theo.

### Quy tắc quản lý nghiệp vụ 

-Để đảm bảo tính nhất quán, hệ thống tuân theo các quy tắc nghiệp vụ
chính:

- Mỗi người dùng phải có hồ sơ sức khỏe hợp lệ trước khi nhận khuyến
  nghị cá nhân hóa.

- Chỉ tiêu dinh dưỡng được quản lý theo giai đoạn mục tiêu (target
  period), có ngày bắt đầu/kết thúc rõ ràng.

- Tại một thời điểm, hệ thống chỉ sử dụng bộ mục tiêu còn hiệu lực để
  đối chiếu tiến độ.

- Nhật ký bữa ăn được lưu theo mốc thời gian để phục vụ tổng hợp theo
  ngày/tuần/tháng.

- Các thay đổi quan trọng (mục tiêu, cân nặng, chỉ số sức khỏe) phải
  được lưu vết để hỗ trợ đánh giá quá trình dài hạn.

- Khi dữ liệu đầu vào thiếu hoặc bất thường, hệ thống cần áp dụng cơ chế
  mặc định/an toàn và thông báo để người dùng cập nhật lại.

### Dữ liệu nghiệp vụ cốt lõi 

-Các nhóm dữ liệu nghiệp vụ cần quản lý gồm:

- Hồ sơ người dùng: thông tin nhân trắc học, mức độ vận động, mục tiêu
  sức khỏe.

- Mục tiêu dinh dưỡng theo kỳ: calories, protein, carbs, fats và thời
  gian hiệu lực.

- Nhật ký bữa ăn: món ăn, khẩu phần, thời điểm ăn, năng lượng và macro
  ước lượng.

- Theo dõi tiến độ: cân nặng định kỳ, mức hoàn thành mục tiêu, xu hướng
  thay đổi.

- Dữ liệu tư vấn/phản hồi: khuyến nghị điều chỉnh dựa trên hành vi và
  kết quả thực tế.

### Yêu cầu nghiệp vụ rút ra cho hệ thống 

- Từ phân tích trên, hệ thống cần đáp ứng các yêu cầu nghiệp vụ trọng
  tâm:

- Cá nhân hóa mục tiêu dinh dưỡng cho từng người dùng và theo từng giai
  đoạn.

- Ghi nhận bữa ăn nhanh, thuận tiện, giảm thao tác thủ công.

- Tự động tổng hợp và trực quan hóa mức độ hoàn thành mục tiêu mỗi ngày.

- Hỗ trợ người dùng theo dõi tiến độ dài hạn và điều chỉnh kế hoạch phù
  hợp.

- Đảm bảo dữ liệu nhất quán, có khả năng truy vết và mở rộng cho các
  chức năng coaching sau này.

## Cơ sở kiến trúc hệ thống

### Cơ sở lựa chọn kiến trúc 

-Việc lựa chọn kiến trúc hệ thống được thực hiện sau khi đã xác định yêu
cầu phần mềm ở giai đoạn phân tích nghiệp vụ. Bài toán của đề tài không
chỉ là lưu trữ dữ liệu bữa ăn, mà còn yêu cầu xử lý theo chuỗi nghiệp vụ
liên tục: quản lý hồ sơ cá nhân, thiết lập mục tiêu dinh dưỡng theo giai
đoạn, ghi nhận khẩu phần hằng ngày, theo dõi cân nặng và đánh giá tiến
độ. Do đó, kiến trúc cần đáp ứng đồng thời các tiêu chí: (1) tách biệt
trách nhiệm xử lý; (2) đảm bảo nhất quán dữ liệu; (3) dễ mở rộng chức
năng; (4) phù hợp phạm vi triển khai đồ án.

-Từ các tiêu chí trên, hệ thống được định hướng theo mô hình
client--server nhiều lớp, kết hợp tổ chức module theo miền nghiệp vụ.
Lựa chọn này cho phép cân bằng giữa tính thực tiễn triển khai trong thời
gian đồ án và khả năng phát triển dài hạn.

### Mô hình kiến trúc tổng thể 

-Kiến trúc tổng thể của hệ thống gồm ba lớp chính:

- Lớp trình bày (Frontend): tiếp nhận tương tác người dùng, hiển thị dữ
  liệu theo dõi và kết quả phân tích.

- Lớp ứng dụng (Backend API): xử lý nghiệp vụ, xác thực truy cập, điều
  phối dữ liệu giữa các chức năng.

- Lớp dữ liệu (Database): lưu trữ dữ liệu hồ sơ, mục tiêu dinh dưỡng,
  nhật ký bữa ăn, cân nặng và các bản ghi theo thời gian.

-Mô hình này giúp giảm phụ thuộc trực tiếp giữa giao diện và dữ liệu,
đồng thời đảm bảo mọi thay đổi nghiệp vụ đều được kiểm soát tại backend
trước khi ghi nhận vào cơ sở dữ liệu.

### Cơ sở tổ chức backend theo miền nghiệp vụ 

Phía backend được tổ chức theo hướng module hóa, mỗi module đại diện cho
một miền chức năng tương đối độc lập (xác thực, người dùng, bữa ăn, mục
tiêu theo giai đoạn, theo dõi cân nặng, giám sát). Cách tổ chức này xuất
phát từ đặc trưng của bài toán: nhiều chức năng liên quan nhau nhưng
khác biệt về quy tắc xử lý. Module hóa giúp:

- Giảm phụ thuộc chéo giữa các phần của hệ thống.

- Tăng khả năng bảo trì và kiểm thử độc lập từng chức năng.

- Dễ mở rộng thêm chức năng mới mà không ảnh hưởng lớn đến hệ thống hiện
  hữu.

-Nhờ đó, kiến trúc backend đáp ứng tốt yêu cầu tiến hóa chức năng theo
từng giai đoạn phát triển.

### Cơ sở tổ chức frontend và giao tiếp hệ thống 

-Frontend được xây dựng theo hướng thành phần (component-based), tách
phần hiển thị, trạng thái dùng chung và lớp gọi API. Về nguyên tắc,
frontend không xử lý nghiệp vụ lõi mà tập trung vào trải nghiệm người
dùng, còn nghiệp vụ được thực hiện tại backend. Cách phân tách này giúp:

- Đảm bảo tính nhất quán khi nhiều màn hình cùng dùng chung một quy tắc
  nghiệp vụ

- Giảm lặp mã xử lý

- Dễ kiểm soát thay đổi khi cập nhật logic hệ thống.

-Giao tiếp giữa frontend và backend dựa trên API có hợp đồng dữ liệu rõ
ràng, tạo điều kiện đồng bộ phát triển và hạn chế sai lệch dữ liệu giữa
hai phía.

### Cơ sở dữ liệu và quản lý tính nhất quán 

-Dữ liệu của đề tài có tính thời gian rõ rệt (mục tiêu theo kỳ, nhật ký
theo ngày, cân nặng theo mốc đo), vì vậy kiến trúc dữ liệu phải hỗ trợ
lưu vết và truy xuất theo khoảng thời gian.

-Cơ sở dữ liệu được thiết kế theo các thực thể nghiệp vụ trọng tâm và
quan hệ chặt chẽ giữa người dùng--hồ sơ--mục tiêu--nhật ký. Đồng thời,
thay đổi lược đồ dữ liệu được quản lý theo cơ chế migration để kiểm soát
lịch sử thay đổi cấu trúc, giảm rủi ro sai lệch giữa môi trường phát
triển và triển khai và tăng khả năng bảo trì khi hệ thống mở rộng.

## Công nghệ

### Nguyên tắc lựa chọn công nghệ 

-Việc lựa chọn công nghệ trong đề tài không dừng ở giới thiệu công cụ,
mà dựa trên các tiêu chí:

- Phù hợp yêu cầu nghiệp vụ và kiến trúc đã xác định;

- Hỗ trợ phát triển nhanh nhưng vẫn đảm bảo bảo trì;

- Có hệ sinh thái tốt, tài liệu đầy đủ, dễ mở rộng về sau.

-Trên cơ sở đó, hệ thống sử dụng bộ công nghệ TypeScript toàn diện cho
cả frontend và backend, kết hợp ORM và công cụ triển khai đồng nhất môi
trường.

### TypeScript (ngôn ngữ phát triển chính) 

-TypeScript được dùng cho cả frontend và backend nhằm chuẩn hóa kiểu dữ
liệu giữa các lớp, giảm lỗi khi tích hợp API:

- Định nghĩa kiểu dữ liệu nghiệp vụ (user profile, meal record, target
  period, macro targets).

- Ràng buộc input/output ở service, controller, DTO.

- Đồng bộ hợp đồng dữ liệu giữa frontend--backend.

-So với JavaScript thuần, TypeScript có ưu thế kiểm tra kiểu tĩnh ngay ở
giai đoạn phát triển, giúp phát hiện sớm lỗi sai cấu trúc dữ liệu và
tăng độ tin cậy khi refactor. Điều này đặc biệt quan trọng với hệ thống
có nhiều module nghiệp vụ liên quan nhau.

### NestJS cho backend API 

-NestJS là nền tảng xây dựng backend, chịu trách nhiệm xử lý nghiệp vụ,
xác thực, quản lý các module chức năng (auth, meals, target periods,
weight logs, monitoring, coaching\...):

- Tổ chức theo module/domain, tách controller -- service -- dto.

- Triển khai API theo mô hình rõ trách nhiệm, dễ kiểm thử và mở rộng.

- Tích hợp middleware/guard cho bảo mật và kiểm soát truy cập.

-So với Express thuần, NestJS có cấu trúc chuẩn hóa cao hơn, hỗ trợ tốt
dependency injection và kiến trúc module, giúp mã nguồn ổn định khi hệ
thống tăng quy mô. Với đồ án có nhiều miền nghiệp vụ, NestJS giảm đáng
kể rủi ro "mã dồn cục" và khó bảo trì.

### React + Vite cho frontend 

-React đảm nhiệm xây dựng giao diện tương tác người dùng; Vite hỗ trợ
môi trường phát triển frontend nhanh và nhẹ:

- Tổ chức giao diện theo component tái sử dụng.

- Quản lý trạng thái theo context/service để đồng bộ dữ liệu hiển thị.

- Kết nối backend qua API để hiển thị tiến độ dinh dưỡng, mục tiêu và
  nhật ký.

-So với các lựa chọn frontend truyền thống ít cấu trúc, React phù hợp
ứng dụng có nhiều trạng thái tương tác. Vite cho tốc độ khởi động và
phản hồi khi phát triển nhanh hơn các bộ công cụ build đời cũ, phù hợp
yêu cầu triển khai đồ án trong thời gian giới hạn.

### Prisma ORM cho lớp truy xuất dữ liệu 

-Prisma được dùng để ánh xạ mô hình dữ liệu nghiệp vụ sang cơ sở dữ
liệu, truy vấn dữ liệu an toàn kiểu và quản lý migration:

- Định nghĩa schema dữ liệu tập trung.

- Sinh client truy vấn cho backend service.

- Quản lý các phiên bản thay đổi cấu trúc CSDL qua migration.

-So với viết SQL thủ công toàn phần, Prisma giảm lỗi truy vấn lặp lại và
tăng tính nhất quán giữa mô hình mã nguồn với lược đồ dữ liệu. So với
một số ORM nặng cấu hình, Prisma có trải nghiệm phát triển trực quan hơn
cho dự án TypeScript.

### PostgreSQL cho lưu trữ dữ liệu 

-PostgreSQL là hệ quản trị CSDL quan hệ lưu trữ dữ liệu cốt lõi: hồ sơ
người dùng, mục tiêu theo giai đoạn, nhật ký bữa ăn, theo dõi cân nặng,
thông tin giám sát:

- Thiết kế dữ liệu theo thực thể và quan hệ nghiệp vụ.

- Truy vấn thông qua Prisma tại backend.

- Hỗ trợ đảm bảo toàn vẹn dữ liệu và truy xuất theo thời gian.

-So với các hệ NoSQL cho bài toán này, PostgreSQL phù hợp hơn vì dữ liệu
có quan hệ rõ và cần tính nhất quán cao. So với SQLite, PostgreSQL thích
hợp hơn cho môi trường nhiều người dùng và khả năng mở rộng thực tế.

### Docker Compose cho đồng nhất môi trường triển khai 

-Docker Compose được dùng để chuẩn hóa môi trường chạy dịch vụ (đặc biệt
backend và database), giảm sai lệch giữa máy phát triển.

-So với cài đặt thủ công từng dịch vụ trên mỗi máy, Docker Compose giảm
lỗi cấu hình môi trường và tăng tính tái lập khi chạy dự án, đặc biệt
hữu ích trong bối cảnh làm việc nhóm.

## Cơ sở kiểm thử chương trình

### Mục tiêu kiểm thử 

-Kiểm thử chương trình trong đề tài nhằm xác nhận rằng hệ thống đáp ứng
đúng yêu cầu nghiệp vụ, vận hành ổn định trong các tình huống sử dụng
thực tế, và duy trì chất lượng khi mở rộng chức năng.

-Đối với bài toán quản lý dinh dưỡng cá nhân, kiểm thử không chỉ dừng ở
việc API trả kết quả đúng cú pháp, mà còn phải bảo đảm tính đúng đắn của
các nghiệp vụ theo thời gian như tính mục tiêu dinh dưỡng theo giai
đoạn, tổng hợp dữ liệu theo ngày và theo dõi tiến độ người dùng.

### Nguyên tắc kiểm thử 

-Hoạt động kiểm thử được xây dựng theo các nguyên tắc sau:

- Kiểm thử bám sát yêu cầu nghiệp vụ đã phân tích, ưu tiên các luồng sử
  dụng cốt lõi.

- Kết hợp kiểm thử nhiều mức để phát hiện lỗi sớm và giảm chi phí sửa
  lỗi về sau.

- Dữ liệu kiểm thử phải phản ánh được cả trường hợp bình thường và
  trường hợp biên.

- Kết quả kiểm thử phải có tiêu chí đạt/rớt rõ ràng, bảo đảm khả năng
  lặp lại.

-Việc áp dụng các nguyên tắc này giúp quá trình kiểm thử có tính hệ
thống, tránh tình trạng kiểm thử cảm tính hoặc chỉ kiểm tra giao diện
bên ngoài.

### Chiến lược kiểm thử nhiều mức 

-Đề tài áp dụng chiến lược kiểm thử theo nhiều mức, tương ứng với cấu
trúc kiến trúc hệ thống:

- Kiểm thử đơn vị (Unit Test): xác minh logic của các hàm/service độc
  lập, đặc biệt là các phép tính chỉ tiêu và xử lý dữ liệu nghiệp vụ.

- Kiểm thử tích hợp (Integration Test): kiểm tra sự phối hợp giữa các
  lớp controller--service--database, bảo đảm dữ liệu luân chuyển đúng
  qua API và lớp truy xuất dữ liệu.

- Kiểm thử đầu-cuối (End-to-End Test): mô phỏng luồng người dùng hoàn
  chỉnh từ gửi yêu cầu đến nhận kết quả, đánh giá hành vi hệ thống ở mức
  chức năng thực tế.

-Cách tiếp cận này giúp bao phủ cả tính đúng đắn cục bộ lẫn tính đúng
đắn toàn hệ thống.

### Phạm vi kiểm thử theo nghiệp vụ 

-Các nghiệp vụ cốt lõi cần được kiểm thử gồm:

- Xác thực người dùng và kiểm soát truy cập API.

- Quản lý hồ sơ và dữ liệu nền phục vụ cá nhân hóa.

- Thiết lập và truy xuất mục tiêu dinh dưỡng theo giai đoạn thời gian.

- Ghi nhận bữa ăn, tổng hợp năng lượng và các chỉ số macro theo ngày.

- Ghi log cân nặng và cập nhật tiến độ theo mục tiêu.

-Việc xác định phạm vi này bảo đảm kiểm thử tập trung vào các chức năng
ảnh hưởng trực tiếp đến giá trị sử dụng của hệ thống.

### Thiết kế ca kiểm thử và dữ liệu kiểm thử 

-Ca kiểm thử được xây dựng theo nhóm tình huống:

- Trường hợp hợp lệ: dữ liệu đầy đủ, luồng xử lý đúng chuẩn nghiệp vụ.

- Trường hợp không hợp lệ: dữ liệu thiếu, sai định dạng, hoặc vi phạm
  ràng buộc.

- Trường hợp biên: mốc thời gian đầu/cuối kỳ, dữ liệu rỗng, giá trị cực
  trị.

- Trường hợp lỗi hệ thống: phụ thuộc ngoài bị gián đoạn hoặc truy vấn dữ
  liệu thất bại.

-Dữ liệu kiểm thử cần bao gồm cả dữ liệu tĩnh (bộ mẫu cố định) và dữ
liệu động theo từng giai đoạn kiểm thử để phản ánh sát bối cảnh vận
hành.

### Tiêu chí đánh giá kết quả kiểm thử 

-Kết quả kiểm thử được đánh giá trên các nhóm tiêu chí:

- Độ đúng chức năng: đầu ra phù hợp với yêu cầu nghiệp vụ và quy tắc đã
  định nghĩa.

- Độ ổn định: hệ thống xử lý nhất quán qua nhiều lần chạy cùng điều
  kiện.

- Khả năng xử lý lỗi: phản hồi rõ ràng, không làm hỏng trạng thái dữ
  liệu.

- Khả năng hồi quy: thay đổi chức năng mới không gây lỗi cho chức năng
  đã có.

-Các tiêu chí này tạo cơ sở định lượng cho quyết định chấp nhận phiên
bản triển khai.

### Công cụ và quy trình hỗ trợ kiểm thử 

Kiểm thử được hỗ trợ bởi bộ công cụ linting và testing trong hệ sinh
thái dự án, kết hợp với cơ chế chạy kiểm thử tự động theo từng đợt cập
nhật. Linting giúp phát hiện sớm lỗi cú pháp và quy ước mã nguồn;
unit/integration/e2e test giúp xác nhận hành vi nghiệp vụ trước khi tích
hợp. Việc chuẩn hóa môi trường chạy bằng cấu hình đồng nhất giúp tăng
tính tái lập của kết quả kiểm thử giữa các máy và các thành viên trong
nhóm.

##  

# PHÂN TÍCH THIẾT KẾ HỆ THÓNG

## Hiện trạng và giải pháp

### Hiện trạng phát sinh nhu cầu dùng phần mềm 

-Trong bối cảnh quản lý dinh dưỡng cá nhân, người dùng hiện đang vận
hành theo mô hình thủ công: tự đặt mục tiêu, tự tra cứu thông tin dinh
dưỡng, tự ghi chép bữa ăn và tự đối chiếu kết quả theo dõi cân nặng. Mô
hình này có sự tham gia của các đối tượng chính gồm Người dùng, nguồn
thông tin dinh dưỡng bên ngoài (website, mạng xã hội, ứng dụng rời rạc),
và công cụ ghi chú thủ công (sổ tay/ghi chú điện thoại).

-Quy trình hiện tại vẫn đáp ứng nhu cầu theo dõi cơ bản, nhưng chưa đảm
bảo tính hệ thống khi sử dụng lâu dài. Dữ liệu bị phân tán, thao tác
tổng hợp phụ thuộc nhiều vào người dùng, và việc đánh giá tiến độ thường
chậm so với thực tế.

![](media/image3.png){width="5.552083333333333in" height="4.84375in"}

-Từ hiện trạng trên, các tình huống bất lợi chính được xác định như sau:

- Dữ liệu ăn uống và cân nặng không tập trung, khó truy vết theo thời
  gian.

- Sai số cao trong ước lượng khẩu phần và tính toán calories/macro thủ
  công.

- Thiếu cơ chế mục tiêu theo giai đoạn, dẫn đến khó điều chỉnh kế hoạch
  khi thể trạng thay đổi.

- Khó duy trì thói quen cập nhật hằng ngày do thao tác nhập liệu tốn
  thời gian.

- Thiếu cảnh báo sớm khi tiến độ lệch mục tiêu.

-Những bất lợi này là nguyên nhân trực tiếp làm phát sinh nhu cầu ứng
dụng phần mềm trong quy trình theo dõi dinh dưỡng.

### Đề xuất giải pháp của đề tài

-Giải pháp của đề tài là xây dựng mô hình vận hành mới có ứng dụng
CalAIClone tham gia như một thành phần trung tâm. Trong mô hình này,
người dùng tương tác trực tiếp với ứng dụng để thực hiện các tác vụ
chính: cập nhật hồ sơ, ghi nhận bữa ăn, cập nhật cân nặng và theo dõi
tiến độ theo mục tiêu dinh dưỡng.

-Phần mềm hỗ trợ tự động hóa các bước xử lý mà trước đây người dùng làm
thủ công, bao gồm chuẩn hóa dữ liệu ghi nhận, tổng hợp chỉ số theo ngày
và phản hồi kết quả theo mục tiêu hiện hành. Nhờ đó, quy trình vận hành
chuyển từ "ghi chép rời rạc" sang "quản lý liên tục theo dữ liệu".

![](media/image4.png){width="4.305141076115485in"
height="3.6715212160979878in"}

-Lợi ích thực tiễn của mô hình mới:

- Tập trung dữ liệu hồ sơ, bữa ăn và cân nặng trên một hệ thống thống
  nhất.

- Rút ngắn thời gian ghi nhận và giảm sai sót do tính toán thủ công.

- Theo dõi tiến độ theo ngày và theo giai đoạn mục tiêu.

- Tăng khả năng truy vết lịch sử và đánh giá xu hướng cải thiện sức
  khỏe.

- Nâng cao tính duy trì sử dụng nhờ quy trình thao tác đơn giản, nhất
  quán

## Use Case & Functional Requirements

+----------------+-----------------------------------------------------+
| **Mục**        | **Nội dung chi tiết**                               |
+================+=====================================================+
| **1. Thông tin |                                                     |
| chung**        |                                                     |
+----------------+-----------------------------------------------------+
| Mã Usecase     | UC-5                                                |
+----------------+-----------------------------------------------------+
| Tên Usecase    | Thiết lập Kế hoạch Dinh dưỡng Ban đầu               |
+----------------+-----------------------------------------------------+
| Tác nhân       | Người dùng (Dieter)                                 |
| (Actors)       |                                                     |
+----------------+-----------------------------------------------------+
| Mô tả ngắn     | Người dùng nhập thông tin cơ thể và mục tiêu sức    |
|                | khỏe. Hệ thống tính toán BMR, TDEE và đề xuất kế    |
|                | hoạch dinh dưỡng cá nhân hóa. Người dùng xác nhận   |
|                | để bắt đầu sử dụng.                                 |
+----------------+-----------------------------------------------------+
| **2. Điều kiện | Người dùng đã đăng ký tài khoản và đăng nhập.       |
| tiên quyết**   |                                                     |
+----------------+-----------------------------------------------------+
| **3. Điều kiện | Kế hoạch dinh dưỡng và hồ sơ cá nhân được lưu. Nếu  |
| đảm bảo**      | có mục tiêu cân nặng, hiển thị thêm số ngày và ngày |
|                | dự kiến đạt mục tiêu.                               |
+----------------+-----------------------------------------------------+
| **4. Luồng sự  | 1\. Người dùng mở màn hình thiết lập ban đầu.       |
| kiện chính     |                                                     |
| (Basic Flow)** | 2\. Nhập thông tin: giới tính, chiều cao, cân nặng, |
|                | ngày sinh, số buổi tập, mục tiêu.                   |
|                |                                                     |
|                | 3\. Bấm \"Tính toán\".                              |
|                |                                                     |
|                | 4\. Hệ thống tính BMR → TDEE → điều chỉnh theo mục  |
|                | tiêu → phân chia macro.                             |
|                |                                                     |
|                | 5\. Hiển thị kết quả.                               |
|                |                                                     |
|                | 6\. Người dùng xác nhận.                            |
|                |                                                     |
|                | 7\. Hệ thống lưu và chuyển Dashboard.               |
+----------------+-----------------------------------------------------+
| **5. Luồng rẽ  | 5a. Input không hợp lệ → hiển thị lỗi, không cho    |
| nhánh / Ngoại  | tiếp tục.                                           |
| lệ**           |                                                     |
|                | 5b. Calo \< 1200 → hệ thống set về 1200.            |
|                |                                                     |
|                | 5c. Cân nặng mục tiêu = hiện tại → không hiển thị   |
|                | ngày dự kiến.                                       |
+----------------+-----------------------------------------------------+
| **6. Yêu cầu   | FR_5.1: Validate input hợp lệ.                      |
| chức năng      |                                                     |
| (FR)**         | FR_5.2: Tính BMR đúng công thức.                    |
|                |                                                     |
|                | FR_5.3: Tính TDEE theo mức vận động.                |
|                |                                                     |
|                | FR_5.4: Calo không \< 1200 khi giảm cân.            |
|                |                                                     |
|                | FR_5.5: Tính macro đúng.                            |
+----------------+-----------------------------------------------------+

  -----------------------------------------------------------------------
  **Mục**           **Nội dung chi tiết**
  ----------------- -----------------------------------------------------
  **1. Thông tin    
  chung**           

  Mã Usecase        UC-8

  Tên Usecase       Phân tích ảnh bữa ăn bằng AI

  Tác nhân (Actors) Người dùng (User/Dieter), Google Gemini AI, Image
                    Host

  Mô tả ngắn        Người dùng tải ảnh bữa ăn lên. Hệ thống sử dụng
                    Google Gemini AI để phân tích ảnh và trích xuất thông
                    tin dinh dưỡng. Nếu là thực phẩm, upload ảnh lên kho
                    lưu trữ online; nếu không phải thực phẩm hoặc có lỗi,
                    không lưu ảnh.

  **2. Điều kiện    Người dùng đã đăng nhập và đang ở màn hình Dashboard.
  tiên quyết**      

  **3. Điều kiện    Hệ thống trả về thông tin dinh dưỡng của bữa ăn và
  đảm bảo**         hiển thị trên màn hình xác nhận.

  **4. Luồng sự     1\. Người dùng bấm nút \"Take Photo & Analyze Meal\"
  kiện chính (Basic trên Dashboard.\
  Flow)**           2. Hệ thống mở công cụ để người dùng chọn hoặc chụp
                    ảnh bữa ăn.\
                    3. Hệ thống kiểm tra ảnh hợp lệ (định dạng
                    JPG/PNG/WebP, tối đa 10MB). Nếu không hợp lệ, yêu cầu
                    chọn lại.\
                    4. Hệ thống gửi ảnh lên Google Gemini AI để phân
                    tích.\
                    5. Google Gemini AI phân tích ảnh và trả về kết quả
                    (ảnh chứa thực phẩm).\
                    6. Hệ thống lưu ảnh lên kho lưu trữ online.\
                    7. Hệ thống hiển thị thông tin dinh dưỡng trên màn
                    hình xác nhận (ảnh, danh sách thực phẩm, calo,
                    protein, carbs, fats, health score).

  **5. Luồng rẽ     5a. Ảnh không hợp lệ (Tại bước 3): Ảnh \> 10MB hoặc
  nhánh / Ngoại lệ  định dạng không phải JPG/PNG/WebP. Hệ thống thông báo
  (Alternative      lỗi. Người dùng chọn ảnh khác.\
  Flows)**          5b. Ảnh không chứa thực phẩm (Tại bước 5): Google
                    Gemini AI phát hiện ảnh không chứa thực phẩm. Hệ
                    thống thông báo \"No food detected\" và yêu cầu chọn
                    ảnh khác.

  **6.Yêu cầu chức  FR_8.1: Hệ thống chỉ chấp nhận ảnh JPG, PNG, WebP,
  năng (FR) để Dò   tối đa 10MB.\
  vết**             FR_8.2: Hệ thống phải giao tiếp thành công với Google
                    Gemini AI và trả về được các trường dữ liệu: isFood,
                    foodItems, calories, protein, carbs, fats.\
                    FR_8.3: Chỉ lưu ảnh lên kho trữ nếu ảnh chứa thực
                    phẩm hợp lệ.\
                    FR_8.4: Nếu lưu ảnh thất bại, vẫn hiển thị thông tin
                    dinh dưỡng mà không báo lỗi.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Mục**           **Nội dung chi tiết**
  ----------------- -----------------------------------------------------
  **1. Thông tin    
  chung**           

  Mã Usecase        UC-9

  Tên Usecase       Lưu bữa ăn

  Tác nhân (Actors) Người dùng (User/Dieter), Hệ thống

  Mô tả ngắn        Sau khi xem lại thông tin dinh dưỡng từ UC-8, người
                    dùng xác nhận để lưu bữa ăn vào database. Hệ thống
                    kiểm tra dữ liệu, tính health score (nếu chưa có) và
                    lưu vào database.

  **2. Điều kiện    Người dùng đã hoàn thành UC-8 (phân tích ảnh). Dữ
  tiên quyết**      liệu bữa ăn hợp lệ.

  **3. Điều kiện    Bữa ăn được lưu thành công vào database với ngày hôm
  đảm bảo**         nay.

  **4. Luồng sự     1\. Người dùng bấm nút Confirm & Add Meal trên màn
  kiện chính (Basic hình xác nhận (từ UC-8).\
  Flow)**           2. Hệ thống kiểm tra dữ liệu bữa ăn: tên bữa ăn, danh
                    sách thực phẩm, calo, protein, carbs, fats (tất cả
                    \>= 0).\
                    3. Nếu dữ liệu hợp lệ, hệ thống tính health score dựa
                    trên cân bằng dinh dưỡng (nếu chưa có).\
                    4. Hệ thống lưu bữa ăn vào database với ngày hôm nay.

  **5. Luồng rẽ     5a. Dữ liệu không hợp lệ (Tại bước 2): Thiếu tên bữa
  nhánh / Ngoại lệ  ăn hoặc giá trị macro có giá trị âm. Hệ thống thông
  (Alternative      báo lỗi \"Invalid meal data\".\
  Flows)**          5b. Lưu vào database thất bại (Tại bước 4): Database
                    error hoặc network issue. Hệ thống thông báo \"Failed
                    to save meal\". Người dùng thử lại.

  **6. Yêu cầu chức FR_9: Hệ thống phải validate dữ liệu meal: tên
  năng (FR) để Dò   (string), calories/protein/carbs/fats \>= 0. Nếu
  vết**             không hợp lệ, hệ thống phải trả về thông báo lỗi và
                    không lưu vào database. Nếu hợp lệ, hệ thống lưu meal
                    vào database.\
                    FR_9.2: Hệ thống phải gán health score cho mỗi bữa ăn
                    (nếu UC-8 chưa cung cấp). Health score phải nằm trong
                    \[1-10\].
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Mục**           **Nội dung chi tiết**
  ----------------- -----------------------------------------------------
  **1. Thông tin    
  chung**           

  Mã Usecase        UC-10

  Tên Usecase       Xem tóm tắt hàng ngày

  Tác nhân (Actors) Người dùng (User/Dieter), Hệ thống

  Mô tả ngắn        Người dùng xem tóm tắt dinh dưỡng của ngày hôm nay
                    trên Bảng điều khiển (Dashboard), bao gồm cột trái
                    hiển thị mục tiêu và cột phải hiển thị lượng tiêu thụ
                    cùng lượng còn lại.

  **2. Điều kiện    Người dùng đã đăng nhập vào hệ thống. Người dùng đã
  tiên quyết**      thiết lập mục tiêu dinh dưỡng hàng ngày.

  **3. Điều kiện    Bảng điều khiển hiển thị tóm tắt dinh dưỡng chính xác
  đảm bảo**         cho ngày được chọn.

  **4. Luồng sự     1\. Người dùng mở ứng dụng, chuyển đến Dashboard.\
  kiện chính (Basic 2. Hệ thống nhận yêu cầu lấy tóm tắt cho ngày hôm nay
  Flow)**           (hoặc ngày được chỉ định).\
                    3. Hệ thống lấy danh sách tất cả bữa ăn được ghi
                    trong ngày.\
                    4. Hệ thống tính tổng calo, protein, carbohydrate,
                    chất béo từ các bữa ăn (lượng tiêu thụ).\
                    5. Hệ thống truy xuất mục tiêu dinh dưỡng hàng ngày
                    của người dùng.\
                    6. Hệ thống tính lượng dinh dưỡng còn lại (mục tiêu
                    trừ đi lượng tiêu thụ, tối thiểu là 0).\
                    7. Hệ thống trả về tóm tắt với thông tin: mục tiêu,
                    lượng tiêu thụ, lượng còn lại, số lượng bữa ăn.

  **5. Luồng rẽ     5a. Người dùng chưa thiết lập mục tiêu dinh dưỡng
  nhánh / Ngoại lệ  (Tại bước 5): Hệ thống không tìm thấy mục tiêu của
  (Alternative      người dùng cho ngày đó. Hệ thống hiển thị thông báo
  Flows)**          yêu cầu người dùng thiết lập mục tiêu.\
                    5b. Không có bữa ăn nào được ghi trong ngày (Tại bước
                    3): Danh sách bữa ăn trống. Hệ thống vẫn hiển thị tóm
                    tắt với lượng tiêu thụ là 0 cho tất cả chỉ số.

  **6. Yêu cầu chức Tất cả các FR dưới đây sẽ được dùng làm Cột 1 trong
  năng (FR) để Dò   Ma trận Dò vết:\
  vết**             \
                    FR_10.1: Hệ thống phải lấy được mục tiêu dinh dưỡng
                    (calo, protein, carbohydrate, chất béo) từ cơ sở dữ
                    liệu.\
                    FR_10.2: Hệ thống phải tính được tổng lượng dinh
                    dưỡng tiêu thụ từ tất cả bữa ăn trong ngày và tính
                    lượng còn lại (mục tiêu - tiêu thụ), không dưới 0.\
                    FR_10.3: Nếu người dùng chưa thiết lập mục tiêu dinh
                    dưỡng, hệ thống phải hiển thị thông báo yêu cầu thiết
                    lập mục tiêu và không hiển thị tóm tắt.
  -----------------------------------------------------------------------

+----------------+-----------------------------------------------------+
| **Mục**        | **Nội dung chi tiết**                               |
+================+=====================================================+
| **1. Thông tin |                                                     |
| chung**        |                                                     |
+----------------+-----------------------------------------------------+
| Mã Usecase     | UC-11                                               |
+----------------+-----------------------------------------------------+
| Tên Usecase    | Xem lịch sử bữa ăn                                  |
+----------------+-----------------------------------------------------+
| Tác nhân       | Người dùng (User/Dieter), Hệ thống                  |
| (Actors)       |                                                     |
+----------------+-----------------------------------------------------+
| Mô tả ngắn     | Người dùng xem lịch sử bữa ăn và tóm tắt dinh dưỡng |
|                | của một khoảng thời gian (từ ngày bắt đầu đến ngày  |
|                | kết thúc), giúp họ theo dõi tiến độ dinh dưỡng      |
|                | trong quá khứ và logic chuyển ngày.                 |
+----------------+-----------------------------------------------------+
| **2. Điều kiện | Người dùng đã đăng nhập vào hệ thống.               |
| tiên quyết**   |                                                     |
+----------------+-----------------------------------------------------+
| **3. Điều kiện | Hệ thống hiển thị danh sách lịch sử bữa ăn và tóm   |
| đảm bảo**      | tắt dinh dưỡng theo ngày trong khoảng thời gian     |
|                | được chọn, sắp xếp từ ngày mới nhất đến ngày cũ     |
|                | nhất.                                               |
+----------------+-----------------------------------------------------+
| **4. Luồng sự  | 1\. Người dùng chuyển đến tab Lịch sử.\             |
| kiện chính     | 2. Hệ thống hiển thị giao diện chọn khoảng thời     |
| (Basic Flow)** | gian (ngày bắt đầu và ngày kết thúc).\              |
|                | 3. Người dùng nhập ngày bắt đầu và ngày kết thúc    |
|                | (định dạng YYYY-MM-DD).\                            |
|                | 4. Hệ thống lấy danh sách tất cả bữa ăn trong       |
|                | khoảng thời gian được chỉ định.\                    |
|                | 5. Hệ thống nhóm bữa ăn theo ngày.\                 |
|                | 6. Hệ thống tính tóm tắt dinh dưỡng cho mỗi ngày    |
|                | (mục tiêu, tiêu thụ, còn lại).\                     |
|                | 7. Hệ thống sắp xếp tóm tắt từ ngày mới nhất đến    |
|                | ngày cũ nhất.\                                      |
|                | 8. Hệ thống hiển thị danh sách lịch sử với thông    |
|                | tin từng ngày: ngày tháng, mục tiêu, lượng tiêu     |
|                | thụ, lượng còn lại, danh sách bữa ăn.               |
+----------------+-----------------------------------------------------+
| **5. Luồng rẽ  | 5a. Không có bữa ăn nào trong khoảng thời gian (Tại |
| nhánh / Ngoại  | bước 4): Hệ thống không tìm thấy bữa ăn nào trong   |
| lệ             | khoảng thời gian. Hệ thống hiển thị thông báo       |
| (Alternative   | \"Không có dữ liệu\" hoặc danh sách trống.\         |
| Flows)**       | 5b. Khoảng thời gian vượt quá ngày người dùng tạo   |
|                | tài khoản (Tại bước 4): Người dùng chọn ngày bắt    |
|                | đầu trước khi tài khoản được tạo. Hệ thống tự động  |
|                | điều chỉnh ngày bắt đầu thành ngày người dùng tạo   |
|                | tài khoản.\                                         |
|                | 5c. Lỗi khi lấy dữ liệu: Hệ thống gặp lỗi khi truy  |
|                | xuất dữ liệu từ cơ sở dữ liệu. Hệ thống hiển thị    |
|                | thông báo lỗi và yêu cầu người dùng thử lại.        |
+----------------+-----------------------------------------------------+
| **6. Yêu cầu   | Tất cả các FR dưới đây sẽ được dùng làm Cột 1 trong |
| chức năng (FR) | Ma trận Dò vết:\                                    |
| để Dò vết**    | \                                                   |
|                | FR_11.1: Hệ thống phải chấp nhận đầu vào ngày bắt   |
|                | đầu và ngày kết thúc theo định dạng YYYY-MM-DD.\    |
|                | FR_11.2: Nếu ngày bắt đầu trước ngày tạo tài khoản, |
|                | hệ thống phải tự động điều chỉnh ngày bắt đầu thành |
|                | ngày tạo tài khoản.\                                |
|                | FR_11.3: Hệ thống phải lấy tất cả bữa ăn trong      |
|                | khoảng thời gian được chỉ định, nhóm theo ngày và   |
|                | tính tóm tắt dinh dưỡng (mục tiêu, tiêu thụ, còn    |
|                | lại) cho mỗi ngày.\                                 |
|                | FR_11.4: Hệ thống phải sắp xếp kết quả từ ngày mới  |
|                | nhất đến ngày cũ nhất.                              |
+----------------+-----------------------------------------------------+
| **Mục**        | **Nội dung chi tiết**                               |
+----------------+-----------------------------------------------------+
| **1. Thông tin |                                                     |
| chung**        |                                                     |
+----------------+-----------------------------------------------------+
| Mã Usecase     | UC-12                                               |
+----------------+-----------------------------------------------------+
| Tên Usecase    | Quản lý Hồ sơ Sức khỏe                              |
+----------------+-----------------------------------------------------+
| Tác nhân       | Người dùng (Dieter)                                 |
| (Actors)       |                                                     |
+----------------+-----------------------------------------------------+
| Mô tả ngắn     | Người dùng cập nhật thông tin cá nhân như cân nặng, |
|                | chiều cao, mục tiêu. Hệ thống lưu thay đổi nhưng    |
|                | không tự cập nhật kế hoạch dinh dưỡng.              |
+----------------+-----------------------------------------------------+
| **2. Điều kiện | Người dùng đã đăng nhập.                            |
| tiên quyết**   |                                                     |
+----------------+-----------------------------------------------------+
| **3. Điều kiện | Thông tin hồ sơ được cập nhật thành công, chỉ những |
| đảm bảo**      | trường thay đổi được lưu.                           |
+----------------+-----------------------------------------------------+
| **4. Luồng sự  | 1\. Người dùng vào màn hình Hồ sơ.                  |
| kiện chính     |                                                     |
| (Basic Flow)** | 2\. Chỉnh sửa thông tin.                            |
|                |                                                     |
|                | 3\. Bấm \"Lưu\".                                    |
|                |                                                     |
|                | 4\. Hệ thống validate.                              |
|                |                                                     |
|                | 5\. Lưu dữ liệu.                                    |
|                |                                                     |
|                | 6\. Hiển thị thông báo thành công.                  |
+----------------+-----------------------------------------------------+
| **5. Luồng rẽ  | 5a. Session hết hạn → yêu cầu login lại.            |
| nhánh / Ngoại  |                                                     |
| lệ**           | 5b. Không thay đổi gì → vẫn báo thành công.         |
|                |                                                     |
|                | 5c. Dữ liệu không hợp lệ → không cho lưu.           |
+----------------+-----------------------------------------------------+
| **6. Yêu cầu   | FR_12.1: Chỉ user đăng nhập được sửa hồ sơ.         |
| chức năng      |                                                     |
| (FR)**         | FR_12.2: Cho phép cập nhật từng phần.               |
|                |                                                     |
|                | FR_12.3: Validate mức độ hoạt động hợp lệ.          |
|                |                                                     |
|                | FR_12.4: Không tự update kế hoạch.                  |
+----------------+-----------------------------------------------------+

+----------------+-----------------------------------------------------+
| **Mục**        | **Nội dung chi tiết**                               |
+================+=====================================================+
| **1. Thông tin |                                                     |
| chung**        |                                                     |
+----------------+-----------------------------------------------------+
| Mã Usecase     | UC-13                                               |
+----------------+-----------------------------------------------------+
| Tên Usecase    | Tự chỉnh sửa Mục tiêu Dinh dưỡng                    |
+----------------+-----------------------------------------------------+
| Tác nhân       | Người dùng (Dieter)                                 |
| (Actors)       |                                                     |
+----------------+-----------------------------------------------------+
| Mô tả ngắn     | Người dùng tự nhập lại calo và macro theo ý muốn.   |
|                | Kế hoạch cũ kết thúc và kế hoạch mới bắt đầu ngay.  |
+----------------+-----------------------------------------------------+
| **2. Điều kiện | Người dùng đã đăng nhập và có kế hoạch hiện tại.    |
| tiên quyết**   |                                                     |
+----------------+-----------------------------------------------------+
| **3. Điều kiện | Kế hoạch cũ kết thúc, kế hoạch mới được tạo, lịch   |
| đảm bảo**      | sử được giữ.                                        |
+----------------+-----------------------------------------------------+
| **4. Luồng sự  | 1\. Người dùng vào màn hình mục tiêu.               |
| kiện chính     |                                                     |
| (Basic Flow)** | 2\. Nhập calo, protein, carbs, fats.3. Bấm \"Lưu\". |
|                |                                                     |
|                | 4\. Hệ thống validate.                              |
|                |                                                     |
|                | 5\. Đóng kế hoạch cũ.                               |
|                |                                                     |
|                | 6\. Tạo kế hoạch mới.                               |
|                |                                                     |
|                | 7\. Cập nhật Dashboard.                             |
+----------------+-----------------------------------------------------+
| **5. Luồng rẽ  | 5a. Session hết hạn → không lưu.                    |
| nhánh / Ngoại  |                                                     |
| lệ**           | 5b. Input ≤ 0 → báo lỗi.                            |
|                |                                                     |
|                | 5c. Không có plan cũ → vẫn tạo plan mới.            |
+----------------+-----------------------------------------------------+
| **6. Yêu cầu   | FR_13.1: Chỉ user hợp lệ được sửa.                  |
| chức năng      |                                                     |
| (FR)**         | FR_13.2: Macro phải \> 0.FR_13.3: Chỉ 1 kế hoạch    |
|                | active.                                             |
|                |                                                     |
|                | FR_13.4: Sau khi lưu dùng plan mới.                 |
|                |                                                     |
|                | FR_13.5: Lưu lịch sử.                               |
+----------------+-----------------------------------------------------+

+----------------+-----------------------------------------------------+
| **Mục**        | **Nội dung chi tiết**                               |
+================+=====================================================+
| **1. Thông tin |                                                     |
| chung**        |                                                     |
+----------------+-----------------------------------------------------+
| Mã Usecase     | UC-17                                               |
+----------------+-----------------------------------------------------+
| Tên Usecase    | Tính lại Gợi ý khi Đổi Mục tiêu                     |
+----------------+-----------------------------------------------------+
| Tác nhân       | Người dùng (Dieter)                                 |
| (Actors)       |                                                     |
+----------------+-----------------------------------------------------+
| Mô tả ngắn     | Hệ thống tính lại kế hoạch dinh dưỡng khi người     |
|                | dùng đổi mục tiêu. Người dùng xem trước và quyết    |
|                | định áp dụng.                                       |
+----------------+-----------------------------------------------------+
| **2. Điều kiện | Hồ sơ có đầy đủ thông tin.                          |
| tiên quyết**   |                                                     |
+----------------+-----------------------------------------------------+
| **3. Điều kiện | Nếu xác nhận: kế hoạch mới được áp dụng. Nếu hủy:   |
| đảm bảo**      | giữ nguyên kế hoạch cũ.                             |
+----------------+-----------------------------------------------------+
| **4. Luồng sự  | 1\. Người dùng chọn mục tiêu mới.                   |
| kiện chính     |                                                     |
| (Basic Flow)** | 2\. Hệ thống lấy dữ liệu hồ sơ.                     |
|                |                                                     |
|                | 3\. Tính lại kế hoạch.                              |
|                |                                                     |
|                | 4\. Hiển thị so sánh cũ vs mới.                     |
|                |                                                     |
|                | 5\. Người dùng xác nhận.                            |
|                |                                                     |
|                | 6\. Lưu kế hoạch mới.                               |
+----------------+-----------------------------------------------------+
| **5. Luồng rẽ  | 5a. Thiếu dữ liệu → yêu cầu cập nhật hồ sơ.         |
| nhánh / Ngoại  |                                                     |
| lệ**           | 5b. User hủy → không thay đổi.                      |
|                |                                                     |
|                | 5c. Kết quả giống nhau → vẫn hiển thị.              |
+----------------+-----------------------------------------------------+
| **6. Yêu cầu   | FR_17.1: Dùng dữ liệu hồ sơ hiện tại.               |
| chức năng      |                                                     |
| (FR)**         | FR_17.2: Công thức giống UC-5.                      |
|                |                                                     |
|                | FR_17.3: Điều chỉnh calo đúng mục tiêu.             |
|                |                                                     |
|                | FR_17.4: Không auto áp dụng.                        |
|                |                                                     |
|                | FR_17.5: Lưu lịch sử.                               |
+----------------+-----------------------------------------------------+

  -----------------------------------------------------------------------
  **Mục**           **Nội dung chi tiết**
  ----------------- -----------------------------------------------------
  **Mã Usecase &    **UC-14**: Theo dõi Xu hướng Cân nặng (Monitor Weight
  Tên**             Trends)

  **Tác nhân        Người dùng (User)
  (Actors)**        

  **Điều kiện tiên  Người dùng đã đăng nhập hệ thống và có lịch sử ghi
  quyết**           chép trọng lượng.

  **Điều kiện đảm   Chỉ số mới được lưu trữ. Hệ thống hiển thị biểu đồ xu
  bảo**             hướng đã được xử lý làm phẳng (loại bỏ nhiễu).

  **Luồng sự kiện   1\. Người dùng nhập thông tin cân nặng hiện tại trên
  chính**           giao diện máy trạm.\
                    2. Hệ thống xác nhận và ghi nhận dữ liệu vào bộ nhớ
                    tập trung.\
                    3. Hệ thống đối đối chiếu dữ liệu mới với các mốc
                    thời gian trong quá khứ.\
                    4. Hệ thống thực hiện lược bỏ các biến động bất
                    thường để xác định đường xu hướng thực tế.\
                    5. Hệ thống hiển thị kết quả phân tích dưới dạng biểu
                    đồ đường trực quan.

  **Luồng rẽ        **3a. Hồ sơ mới (Chưa có lịch sử):** Nếu đây là lần
  nhánh**           nhập đầu tiên, hệ thống lấy giá trị này làm điểm khởi
                    đầu (Baseline) cho các tính toán tương lai.

  **Yêu cầu chức    **FR_14.1**: Hệ thống chỉ chấp nhận dữ liệu cân nặng
  năng** *(FR để Dò hợp lệ trong khoảng $20kg \leq Input \leq 300kg$.\
  vết)*             **FR_14.2**: Hệ thống tính toán đường xu hướng theo
                    công thức đường trung bình di động (EMA) với chỉ số
                    alpha mặc định $\alpha = 0.1$.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Mục**         **Nội dung chi tiết**
  --------------- -------------------------------------------------------
  **Mã Usecase &  **UC-15**: Tự động Hiệu chỉnh Mục tiêu Dinh dưỡng
  Tên**           (Auto-Adjust Nutrition Plan)

  **Tác nhân      Hệ thống tự động, Người dùng (User)
  (Actors)**      

  **Điều kiện     Hệ thống có đủ dữ liệu về dinh dưỡng và trọng lượng của
  tiên quyết**    người dùng trong chu kỳ 14 ngày.

  **Điều kiện đảm Mục tiêu tiêu thụ Calo hàng ngày được điều chỉnh phù
  bảo**           hợp với tốc độ biến thiên trọng lượng thực tế.

  **Luồng sự kiện 1\. Hệ thống định kỳ tổng hợp dữ liệu dinh dưỡng nạp
  chính**         vào và thay đổi cân nặng trong chu kỳ thời gian.\
                  2. Hệ thống xác định mức tiêu thụ năng lượng trung bình
                  thực tế hàng ngày.\
                  3. Hệ thống tính toán độ chênh lệch giữa mục tiêu cũ và
                  kết quả đo lường thực tế.\
                  4. Hệ thống xác lập định mức năng lượng mới (Adaptive
                  TDEE) để tối ưu hóa lộ trình.\
                  5. Hệ thống ghi nhận và áp dụng định mức mới cho các
                  ngày tiếp theo.

  **Luồng rẽ      **1a. Thiếu dữ liệu mốc:** Nếu dữ liệu đầu vào không đủ
  nhánh**         số ngày quy định hoặc không có sự thay đổi về thời
                  gian, hệ thống ngừng tính toán và giữ nguyên định mức
                  cũ để đảm bảo an toàn hồ sơ.

  **Yêu cầu chức  **FR_15.1**: Hệ thống từ chối luồng tính toán TDEE nếu
  năng** *(FR để  phát hiện mảng dữ liệu dinh dưỡng bị khiếm khuyết
  Dò vết)*        (Array rỗng hoặc hiệu số ngày Days $\leq$ 0).\
                  **FR_15.2**: Áp dụng định lượng toán học theo công
                  thức Adaptive TDEE = Avg Intake - ((Weight Delta \*
                  7700) / Days) để hiệu chỉnh, đảm bảo giá trị sinh ra
                  phải lớn hơn 0 và xử lý đúng sai số.
  -----------------------------------------------------------------------

+--------------+-------------------------------------------------------+
| **Mục**      | **Nội dung chi tiết**                                 |
+==============+=======================================================+
| **Mã Usecase | **UC-16**: Tư vấn Dinh dưỡng Thông minh (Request      |
| & Tên**      | Nutritional Advice)                                   |
+--------------+-------------------------------------------------------+
| **Tác nhân   | Người dùng (User), Hệ thống Trí tuệ Nhân tạo          |
| (Actors)**   |                                                       |
+--------------+-------------------------------------------------------+
| **Điều kiện  | Thiết bị có kết nối mạng ổn định. Người dùng nhập nội |
| tiên quyết** | dung thắc mắc về dinh dưỡng.                          |
+--------------+-------------------------------------------------------+
| **Điều kiện  | Hệ thống cung cấp thông tin tư vấn dưới dạng văn bản  |
| đảm bảo**    | thuần túy. Hệ thống ngăn chặn các phản hồi vi phạm    |
|              | quy định về tư vấn y khoa.                            |
+--------------+-------------------------------------------------------+
| **Luồng sự   | 1\. Người dùng cung cấp câu hỏi tại khung tương tác.\ |
| kiện chính** | 2. Hệ thống tiếp nhận truy vấn và tổng hợp thông tin  |
|              | bối cảnh dinh dưỡng hiện tại của người dùng.\         |
|              | 3. Hệ thống gửi thông tin đến thành phần xử lý trí    |
|              | tuệ nhân tạo đính kèm bộ quy tắc bảo mật.\            |
|              | 4. Hệ thống nhận kết quả phản hồi thô từ trí tuệ nhân |
|              | tạo.\                                                 |
|              | 5. Hệ thống xử lý loại bỏ các ký hiệu định dạng thừa  |
|              | để chuẩn hóa văn bản hiển thị.\                       |
|              | 6. Hệ thống hiển thị câu trả lời tới người dùng.      |
+--------------+-------------------------------------------------------+
| **Luồng rẽ   | **3a. Nội dung vi phạm quy định y tế:** Nếu câu hỏi   |
| nhánh**      | thuộc phạm vi tư vấn y khoa lâm sàng, hệ thống từ     |
|              | chối trả lời và hiển thị thông báo miễn trừ trách     |
|              | nhiệm.\                                               |
|              | **4a. Gián đoạn kết nối:** Nếu quá trình truyền nhận  |
|              | dữ liệu thất bại, hệ thống thông báo lỗi dịch vụ.     |
+--------------+-------------------------------------------------------+
| **Yêu cầu    | - **FR_16.1**: Backend phải nhúng khối lệnh bảo mật   |
| chức         |   (Medical Guardrail) vào System Prompt để yêu cầu    |
| năng** *(FR  |   LLM tự động từ chối trả lời nếu người dùng hỏi về y |
| để Dò vết)*  |   tế lâm sàng.                                        |
|              |                                                       |
|              | - **FR_16.2**: Hệ thống lọc chuỗi Markdown (Regex     |
|              |   Sanitize) có trách nhiệm thay thế sạch các ký tự    |
|              |   Markup (\*, \_, \~, -, #, \`\`\`\`) qua 6 lớp Regex |
|              |   nối tiếp nhau trước khi trả lời Client.             |
+--------------+-------------------------------------------------------+

  -----------------------------------------------------------------------
  **Mục**           **Nội dung chi tiết**
  ----------------- -----------------------------------------------------
  **Mã Usecase &    **UC-18**: Dự báo Điểm chững cân (Plateau Prediction)
  Tên**             

  **Tác nhân        Hệ thống, Người dùng (User)
  (Actors)**        

  **Điều kiện tiên  Người dùng có lịch sử ghi chép trọng lượng tối thiểu
  quyết**           14 ngày.

  **Điều kiện đảm   Trạng thái bão hòa trọng lượng được xác định chính
  bảo**             xác và hiển thị cảnh báo nếu cần thiết.

  **Luồng sự kiện   1\. Hệ thống định kỳ truy xuất năng lượng tiêu thụ
  chính**           Calo và TDEE của người dùng.\
                    2. Hệ thống tính toán độ thâm hụt năng lượng
                    (Deficit) bằng hiệu số giữa TDEE và Calo nạp vào.\
                    3. Hệ thống đối chiếu độ thâm hụt với ngưỡng giới hạn
                    sinh lý quy định (Threshold).\
                    4. Nếu độ thâm hụt quá nhỏ (thiếu thâm hụt để giảm
                    cân), hệ thống ghi nhận trạng thái chững cân.\
                    5. Hệ thống hiển thị trạng thái cảnh báo \"Chững
                    cân\" trên giao diện dashboard.

  **Luồng rẽ        **1a. Thiếu dữ liệu đánh giá:** Nếu người dùng thiếu
  nhánh**           dữ liệu để nội suy mức tiêu hao TDEE, hệ thống mặc
                    định bỏ qua đánh giá chững cân.

  **Yêu cầu chức    **FR_18.1**: Phân hệ dữ liệu phải cung cấp đầy đủ
  năng** *(FR để Dò thông tin về lượng Calo nạp (Intake) và chỉ số năng
  vết)*             lượng tiêu hao (TDEE).\
                    **FR_18.2**: Hệ thống trả về trạng thái cảnh báo
                    chững cân (True) nếu độ xói mòn thâm hụt Deficit =
                    TDEE - Intake \<= 100 kcal.
  -----------------------------------------------------------------------

## Class Diagrams 

![](media/image5.png){width="6.75in" height="4.417361111111111in"}

## Sequence Diagram

![](media/image6.png "https://img.plantuml.biz/plantuml/png/ZLRVYzj647xVlsBmGpbJctCV0iNGaBDrxLslbuJOBYrD7zRIMbeixJhIAhahVGdtS8Gyj4S9eHo5Sqq8QNCq8OLIwo5GNU__q7_IsPKLI-Uwr0z6FxwP-MQ-cLdTY1GDLHpuH77bCnXqcwrhRUXxF9k_LU1dy_C9xE4rU3ARJsqFB2uyS2vVPSbKk8H4OoucDAG1HEnUp8JDzbaKKPTj-TmLuBEHAc525asaY0fCX_domLOOoWUWmfYLW04zM61w_1i67tpO8eJQIePGk-dgu3znSD8_XNjNR0mY5cvQd2aMrcj08x08Eb7SvXCg5DHkYQ6aeSE52uDT0nZihaDqfL2Xz7qM6k2jxZfWZuNtkSroLA-AqeIYCc3G8mvLT4WZ1ZLhSONCRuSy2kY2T0SpZ9KKSJ1a8I4MDAyZKMX3ruiFi-H8mCK92Y4WICy4UEbBr45LT1hI7FCy9cZOH7iBpNUuCLPUbZo6aGm349w1Ao_z7MkYUFxo23L0YL7KPUYRLv58saL_fnnKUYwy1jZ887aOWqqbtgG_2n3P_0_XDkuAuQPdXn1n3Okov0I6SPOyGKljSrF5I5Gq8CYIPpQwJd-9wyJmlevbnzYVPCavNqjI9whlD0jGCfqAWbQ5xPxEEK0iNI3GT3R1CYN7O6V9SmfEblm6FiAEOwoxh-0hQ_a4nddKfTNN1F2d8nIbwUUGOJgL6l6K5sLTEDNuTIeOV0CECMUaWtgziyNSE6728KKsFRJzSeahvOkbpv97UMMTwb2YLM7RpmsAoYU_mbAMCkwBT6gRcZv6E6ho8h_x4UuZCP5VwsapBjQfkHguity7DkoYWRtq3GNxSWh3R3uJTVJcCObTOnJsJD1zFXhvN3Hx2ZvbCbprsBUsjs43QJn18t5nXF--JdnckaHNogCINNzaOgTFjOZ7EUDAAcNF5zylcbXN56DqgI_1S2jrPzxwyrbWshmDpMkj5dmBob30fDhmVlx4YG-nyzANRVZhTQjUZdFRqmCoHEwmJ-rGcXKW5UCu1rqQ3gC6V4nLLB71jdnToEwPlUVonPnFLPbVBdin0NqSancCpNQuX-BCC9PEgm7_5X6drLGexmr7XnphpOAe_D5gk3efJqEblKjHAmEwRXp6vVD5o_CG3j3ucOBtGAHpbJUd6H5HNemTn0HGAxsjkAgjRfE3DT1Yt0QwufzTlefrr_m04RPgPDfoZFVVCIp6bRCd7wm6_E-bc8zMfHElxC21qTxgQ16Hd8HDFVku70nljOQPRgGHzrcTe6MpI6Mdm5wSf3Cz9_5gffNgLnQ9vdNA_xDnAdJtZEwuiUTsrQlzzmlOm1AynPAaRweKozgkf5xnOjZWw2yE08mpvR3LxUz-lbrrkLVjfoBpGMayTgG-H9LkCaAgQxryecACCoo8sL3bzdrt97kwLAVvSQJFPej6dlb48EG6hd7zOVKF"){width="7.178977471566054in"
height="10.03125in"}

![](media/image7.png){width="6.75in" height="6.959722222222222in"}

![](media/image8.png){width="6.75in" height="6.392361111111111in"}

![](media/image9.png){width="6.75in" height="5.08125in"}

![](media/image10.png){width="6.75in" height="5.104861111111111in"}

![](media/image11.png "https://img.plantuml.biz/plantuml/png/XLLDInj16BxlhtZ9gG6rjQVYeQW9g6YB9H5QgeTrCsO7TsVIsTbOUoiUFFHGf4WfKZ0LAOfIImkbMOg74V_7_fE-ixl9pXXjSmZPsUVzUjxdcKn7qXKo3WD7KXaGMAcDJpwSWcTnsZzY4AW_C9yc7o2wxa4ZJKuysFJJv3rnd6YJieuht10YyYecp2DFI1IvRJ8Jq3P6aWrfO0I9Efn50ymi2VZMZ11y2wI8YG4CtTS5fa7V49XyzC1nN4zo0PMdxUkBDFbCeQL-i_OgkxSI4N6_Jeaaebe1DuAwWqaazMZ7PH8gou9lK3tJGlPsPS5-hSEZ6cTIy20W8iVKRi4qYEXIZ-I0XjDofRlkHWGgzU8Nzh8iQ1IwHHkps7CiEOl3TI8SfmxZZx4wJ47DZxVJP8V1rLxQlsGGgaC6lZfZVacpfth0VFM5EHYY0siO-4ATnk2b_QynIDmC1UchdwmDac9y4Uau21q4F5Sz3q5fyjs3Za_LgQvvjOCXp4_xvntiC93mSZb_XKUNKd_ty3TF-xyyyFph2zUEMNC0Fxh8O1wZBGi90QQYENmXWzVDwNszo0D46_FRtH7M6exJmD2bj7-yRGxDB360JzDabsbki2n6w8gp6DTKP-6G88md7AGwfAXYhWLUiB1OvDLWv4oN6iJaCsEkyK4h1TXJFw2L9jyWqANZVDP63jCBQEQmTTNZo4RoaOwGDqypClIItkKGNNKtEzXZxPlicGatxsuufyvik3ag5HIiZDDaduv16xiuG3sfS-QFuTRnyItkrENuW284XcfWxR5L5cRsx-9wClacd_0KyF0OTOOYYYsy-QBgcBpKIyxAdarQcW8tSwk-3J8ixcx1se8m7DZqtUsi_NtJGyZ7dPFRCtOdkXDL8zyiaXz2PUdw0frPvgwOvfrBatFBiLxcaKpgqdBjeXuBLohSV25wdYFjfcJt7oqYdclhP9ReQMtw74slJZhLGk0cwOLsoioZjXxHxj3MXjRlM4Q67uFjycQmheIRnguPL9JRYwo_6iFFSxv5P9XfjwiEkN4BPXENrsbsZqbyBDImDhJgu8x0qp8-ppdgec72gprrP6_GbFSyrrSQ5ZgMbggjEN62Grokf-Vudwhp9UJoCgASQUnG_st_1G00"){width="6.502841207349081in"
height="9.678880139982502in"}

![](media/image12.png "https://img.plantuml.biz/plantuml/png/XLN1RjD04BtxAqOv828b8WWX8Gw8rW5QbLQLqY8GvR3PBFQgzZhihYdbsaCFN40SE5H82LM5W5Qq0WdX73XioN_uJvYruyPk2kIGHEitCs_UcntVLff87OU1exaE6AoxpQlNReAR9aTz43x-Q5XAar_WHsaof3uifwC32fgRpx7Zg4qk-aII41Hx5ZD1sJ9JYdXiBk2UW80zrIMCPAeV2LLWvbaGRSr96Ms1bZ4h0KFoOeBfy9SChjveEGwXEf9GM_76n-deFOUU-Icy3N5vNJ5vfSsPPh9U0wAWxM0IpIdl4w6XjaQanpHqcDPSU0hM5pFK-c8LPjCeDn9QHa70P8vnBy1qc7pEASi17QT7DEaInQ3Mdln3JgkIgv1CwCmZzrX78WwxJ3fE6vgti3gWndwydOvs19o-GO45X6OWm3U7mWVN37Xs_4DN1CUu9eQtCNg1Px7QJqUl89nYmCS7k_W0xUB8nIL1r81L6Md6HGDS8hkg0NU9LlKocHK_SzpZPeXkJ7Bk_I_1D7u-JGv2gDqV7yTbDZKduumW5q7tqj4Hhv3DYY36FSCyD4EQTNL2eUyZoEfpkYEyV1hxg6QWuV5g_WYFVcdxFHJPXFwWGFtnCQd6F740FxP8GVUHBKxJv6DSHK9WPSlXKwtFdFBjyEqXkkHLbHqJlKexIzQc42KbeCqHmh6pVLjcj3lH5hjCatrkZ_Pi1UoarTWGrEgmJAYCODCttx62-H3M9zstqz5N2ApHSV5qcXUQPHingb2ccoOdY6pDoh6Mv-YQOMHJlEDdScGrpkjHcRqCtu3jgQ8LASk2TAhAq_AIsImlcR2yP33CrfstFCrXQ3jz2seynFZHHmAYiX4c0hdP46Yy2tO-WgnG4PUtZ_cQ1QUbl7rgla5lgcpUTIU7kUTKogVCHXHf_pLZ5nD1Xx9veZFw5cFMIvCluc_Hbt5NjwxNSuNBxImKYFFIb9GyVMs-OO6AwkSsX-Vpt4FCOmRR6LOZ6PFGUgLUTcKp6-rTdSrBVt-gkeZ7qOpX_rasU2LmeF6UUvR2aD-4ENTjyS6TAfMbcQIMqJu4k9To3eMP2v6zmjZhWNRAhbNUV5XfW7UMMj_BoxSy2MNCXhW4WHc4az9jelnkH6GFGIowQF7THlFio_SF"){width="6.153439413823272in"
height="8.334405074365705in"}

![](media/image13.png){width="6.75in" height="3.7083333333333335in"}

![](media/image14.png){width="6.75in" height="4.114583333333333in"}

![](media/image15.png){width="6.75in" height="3.9791666666666665in"}

![](media/image16.png "https://img.plantuml.biz/plantuml/png/bLPDQznM5DthLrnc4MQeJUAsq995YQqniHax1COcBfqktcXUf4Uafudqv6IwAdYHHJOrRUcYb7ew61EtfWakb8meNiZuVwY_fFS-IUEdyRYbtjX8vtwTU-wH7yIAHIe9V4i9vNFOjPTNFhaFEzbOWChEf0STBndbqmi9qlNoz3Mq1JuSNBtDqx5qBIj-9kIGHIo0c3zFk7JuDezZvl9LNxWIVFvK6PY8nyDGnXLcZVlXYzKe2b-0YX9k00FsiiHqnLSSLZwzPrdCKM44ZKSk5Vz9m21xBzsUREx6FBhR5bpngDK05aFRmYHAE6B8f8B64ovSJy4TM9NC7-7p67OtDN1tSn5oAtHZEvGg2dsVHnhuPCkk8-sGEPwGxXpEjczBsENHld1ucQsxE9i9ikSmNKTmgSHJuPYehhrf3PXYVHPpQBJBlv2Knv680rRoiORa9IgKIT3daMN9K748zta4xILy2VTXZIZzqO4L-Flhx-2X9q1w-VHCWfFzWflFftzA5mA42Cjgm_9do1n6FIBCi8RniZy2a6naeDRowN403KhgvzEnQ5WMFiUtI2g-VfYdP-9c7N3owGdgv-fjObc4r05T3DZ30F2pl_IxHGqI3D5wi2qiFe9-Ffr8SBrw7LTNe46FbONevLa9-nOKDF7X1HKzRytgu0g0BeQEvMK2dgOI0yrIpVNjrLPF3lBq7KEfPwSbiyMe-zbHBL95vJek3xDpY_9VjxPtIuL5iy_nWwfmHJR6z7J72g_vdGCVWF7CQA9LP-JocsmoMqQtV47hsmYp8mbASwZNLArzBnixbOfmZicCVhrzwf68rWBIA0LzaQS72OBpz5kpxtyJx8TQi7iyWA574UXPZeUdhguDx5dTm4m1R-Vfpn3G05xs6q8V6pcQCxTebNgrQTxFizD4QpEfLSJD_Wu-3l0A6RArMktkJ7ycKddwLvw-eGtcwGd3nan7m_Xv_VhODyR4f7npwIiVOsnsD5eePLs_pN2i65VXBGn4N_0LVD71iyMdnFo9EGeiGuQByQx64fdsTH5AywK5-6CNEj2qsAWRjY01FJamvoyY3Pti5BNxsJWiRnuPEWrgZ5ACePh6HZOPNPzpWQT6ooijM-t9eZfk_PMM-o7MCLTnUKYyJvo6nUNWFsZlOpiuu87yVwJV3AlgQ6JX6hvk0vkpcH_Ibr3pWOBieU6JtgZvOphn7qHP6pywvXflf4Ji6mVZs4Ylu7jHDuAvy3BUTBATzlfwvH5utHTryvfrJ9EXVOLqSekBpVohw6ukBPxPW0sLsEVwLQlUIeSS8S2QZ2mNapCiIJUBTZKTarDwUESzgSd2MP8HDTSS-annbhJmz4bRzGuwM5N1ymG_2MJqvt0NEfK4ZIprHjhOC4dd764OchwdGQUas9kiVdIlsf6sv5fnGncNXyLmHAjMVq-Q5wey7bA6N_5lOqdLlHbJc996YvzdUAbELdtA9UJETDs1CMSrHwimjDczHbJJl77pkeqhtQ34KhVokkxjncTcgT1LLVCEMS04-zDsCBTMyzlx02-M_clz1m00"){width="6.805259186351706in"
height="9.737689195100613in"}![](media/image17.png){width="6.75in"
height="3.9375in"}

# THIẾT KẾ HỆ THỐNG

## Ma trận Dò vết (Traceability Matrix)

**UC-05 -- Thiết lập Kế hoạch Dinh dưỡng Ban đầu**

  ----------------------------------------------------------------------------------
  **Mã Yêu cầu       **Lớp Xử lý / Thiết kế (Functions)**             **Mã Kiểm thử
  (Requirements)**                                                    (Test Cases)**
  ------------------ ------------------------------------------------ --------------
  FR_5.1: Validate   CalculateRecommendationsDto (class-validator)    TC_BB_5.1.1
  input (height,                                                      TC_BB_5.1.10
  weight, workouts,                                                   
  gender, goal)                                                       

  FR_5.2: Tính BMR   OnboardingService.calculateBMR()                 TC_BB_5.2.1
  (Mifflin-St Jeor)                                                   TC_BB_5.2.3,
                                                                      TC_WB_5.2.1

  FR_5.3: Map        OnboardingService.mapWorkoutsToActivityLevel()   TC_BB_5.3.1
  activity level                                                      TC_BB_5.3.5

  FR_5.4: Áp sàn     OnboardingService.adjustCaloriesForGoal()        TC_BB_5.4.1
  1200 calo                                                           TC_BB_5.4.2
                                                                      TC_WB_5.4.1
                                                                      TC_WB_5.4.3

  FR_5.5: Tính macro OnboardingService.calculateMacros()              TC_BB_5.5.1
                                                                      TC_BB_5.5.3

  FR_5.6: Tính       OnboardingService.calculateRecommendations()     TC_BB_5.6.1
  timeline                                                            TC_BB_5.6.4

  FR_5.7: Lưu        OnboardingController.approveRecommendations()    TC_BB_5.7.1
  profile + target                                                    

  FR_5.8: Validate   ApproveRecommendationsDto                        TC_BB_5.8.1
  macro tối thiểu                                                     TC_BB_5.8.4
  ----------------------------------------------------------------------------------

**UC-8: Phân tích ảnh bữa ăn bằng AI**

+------------------+--------------------------------------+-----------+
| **Mã Yêu cầu     | **Lớp Xử lý / Thiết kế (Functions)** | **Mã Kiểm |
| (Requirements)** |                                      | thử (Test |
|                  |                                      | Cases)**  |
+==================+======================================+===========+
| **FR_8.1:** Hệ   | Mea                                  | TC_       |
| thống chỉ chấp   | lsController.analyzeMeal(file) (điểm | BB_8.1.1\ |
| nhận ảnh JPG,    | kiểm tra đầu vào)                    | TC_       |
| PNG, WebP, tối   |                                      | BB_8.1.2\ |
| đa 10MB.         |                                      | TC_       |
|                  |                                      | BB_8.1.3\ |
|                  |                                      | TC        |
|                  |                                      | _BB_8.1.4 |
+------------------+--------------------------------------+-----------+
| **FR_8.2:** Hệ   | AiS                                  | TC_       |
| thống phải giao  | ervice.analyzeMealImage(imageBuffer, | BB_8.2.1\ |
| tiếp thành công  | mimeType)                            | TC_       |
| với Google       |                                      | BB_8.2.2\ |
| Gemini AI và trả |                                      | TC        |
| về được các      |                                      | _BB_8.2.3 |
| trường dữ liệu:  |                                      |           |
| isFood,          |                                      | TC        |
| foodItems,       |                                      | _BB_8.2.4 |
| calories,        |                                      |           |
| protein, carbs,  |                                      | TC        |
| fats.            |                                      | _BB_8.2.5 |
|                  |                                      |           |
|                  |                                      | TC        |
|                  |                                      | _BB_8.2.8 |
|                  |                                      |           |
|                  |                                      | TC        |
|                  |                                      | _BB_8.2.7 |
|                  |                                      |           |
|                  |                                      | TC        |
|                  |                                      | _BB_8.2.8 |
+------------------+--------------------------------------+-----------+
| **FR_8.3:** Chỉ  | Mea                                  | TC_       |
| lưu ảnh lên kho  | lsController.analyzeMeal() (nhánh if | BB_8.3.1\ |
| trữ nếu ảnh chứa | (analysis.isFood))                   | TC        |
| thực phẩm hợp    | + I                                  | _BB_8.3.2 |
| lệ.              | mageService.uploadImage(imageBuffer, |           |
|                  | filename)                            |           |
+------------------+--------------------------------------+-----------+
| **FR_8.4:** Nếu  | MealsControl                         | TC        |
| lưu ảnh thất     | ler.analyzeMeal() (try/catch upload, | _BB_8.4.1 |
| bại, vẫn hiển    | continue without imageUrl)           |           |
| thị thông tin    |                                      |           |
| dinh dưỡng mà    |                                      |           |
| không báo lỗi.   |                                      |           |
+------------------+--------------------------------------+-----------+

**UC-9: Record Food Intake**

+-------------------------+---------------------------+---------------+
| **Mã Yêu cầu            | **Lớp Xử lý / Thiết kế    | **Mã Kiểm thử |
| (Requirements)**        | (Functions)**             | (Test         |
|                         |                           | Cases)**      |
+=========================+===========================+===============+
| **FR_9.1:** Hệ thống    | CreateMealDto,            | TC_BB_9.1.1,  |
| phải validate dữ liệu   | MealsController.logMeal,  | TC_BB_9.1.2,  |
| meal: tên (string),     | MealsService.create       | TC_BB_9.1.3,  |
| calo                    |                           | TC_BB_9.1.4,  |
| ries/protein/carbs/fats |                           | TC_BB_9.1.5,  |
| \>= 0. Nếu không hợp    |                           | TC_BB_9.1.6,  |
| lệ, hệ thống phải trả   |                           | TC_BB_9.1.7   |
| về thông báo lỗi và     |                           |               |
| không lưu vào database. |                           |               |
| Nếu hợp lệ, hệ thống    |                           |               |
| lưu meal vào database.  |                           |               |
+-------------------------+---------------------------+---------------+
| **FR_9.2:** Hệ thống    | MealsSer                  | TC_BB_9.2.1,  |
| phải gán health score   | vice.calculateHealthScore | TC_BB_9.2.2,  |
| cho mỗi bữa ăn (nếu     |                           |               |
| UC-8 chưa cung cấp).    |                           | TC_BB_9.2.3,  |
| Health score phải nằm   |                           | TC_BB_9.2.4,  |
| trong \[1-10\].         |                           | TC_BB_9.2.5,  |
|                         |                           | TC_BB_9.2.6,  |
|                         |                           | TC_BB_9.2.3,  |
|                         |                           | TC_WB_9.2.1,  |
|                         |                           | TC_WB_9.2.2,  |
|                         |                           | TC_WB_9.2.3,  |
|                         |                           | TC_WB_9.2.4,  |
|                         |                           | TC_WB_9.2.5   |
+-------------------------+---------------------------+---------------+

**UC-10: View Daily Summary**

+------------------------+---------------------------+----------------+
| Mã Yêu cầu             | Lớp Xử lý / Thiết kế      | Mã Kiểm thử    |
| (Requirements)         | (Functions)               | (Test Cases)   |
+========================+===========================+================+
| FR_10.1: Hệ thống phải | TargetPeriodsService.     | TC_BB_10.1.1   |
| lấy được mục tiêu dinh | getTargetsForDate(userId, |                |
| dưỡng (calo, protein,  | date)                     | TC_BB_10.1.2   |
| carbs, fats) từ cơ sở  |                           |                |
| dữ liệu.               |                           |                |
+------------------------+---------------------------+----------------+
| FR_10.2: Hệ thống phải | MealsServic               | TC_BB_10.2.1,  |
| tính tổng lượng tiêu   | e.getDailySummary(userId, | TC_BB_10.2.2,  |
| thụ từ tất cả bữa ăn   | date)                     | TC_BB_10.2.3   |
| trong ngày và tính     |                           |                |
| lượng còn lại (mục     |                           |                |
| tiêu - tiêu thụ),      |                           |                |
| không dưới 0.          |                           |                |
+------------------------+---------------------------+----------------+
| FR_10.3: Nếu người     | TargetPeriodsService.     | TC_BB_10.4.1   |
| dùng chưa thiết lập    | getTargetsForDate(userId, |                |
| mục tiêu dinh dưỡng,   | date)                     |                |
| hệ thống phải yêu cầu  |                           |                |
| thiết lập mục tiêu và  |                           |                |
| không hiển thị tóm     |                           |                |
| tắt.                   |                           |                |
+------------------------+---------------------------+----------------+

**UC-11: View Meal History**

+------------------------+---------------------------+----------------+
| **Mã Yêu cầu           | **Lớp Xử lý / Thiết kế    | **Mã Kiểm thử  |
| (Requirements)**       | (Functions)**             | (Test Cases)** |
+========================+===========================+================+
| FR_11.1: Hệ thống phải | MealsCo                   | TC_BB_11.1.1,  |
| chấp nhận đầu vào ngày | ntroller.getHistory(user, | TC_BB_11.1.2   |
| bắt đầu và ngày kết    | startDate, endDate)       |                |
| thúc theo định dạng    |                           |                |
| YYYY-MM-DD.            |                           |                |
+------------------------+---------------------------+----------------+
| FR_11.2: Nếu ngày bắt  | MealsS                    | TC_BB_11.2.1   |
| đầu trước ngày tạo tài | ervice.getHistory(userId, |                |
| khoản, hệ thống phải   | startDate, endDate)       |                |
| tự động điều chỉnh     |                           |                |
| ngày bắt đầu thành     |                           |                |
| ngày tạo tài khoản.    |                           |                |
+------------------------+---------------------------+----------------+
| FR_11.3: Hệ thống phải | MealsS                    | TC_BB_11.3.1,  |
| lấy tất cả bữa ăn      | ervice.getHistory(userId, | TC_BB_11.3.2,  |
| trong khoảng thời gian | startDate, endDate)       | TC_BB_11.3.3,  |
| được chỉ định, nhóm    |                           |                |
| theo ngày và tính tóm  |                           | TC_BB_11.3.4,  |
| tắt dinh dưỡng (mục    |                           |                |
| tiêu, tiêu thụ, còn    |                           | TC_BB_11.3.5,  |
| lại) cho mỗi ngày.     |                           |                |
+------------------------+---------------------------+----------------+
| FR_11.4: Hệ thống phải | MealsS                    | TC_BB_11.4.1   |
| sắp xếp kết quả từ     | ervice.getHistory(userId, |                |
| ngày mới nhất đến ngày | startDate, endDate)       |                |
| cũ nhất.               |                           |                |
+------------------------+---------------------------+----------------+

**UC-12: Quản lý Hồ sơ Sức khỏe**

  ------------------------------------------------------------------------------
  **Mã Yêu cầu             **Lớp Xử lý / Thiết kế             **Mã Kiểm thử
  (Requirements)**         (Functions)**                      (Test Cases)**
  ------------------------ ---------------------------------- ------------------
  FR_12.1: Require         JwtAuthGuard +                     TC_BB_12.1.1
  authentication           UsersController.updateProfile()    

  FR_12.2: Partial update  UsersService.updateUserProfile()   TC_BB_12.2.1
                                                              TC_BB_12.2.2
                                                              TC_WB_12.2.1

  FR_12.3: activityLevel   UserProfileDto                     TC_BB_12.3.1
  enum                                                        TC_BB_12.3.2

  FR_12.4: goal enum       UserProfileDto                     TC_BB_12.4.1
                                                              TC_BB_12.4.2

  FR_12.5: Không tạo       UsersService.updateUserProfile()   TC_BB_12.5.1
  TargetPeriod                                                

  FR_12.6: Data phản ánh   UsersController.getCurrentUser()   TC_BB_12.6.1
  ngay                                                        
  ------------------------------------------------------------------------------

**UC-13: Tự chỉnh sửa Mục tiêu Dinh dưỡng**

  --------------------------------------------------------------------------------
  **Mã Yêu cầu         **Lớp Xử lý / Thiết kế (Functions)**       **Mã Kiểm thử
  (Requirements)**                                                (Test Cases)**
  -------------------- ------------------------------------------ ----------------
  FR_13.1: Require     JwtAuthGuard +                             TC_BB_13.1.1
  authentication       UsersController.updateTargets()            

  FR_13.2: Validate    MacroTargetsDto                            TC_BB_13.2.1
  macro inputs                                                    TC_BB_13.2.8

  FR_13.3: Chỉ 1 plan  UsersService.updateUserTargets()           TC_BB_13.3.1
  active                                                          TC_BB_13.3.2
                                                                  TC_WB_13.3.1
                                                                  TC_WB_13.3.2

  FR_13.4: Query today TargetPeriodsService.getTargetsForDate()   TC_BB_13.4.1
  returns new plan                                                

  FR_13.5: Lưu lịch sử TargetPeriodsService.getTargetsForDate()   TC_BB_13.5.1
  plan                                                            

  FR_13.6: Atomic      UsersService.updateUserTargets()           TC_BB_13.6.1
  update (close +                                                 TC_WB_13.6.1
  create)                                                         
  --------------------------------------------------------------------------------

**UC-14: Theo dõi Xu hướng Cân nặng**

  -----------------------------------------------------------------------------------
  Mã Yêu    Thiết kế / Hàm xử lý API           Mã Test Case                  Nguyên
  cầu (FR)                                                                   lý Test
  --------- ---------------------------------- ----------------------------- --------
  FR_14.1   WeightLogsController.createLog()   TC_BB_14.1.1 - TC_BB_14.1.3   Phân
                                                                             tích Giá
                                                                             trị Biên
                                                                             (BVA)

  FR_14.2   ScientificService.calculateEMA()   TC_WB_14.2.1 - TC_WB_14.2.2   Độ phức
                                                                             tạp
                                                                             luồng
                                                                             McCabe
                                                                             (V(G))
  -----------------------------------------------------------------------------------

**UC-15: Tự động Hiệu chỉnh Mục tiêu Dinh dưỡng**

  ---------------------------------------------------------------------------------------------------
  **Mã Yêu  **Thiết kế / Hàm xử lý API**                     **Mã Test Case**              **Nguyên
  cầu                                                                                      lý Test**
  (FR)**                                                                                   
  --------- ------------------------------------------------ ----------------------------- ----------
  FR_15.1   Interface truy vấn                               TC_BB_15.1.1 - TC_BB_15.1.3   Phân hoạch
            DB NutritionRepository.fetchCycle()                                            tương
                                                                                           đương (EP)

  FR_15.2   Hàm xử lý                                        TC_WB_15.2.1 - TC_WB_15.2.3   Độ phức
            TDEE ScientificService.calculateAdaptiveTDEE()                                 tạp luồng
                                                                                           McCabe
                                                                                           (V(G))
  ---------------------------------------------------------------------------------------------------

  ----------------------------------------------------------------------------------------------------
  **Mã Yêu cầu  **Thiết kế / Hàm xử lý API**                 **Mã Test Case**              **Nguyên lý
  (FR)**                                                                                   Test**
  ------------- -------------------------------------------- ----------------------------- -----------
  **FR_16.1**   Setup                                        TC_BB_16.1.1 - TC_BB_16.1.3   Bảng Quyết
                Prompt AiService.generateMeatCoachAdvice()                                 định
                                                                                           (Decision
                                                                                           Table)

  **FR_16.2**   Chuỗi Parse Text AiService.stripMarkdown()   TC_WB_16.2.1 - TC_WB_16.2.2   Phân tích
                                                                                           Rẽ nhánh
                                                                                           McCabe
                                                                                           (V(G))
  ----------------------------------------------------------------------------------------------------

**UC-17:Tính lại khi đổi mục tiêu**

+--------------+----------------------------------------+-------------+
| **Mã Yêu cầu | **Lớp Xử lý / Thiết kế (Functions)**   | **Mã Kiểm   |
| (Req         |                                        | thử (Test   |
| uirements)** |                                        | Cases)**    |
+==============+========================================+=============+
| FR_17.1:     | Onboardin                              | T           |
| Dùng profile | gController.calculateRecommendations() | C_BB_17.1.1 |
| hiện có      |                                        |             |
+--------------+----------------------------------------+-------------+
| FR_17.2:     | Onboar                                 | TC          |
| Dùng lại     | dingService.calculateRecommendations() | _BB_17.2.1, |
| pipeline     |                                        | T           |
| UC-05        |                                        | C_WB_17.2.1 |
|              |                                        | T           |
|              |                                        | C_WB_17.2.2 |
+--------------+----------------------------------------+-------------+
| FR_17.3:     | Onb                                    | T           |
| Điều chỉnh   | oardingService.adjustCaloriesForGoal() | C_BB_17.3.1 |
| theo goal    |                                        |             |
|              |                                        | T           |
|              |                                        | C_BB_17.3.3 |
+--------------+----------------------------------------+-------------+
| FR_17.4:     | calculate vs approve endpoints         | T           |
| Calculate ≠  |                                        | C_BB_17.4.1 |
| Save         |                                        |             |
+--------------+----------------------------------------+-------------+
| FR_17.5:     | approveRecommendations()               | T           |
| Update đồng  |                                        | C_BB_17.5.1 |
| thời         |                                        | T           |
|              |                                        | C_WB_17.5.1 |
+--------------+----------------------------------------+-------------+
| FR_17.6: Giữ | Ta                                     | T           |
| lịch sử      | rgetPeriodsService.getTargetsForDate() | C_BB_17.6.1 |
+--------------+----------------------------------------+-------------+

**UC-18: Dự báo Điểm chững cân**

  -----------------------------------------------------------------------------------------------
  **Mã Yêu  **Thiết kế / Hàm xử lý API**            **Mã Test Case**              **Nguyên lý
  cầu                                                                             Test**
  (FR)**                                                                          
  --------- --------------------------------------- ----------------------------- ---------------
  FR_18.1   Giao thức Tiền xử                       TC_BB_18.1.1 - TC_BB_18.1.2   Phân hoạch
            lý ScientificService.checkPlateau()                                   tương đương
                                                                                  (Equivalence
                                                                                  Partitioning)

  FR_18.2   Toán tử So                              TC_WB_18.2.1 - TC_WB_18.2.3   Độ phức tạp
            sánh ScientificService.checkPlateau()                                 nhánh McCabe
                                                                                  (V(G))
  -----------------------------------------------------------------------------------------------

## Thực hiện Verification (Rà soát thiết kế - Inspection)

**UC-5: Establish Nutrition Plan (TDEE & Onboarding)**

  --------------------------------------------------------------------------------
  **Tiêu chí rà soát**                    **Có trong    **Có trong  **Kết
                                          Yêu           Thiết       quả(Action**
                                          cầu(SRS)?**   kế(DS)?**   
  --------------------------------------- ------------- ----------- --------------
  Gửi thông tin cơ thể (cân nặng, chiều   Có            Có          OK
  cao, giới tính, tuổi, mức vận động) để                            
  tính TDEE                                                         

  Tính BMR theo công thức Mifflin-St      Có            Có          OK
  Jeor, có phân biệt giới tính                                      

  Áp dụng hệ số vận động để tính TDEE     Có            Có          OK

  Điều chỉnh calo theo mục tiêu (giảm,    Có            Có          OK
  tăng, giữ)                                                        

  Không đề xuất mức calo dưới 1200        Có            Có          OK
  kcal/ngày                                                         

  Chặn dữ liệu đầu vào ngoài giới hạn     Có            Có          OK
  sinh học                                                          

  Hiển thị khuyến nghị macro sau khi tính Có            Có          OK

  Tính ngày dự kiến đạt mục tiêu          Có            Có          OK
  --------------------------------------------------------------------------------

**UC-8: Phân tích ảnh bữa ăn bằng AI**

  ----------------------------------------------------------------------------
  **Tiêu chí Rà soát**                    **Có trong  **Có trong  **Kết quả
                                          Yêu cầu     Thiết kế    (Action)**
                                          (SRS)?**    (DS)?**     
  --------------------------------------- ----------- ----------- ------------
  Gửi ảnh bữa ăn lên hệ thống để phân     Có          Có          OK
  tích AI                                                         

  Trả về đầy đủ trường isFood, foodItems, Có          Có          OK
  calories, protein, carbs, fats                                  

  Chỉ upload ảnh khi isFood = true        Có          Có          OK

  Upload ảnh lỗi nhưng vẫn tiếp tục trả   Có          Có          OK
  kết quả dinh dưỡng                                              

  Chặn ảnh sai định dạng hoặc vượt quá    Có          Có          OK
  10MB                                                            

  Trường hợp isFood = false hiển thị      Có          Có          OK
  thông báo No food detected cho người                            
  dùng                                                            

  Hiển thị màn hình xác nhận gồm ảnh (nếu Có          Có          OK
  có), danh sách món, calories, protein,                          
  carbs, fats, health score                                       
  ----------------------------------------------------------------------------

**UC-9: Record Food Intake**

  --------------------------------------------------------------------------
  **Tiêu chí Rà soát**               **Có trong    **Có trong   **Kết quả
                                     Yêu cầu       Thiết kế     (Action)**
                                     (SRS)?**      (DS)?**      
  ---------------------------------- ------------- ------------ ------------
  Nhận dữ liệu meal từ màn hình xác  Có            Có           OK
  nhận và gửi xuống backend để lưu                              

  Validate dữ liệu meal gồm name,    Có            Có           OK
  calories, protein, carbs, fats                                

  Chặn giá trị calories, protein,    Có            Có           OK
  carbs, fats âm                                                

  Nếu dữ liệu không hợp lệ thì không Có            Có           OK
  thực hiện lưu vào database                                    

  Tự tính health score khi UC-8 chưa Có            Có           OK
  cung cấp                                                      

  Ràng buộc health score trong       Có            Có           OK
  khoảng 1 đến 10                                               

  Lưu meal vào database khi dữ liệu  Có            Có           OK
  hợp lệ                                                        

  Sau khi lưu thành công, trả về     Có            Có           OK
  daily summary mới để cập nhật                                 
  dashboard                                                     

  Trả lỗi khi lưu thất bại           Có            Có           OK
  (database/network issue)                                      
  --------------------------------------------------------------------------

**UC-10: View Daily Summary**

  ---------------------------------------------------------------------------
  **Tiêu chí Rà soát**                   **Có trong  **Có trong  **Kết quả
                                         Yêu cầu     Thiết kế    (Action)**
                                         (SRS)?**    (DS)?**     
  -------------------------------------- ----------- ----------- ------------
  Nhận yêu cầu xem tóm tắt theo ngày     Có          Có          OK
  hiện tại hoặc ngày được chọn                                   

  Lấy danh sách bữa ăn trong ngày của    Có          Có          OK
  người dùng                                                     

  Tính tổng tiêu thụ calories, protein,  Có          Có          OK
  carbs, fats từ tất cả bữa ăn trong                             
  ngày                                                           

  Lấy mục tiêu dinh dưỡng theo ngày của  Có          Có          OK
  người dùng                                                     

  Tính lượng còn lại = mục tiêu - tiêu   Có          Có          OK
  thụ và không nhỏ hơn 0                                         

  Trả về đầy đủ dữ liệu summary gồm      Có          Có          OK
  date, targets, consumed, remaining,                            
  meals                                                          

  Trường hợp không có bữa ăn trong ngày  Có          Có          OK
  vẫn trả summary với consumed = 0                               

  Trường hợp người dùng chưa có mục tiêu Có          Có          OK
  dinh dưỡng thì yêu cầu thiết lập trước                         
  khi xem summary                                                
  ---------------------------------------------------------------------------

**UC-11: View Meal History**

  ----------------------------------------------------------------------------
  **Tiêu chí Rà soát**                    **Có trong  **Có trong  **Kết quả
                                          Yêu cầu     Thiết kế    (Action)**
                                          (SRS)?**    (DS)?**     
  --------------------------------------- ----------- ----------- ------------
  Nhận đầu vào startDate và endDate theo  Có          Có          OK
  định dạng yyyy-mm-dd                                            

  Lấy lịch sử bữa ăn trong khoảng thời    Có          Có          OK
  gian đã chọn                                                    

  Nếu startDate trước ngày tạo tài khoản  Có          Có          OK
  thì tự điều chỉnh về ngày tạo tài khoản                         

  Nhóm dữ liệu bữa ăn theo từng ngày      Có          Có          OK

  Tính tóm tắt dinh dưỡng theo ngày gồm   Có          Có          OK
  targets, consumed, remaining                                    

  Tính remaining không nhỏ hơn 0          Có          Có          OK

  Sắp xếp kết quả theo ngày giảm dần từ   Có          Có          OK
  mới nhất đến cũ nhất                                            

  Trường hợp không có dữ liệu trong       Có          Có          OK
  khoảng thời gian thì trả danh sách                              
  trống và hiển thị không có dữ liệu                              

  Trường hợp lỗi truy xuất dữ liệu thì    Có          Có          OK
  trả lỗi và yêu cầu người dùng thử lại                           
  ----------------------------------------------------------------------------

**UC-12: Manage Health Profile**

  ---------------------------------------------------------------------------
  **Tiêu chí rà soát**                    **Có trong **Có trong  **Kết quả
                                          Yêu cầu    Thiết kế    (Action)**
                                          (SRS)?**   (DS)?**     
  --------------------------------------- ---------- ----------- ------------
  Cho phép cập nhật một phần thông tin cá Có         Có          OK
  nhân                                                           

  Validate dữ liệu trước khi lưu          Có         Có          OK

  Lưu thay đổi và truy vấn lại từ         Có         Có          OK
  database                                                       

  Hiển thị thông tin hiện tại khi mở      Có         Có          OK
  profile                                                        

  Không yêu cầu nhập lại toàn bộ khi chỉ  Có         Có          OK
  sửa một trường                                                 
  ---------------------------------------------------------------------------

**UC-13: Update Target Plan**

  ---------------------------------------------------------------------------
  **Tiêu chí rà soát**                    **Có trong **Có trong  **Kết quả
                                          Yêu cầu    Thiết kế    (Action)**
                                          (SRS)?**   (DS)?**     
  --------------------------------------- ---------- ----------- ------------
  Cho phép nhập mục tiêu calo và macro    Có         Có          OK
  thủ công                                                       

  Validate giá trị trong ngưỡng an toàn   Có         Có          OK

  Đóng TargetPeriod cũ và tạo mới khi cập Có         Có          OK
  nhật                                                           

  Lưu lịch sử thay đổi mục tiêu           Có         Có          OK

  Hiển thị mục tiêu mới sau khi lưu       Có         Có          OK
  ---------------------------------------------------------------------------

**UC 14: Theo dõi Xu hướng Cân nặng**

  -------------------------------------------------------------------------------------
  **Tiêu chí rà soát**  **Có trong  **Có trong Thiết kế (DS)?**  **Kết quả (Action)**
                        Yêu cầu                                  
                        (SRS)?**                                 
  --------------------- ----------- ---------------------------- ----------------------
  **Xác thực đầu vào    Có. BA yêu  Không hoàn toàn. Entity DB   **\[FAIL\]** Yêu cầu
  (Data                 cầu chặn    có quy định nhưng tầng ranh  Lập trình viên bổ sung
  Validation):** Kiểm   rác do user giới API (Boundary) chưa áp  Class-validator tại
  soát tính hợp lý của  nhập sai    dụng @Min(20), @Max(300).    DTO để chặn Request
  trọng lượng nhập vào  hoặc spam                                xấu sớm nhất có thể.
  (20kg đến 300kg).     API.                                     

  **Định danh chủ thể   Có. Thuộc   Có. profileId được truy xuất **\[PASS\]** Code tuân
  (Access               nhóm yêu    ngầm và xác thực gắt gao qua thủ kiến trúc phân
  Control):** Đảm bảo   cầu bảo mật JWT Strategy thay vì lấy     quyền bảo mật BA đề
  tính riêng tư, không  phi chức    trực tiếp từ Body.           ra.
  ai xem được chiều     năng NFR.                                
  hướng cân nặng của                                             
  người khác (Lỗ hổng                                            
  IDOR).                                                         

  **Gắn mốc Thời gian   Có. Thiếu   Có. WeightLog entity tự động **\[PASS\]** Logic lưu
  (Timestamp            ngày giờ    kích hoạt                    trữ Data độc lập và
  Binding):** File lưu  thì việc vẽ triggers @CreatedAt của      chống được tấn công
  lịch sử bắt buộc phải biểu đồ xu  Database mà không dựa vào    thao túng thời gian từ
  được đóng dấu thời    hướng vô    Client gởi.                  App.
  gian (thứ tự).        nghĩa.                                   

  **Khử nhiễu dữ liệu   Có. Nghiệp  Có. ScientificService được   **\[PASS\]** Thực thi
  (Data                 vụ hệ thống viết riêng một thuật toán    Code tuân thủ 100%
  Smoothing):** Áp dụng (Business   lặp EMA thuần toán học, tách công thức định hướng
  công thức Đường trung Rule) yêu   biệt khỏi Controller.        của PO.
  bình Động hàm mũ (EMA cầu loại bỏ                              
  0.1).                 độ trồi sụt                              
                        của bữa ăn                               
                        trong ngày.                              

  **Xử lý Biên khuyết   Có. BA yêu  Có. Khối if (previousTrend   **\[PASS\]** Mapping
  dữ liệu (Empty Edge   cầu lấy mốc == null) trực tiếp xuất kết  hoàn chỉnh giữa sơ đồ
  Case):** Ứng xử ra    đo đầu làm  quả trị số nguyên thủy.      Use Case Exception
  sao khi User lần đầu  Base Trend                               Flow với Code.
  gõ vào chưa có        chuẩn.                                   
  History?                                                       
  -------------------------------------------------------------------------------------

**UC 15: Tự động Hiệu chỉnh Mục tiêu Dinh dưỡng**

  --------------------------------------------------------------------------------------
  **Tiêu chí rà       **Có trong   **Có trong Thiết kế (DS)?**    **Kết quả (Action)**
  soát**              Yêu cầu                                     
                      (SRS)?**                                    
  ------------------- ------------ ------------------------------ ----------------------
  **Bộ đếm thời gian  Có. Nhiệm vụ Có. Lịch trình kích hoạt tự    **\[PASS\]** Kiến trúc
  tự động (CRON       đặc tính phi động quét chu kỳ ngày.         hệ thống đảm bảo TDEE
  Worker):** Cơ chế   chức năng                                   tự động cập nhật trơn
  định kỳ quét điều   yêu cầu giảm                                tru không nghẽn luồng.
  chỉnh thông số định thao tác tay                                
  mức Calo cho user.  cho người                                   
                      dùng.                                       

  **Thẩm định phương  Có. Logic    Có. Tầng                       **\[PASS\]** Mapping
  trình TDEE (Formula cốt lõi      Logic ScientificService được   độ chính xác của Code
  Fidelity):** TDEE   (Core        mã hóa phương trình độ trễ     Base đối với bài toán
  thích ứng mới phải  Business)    Zero.                          sinh lý là Hoàn Hảo.
  bù trừ lượng Calo   được chuyên                                 
  sai lệch qua hiệu   gia BA thẩm                                 
  số 7700 Kcal/kg.    định.                                       

  **Luồng lưu trữ đè  Có. Flow yêu Có. Hàm xử lý móc nối          **\[PASS\]** Kết nối
  (Overwrite          cầu phải     với ProfileRepository để Save  Model liền mạch. Logic
  State):** Cập nhật  hiển thị     lại thuộc tính nền tảng Base.  đồng bộ trơn tru chuẩn
  TDEE mới phải đè    TDEE mới                                    MVC.
  lên ngưỡng TDEE     ngay tức thì                                
  nền, thay đổi trực  lên                                         
  tiếp Target hàng    Dashboard.                                  
  ngày.                                                           
  --------------------------------------------------------------------------------------

**UC-16: Tư vấn Dinh dưỡng Thông minh**

  -----------------------------------------------------------------------------------
  **Tiêu chí rà soát**   **Có trong Yêu **Có trong Thiết kế (DS)?** **Kết quả
                         cầu (SRS)?**                               (Action)**
  ---------------------- -------------- --------------------------- -----------------
  Giới hạn Lọc Nội dung  Có. Thỏa mãn   Có. Đính cấu trúc lệnh chặn \[PASS\] Phương
  (Medical               rào cản tính   (Instruction) trực tiếp vào pháp \"Phòng ngự
  Guardrail): Yêu cầu hệ hợp chuẩn      khuôn mẫu Guardrail Promt   từ xa\" tận dụng
  thống thiết lập lá     ngành Y tế và  của truy vấn lên LLM.       sức mạnh trí tuệ
  chắn từ chối tư vấn y  Đạo đức LLM.                               của AI để lọc từ
  tế/kê thuốc trái phép.                                            cực kỳ kiến trúc.

  Sanitize Vệ sinh       Có. Giao diện  Có. Luồng xử lý Pipeline    \[PASS\] Kịch bản
  Markdown (Regex        Điện thoại     gọi cấu trúc 6 hệ cụm       Code khớp luồng
  Filter): Bóc tách các  thiết kế UI    hàm .replace() regex liên   chuẩn hóa thiết
  thẻ nhúng của văn bản  chỉ hiển thị   tiếp nhau.                  kế đầu cuối.
  AI để nhả ra Raw-text  văn bản trơn                               
  cho app di động.       (Plaintext).                               

  Quản trị tính toàn vẹn Có. Yêu cầu    Không. Đoạn mã Regex đang   \[PASS\] 
  mảng bám               văn bản AI     lạm dụng cờ lệnh tham lam   
  (Over-matching): Đảm   không bị làm   (Greedy                     
  bảo Regex không nuốt   hỏng ý nghĩa   Flag) /\[\*\_\~\]+/g quét   
  chửng cấu trúc từ ghép truyền thông   tàn sát toàn chữ trong      
  của AI (Ví dụ: bóp lỗi tin.           chuỗi.                      
  cấu trúc ngữ pháp có                                              
  gạch ngang -).                                                    
  -----------------------------------------------------------------------------------

**UC-17: Recalculate Recommendations**

  --------------------------------------------------------------------------
  **Tiêu chí rà soát**                   **Có trong  **Có trong **Kết quả
                                         Yêu cầu     Thiết kế   (Action)**
                                         (SRS)?**    (DS)?**    
  -------------------------------------- ----------- ---------- ------------
  Tính lại TDEE và macro khi thay đổi    Có          Có         OK
  thông tin                                                     

  Hiển thị kết quả trên modal trước khi  Có          Có         OK
  xác nhận                                                      

  Không lưu khi chưa xác nhận            Có          Có         OK

  Tái sử dụng logic từ UC-5              Có          Có         OK

  Cập nhật TargetPeriod sau khi xác nhận Có          Có         OK
  --------------------------------------------------------------------------

**UC-18: Dự báo Điểm chững cân**

  -----------------------------------------------------------------------------------------
  **Tiêu chí rà soát**          **Có trong **Có trong Thiết kế (DS)?** **Kết quả (Action)**
                                Yêu cầu                                
                                (SRS)?**                               
  ----------------------------- ---------- --------------------------- --------------------
  **Toán tử Khủng hoảng         Có. Phục   Có. Khối                    **\[PASS\]** Bộ
  (Plateau Algorithm):** Đo     vụ nhánh   lệnh calculateDeficit làm   xương sống Logic
  lường nguy cơ chững cân nếu   Use Case   nhiệm vụ móc trực tiếp số   Code Mapping tuyệt
  Thâm hụt sinh lý nằm trong    Cảnh báo Y Toán hạng TDEE - Intake.    đối 1:1 với phương
  vùng nhỏ hẹp                  tế.                                    trình Sức khỏe do BA
  ($Deficit \leq Threshold$).                                          đề ra.

  **Van khóa Data Rỗng (Null    Có. Thỏa   Có. Code gác cổng có cài    **\[PASS\]** Thiết
  Guardian):** Cấm cảnh báo     mãn Flow   if-block ngắt hàm từ xa thả kế luồng Control
  Plateau ảo (False Positive)   xử lý Dữ   văng Exception khi Intake   Flow bao phủ được rẽ
  nếu hôm đó User lười chưa     liệu       bằng 0.                     nhánh trống của quy
  nhập món ăn nào.              rác/thụt                               trình nghiệp vụ.
                                lùi của                                
                                đầu vào                                
                                SRS.                                   

  **Độ Tùy biến Tham số         Có. BA     Không. Nhà phát triển viết  **\[FAIL\]** Buộc
  (Threshold                    kiến trúc  mã cẩu thả \"Hardcode\"     Lập trình viên thiết
  Configurability):** Dung sai  tham số    chết số 100 ẩn sâu bên      lập hằng số ra Model
  dung hòa chuẩn (Ví            này tùy    trong Scope hàm phân chia   cấu hình chung hoặc
  dụ: $100$ Kcal) là biến động  chỉnh cá   nhánh.                      lấy từ Profile người
  theo thể cơ béo gầy.          nhân ở                                 dùng, không trộn lẫn
                                Model DS.                              Logic.

  **Giao thức Trả Về (UX Push   Có. Thuộc  Có. Định dạng gói JSON      **\[PASS\]** Mối
  Rule):** Cờ chững             chuỗi giao Boolean rẽ nhánh đẩy xuống  liên kết giao thức
  cân $True/False$ trả về phải  tiếp phân  Client minh bạch hóa        API với UI tuân thủ
  tương thích với trạng thái    rã API từ  Endpoint.                   cấu hình BA. Code
  Alert Red Box dưới App.       BA.                                    đạt chuẩn phân lớp.
  -----------------------------------------------------------------------------------------

# HIỆN THỰC & KIỂM THỬ

## Thiết kế Kịch bản Kiểm thử

### UC-5: Establish Nutrition Plan

Kiểm thử cho FR_05.3 -- Nhập chiều cao người dùng

- **Mục tiêu kiểm thử**: Xác minh hệ thống từ chối chiều cao ngoài phạm
  vi và ghi nhận đúng giá trị hợp lệ, đảm bảo đầu vào cho công thức
  Mifflin-St Jeor là an toàn.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_05.3.

- **Phương pháp áp dụng:** Kiểm thử Hộp đen -- Phân tích giá trị biên
  Chiều cao hợp lệ trong khoảng từ **100 cm đến 250 cm**.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ 5 mốc: 99 (Dưới Min),
  100 (Min), 170 (Nominal), 250 (Max), 251 (Vượt Max).

  -------------------------------------------------------------------------
  **Mã TC**      **Tên Test   **Dữ liệu   **Kết quả mong đợi    **Trạng
                 Case (Kịch   đầu vào     (Expected Result)**   thái**
                 bản kiểm     (Input)**                         
                 thử)**                                         
  -------------- ------------ ----------- --------------------- -----------
  TC_BB_05.3.1   Giá trị nhỏ  99 cm       Hệ thống từ chối lưu. PASS
                 hơn min                  Hiển thị thông báo    
                                          "Chiều cao tối thiểu  
                                          100 cm"               

  TC_BB_05.3.2   Giá trị bằng 100 cm      Lưu height = 100. Cho PASS
                 min                      phép tiếp tục         
                                          onboarding            

  TC_BB_05.3.3   Giá trị hợp  170 cm      Lưu height = 170. Cho PASS
                 lệ                       phép tiếp tục         
                                          onboarding            

  TC_BB_05.3.4   Giá trị bằng 250 cm      Lưu height = 250. Cho PASS
                 max                      phép tiếp tục         
                                          onboarding            

  TC_BB_05.3.5   Giá trị lớn  251 cm      Hệ thống từ chối lưu. PASS
                 hơn max                  Hiển thị thông báo    
                                          "Chiều cao tối đa 250 
                                          cm"                   
  -------------------------------------------------------------------------

**Kiểm thử cho Yêu cầu FR_05.4:** Tính toán chỉ số BMR theo giới tính

- **Mục tiêu kiểm thử:** Xác minh hàm tính BMR áp dụng đúng công thức
  Mifflin--St Jeor cho từng nhánh giới tính, bao gồm cả trường hợp
  *other* (trung bình hai giới).

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_05.4.

- **Phương pháp áp dụng:** Kiểm thử hộp trắng -- Bao phủ nhánh theo
  nguyên lý McCabe.

- **Kiểm soát biến số:** Cố định đầu vào:

<!-- -->

- Tuổi (A) = 30

<!-- -->

- Cân nặng (W) = 70 kg

<!-- -->

- Chiều cao (H) = 170 cm

- **Mục đích:** cô lập biến *gender* để đánh giá tính đúng đắn của từng
  nhánh trong hàm calculateBMR().

**Công thức chuẩn (Mifflin--St Jeor)**

- Nam:\
  BMR_male = 10 × W + 6.25 × H − 5 × A + 5

- Nữ:\
  BMR_female = 10 × W + 6.25 × H − 5 × A − 161

- Khác:\
  BMR_other = (BMR_male + BMR_female) / 2

Chú thích:

- BMR (Basal Metabolic Rate): Chỉ số chuyển hóa cơ bản (kcal/ngày)

- W (Weight): Cân nặng (kg)

- H (Height): Chiều cao (cm)

- A (Age): Tuổi (năm)

- BMR_male: BMR tính theo công thức cho nam

- BMR_female: BMR tính theo công thức cho nữ

- BMR_other: BMR cho giới tính khác, được tính bằng trung bình của nam
  và nữ

  -----------------------------------------------------------------------------
  **Mã TC**      **Luồng bao **Input Variables** **Measurable         **Trạng
                 phủ                             Expected Return**    thái**
                 (Path)**                                             
  -------------- ----------- ------------------- -------------------- ---------
  TC_WB_05.4.1   Nhánh 1:    W=70, H=170, A=30,  10×70 + 6.25×170 −   PASS
                 gender =    gender=\'male\'     5×30 + 5 = **1617.5  
                 male                            kcal**               

  TC_WB_05.4.2   Nhánh 2:    W=70, H=170, A=30,  10×70 + 6.25×170 −   PASS
                 gender =    gender=\'female\'   5×30 − 161 =         
                 female                          **1451.5 kcal**      

  TC_WB_05.4.3   Nhánh 3:    W=70, H=170, A=30,  (1617.5 + 1451.5) /  PASS
                 gender =    gender=\'other\'    2 = **1534.5 kcal**  
                 other                                                
  -----------------------------------------------------------------------------

Kiểm thử cho Yêu cầu FR_05.5: Nhân hệ số vận động (PAL) để tính TDEE

- **Mục tiêu kiểm thử:** Xác minh hàm ánh xạ workoutsPerWeek →
  activityLevel → PAL multiplier thực thi đúng trên toàn bộ 3 nhánh khả
  dụng trong luồng Onboarding ban đầu.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_05.5.

- **Phương pháp áp dụng:** Kiểm thử hộp trắng -- Bao phủ nhánh theo
  nguyên lý McCabe.

- **Kiểm soát biến số:** Cố định: BMR = 1617.5 kcal (từ TC_WB_05.4.1)

- **Ghi chú kỹ thuật:** Trong luồng Onboarding
  (onboarding.service.ts:42--46), hệ thống chỉ hỗ trợ 3 mức PAL:

<!-- -->

- 0--2 workouts → sedentary (PAL = 1.2)

<!-- -->

- 3--5 workouts → light (PAL = 1.375)

- ≥6 workouts → moderate (PAL = 1.55)

- Công thức TDEE**:** TDEE=BMR×PAL

### UC-8: Phân tích ảnh bữa ăn bằng AI

Kiểm thử cho FR_8.1: Kiểm tra ảnh hợp lệ

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống xử lý đúng
  các giá trị ảnh hợp lệ (định dạng JPG, PNG, WebP) và dung lượng ≤
  10MB, đồng thời từ chối các ảnh không đáp ứng tiêu chuẩn ở cả tầng
  Frontend và tầng Backend.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_8.1 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân hoạch tương đương
  (Quy định: định dạng JPG, PNG, WebP và dung lượng ≤ 10MB).

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ các mốc giá trị: định
  dạng PDF (không hợp lệ), định dạng JPG (hợp lệ), định dạng PNG (hợp
  lệ), định dạng WebP (hợp lệ), dung lượng 5MB (giá trị trong vùng hợp
  lệ), dung lượng 15MB (giá trị trong vùng không hợp lệ).

  -----------------------------------------------------------------------------
  **Mã TC**     **Tên Test Case     **Dữ liệu    **Kết quả mong đợi   **Trạng
                (Kịch bản kiểm      đầu vào      (Expected Result)**  thái**
                thử)**              (Input)**                         
  ------------- ------------------- ------------ -------------------- ---------
  TC_BB_8.1.1   Kiểm tra upload ảnh Ảnh          Hệ thống từ chối,    PASS
                định dạng không hợp meal.pdf,    hiển thị thông báo   
                lệ - Hệ thống từ    dung lượng   \"Định dạng không hỗ 
                chối                5MB          trợ. Vui lòng chọn   
                                                 JPG, PNG hoặc WebP\" 

  TC_BB_8.1.2   Kiểm tra upload ảnh Ảnh          Hệ thống từ chối,    PASS
                dung lượng vượt quá meal.jpg,    hiển thị thông báo   
                10MB - Hệ thống từ  dung lượng   \"Dung lượng ảnh tối 
                chối                15MB         đa 10MB\"            

  TC_BB_8.1.3   Kiểm tra upload ảnh Ảnh          Hệ thống chấp nhận,  PASS
                định dạng JPG hợp   meal.jpg,    gửi ảnh sang AI phân 
                lệ, dung lượng      dung lượng   tích                 
                5MB - Hệ thống chấp 5MB                               
                nhận                                                  

  TC_BB_8.1.4   Kiểm tra upload ảnh Ảnh          Hệ thống chấp nhận,  PASS
                định dạng PNG hợp   meal.png,    gửi ảnh sang AI phân 
                lệ, dung lượng      dung lượng   tích                 
                5MB - Hệ thống chấp 5MB                               
                nhận                                                  

  TC_BB_8.1.5   Kiểm tra upload ảnh Ảnh          Hệ thống chấp nhận,  PASS
                định dạng WebP hợp  meal.webp,   gửi ảnh sang AI phân 
                lệ, dung lượng      dung lượng   tích                 
                5MB - Hệ thống chấp 5MB                               
                nhận                                                  
  -----------------------------------------------------------------------------

Kiểm thử cho FR_8.2: Giao tiếp Gemini AI và bóc tách dữ liệu

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống giao tiếp
  thành công với Google Gemini API, nhận về và bóc tách chính xác các
  trường dữ liệu: isFood, foodItems, calories, protein, carbs, fats.
  Đồng thời kiểm tra cơ chế gán giá trị mặc định khi dữ liệu trả về bị
  thiếu field.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_8.2 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Bảng quyết định (Decision
  Table) kết hợp phân hoạch tương đương.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ các trường hợp: AI
  trả về đầy đủ 6 trường dữ liệu (isFood=true, foodItems, calories,
  protein, carbs, fats), AI trả về isFood=false, AI trả về thiếu từng
  trường dữ liệu (calories, protein, carbs, fats, foodItems), AI trả về
  thiếu nhiều trường cùng lúc.

+-----------+------------------+-----------+-------------------+-----+
| **Mã TC** | **Tên Test Case  | **Dữ liệu | **Kết quả mong    | **T |
|           | (Kịch bản kiểm   | đầu vào   | đợi (Expected     | rạn |
|           | thử)**           | (Input)** | Result)**         | g** |
|           |                  |           |                   |     |
|           |                  |           |                   | **  |
|           |                  |           |                   | thá |
|           |                  |           |                   | i** |
+===========+==================+===========+===================+=====+
| TC        | Kiểm tra phân    | Ảnh chụp  | Hệ thống nhận và  | P   |
| _BB_8.2.1 | tích ảnh có thực | cơm,      | bóc tách thành    | ASS |
|           | phẩm hợp lệ - AI | thịt, rau | công isFood=true, |     |
|           | trả về đủ 6      |           | foodItems,        |     |
|           | trường dữ liệu   |           | calories,         |     |
|           |                  |           | protein, carbs,   |     |
|           |                  |           | fats              |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra phân    | Ảnh chụp  | Hệ thống nhận     | P   |
| _BB_8.2.2 | tích ảnh không   | cái bàn   | isFood=false,     | ASS |
|           | có thực phẩm -   | trống     | hiển thị \"No     |     |
|           | AI trả về        |           | food detected\",  |     |
|           | isFood=false     |           | yêu cầu chọn ảnh  |     |
|           |                  |           | khác              |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra xử lý   | Ảnh có đồ | Hệ thống tự động  | P   |
| _BB_8.2.3 | khi AI response  | ăn, JSON  | gán calories = 0, | ASS |
|           | thiếu trường     | thiếu     | vẫn hiển thị      |     |
|           | calories - Hệ    | trường    | thông tin dinh    |     |
|           | thống gán giá    | calories  | dưỡng             |     |
|           | trị mặc định     |           |                   |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra xử lý   | Ảnh có đồ | Hệ thống tự động  | P   |
| _BB_8.2.4 | khi AI response  | ăn, JSON  | gán protein = 0,  | ASS |
|           | thiếu trường     | thiếu     | vẫn hiển thị      |     |
|           | protein - Hệ     | trường    | thông tin dinh    |     |
|           | thống gán giá    | protein   | dưỡng             |     |
|           | trị mặc định     |           |                   |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra xử lý   | Ảnh có đồ | Hệ thống tự động  | P   |
| _BB_8.2.5 | khi AI response  | ăn, JSON  | gán carbs = 0,    | ASS |
|           | thiếu trường     | thiếu     | vẫn hiển thị      |     |
|           | carbs - Hệ thống | trường    | thông tin dinh    |     |
|           | gán giá trị mặc  | carbs     | dưỡng             |     |
|           | định             |           |                   |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra xử lý   | Ảnh có đồ | Hệ thống tự động  | P   |
| _BB_8.2.6 | khi AI response  | ăn, JSON  | gán fats = 0, vẫn | ASS |
|           | thiếu trường     | thiếu     | hiển thị thông    |     |
|           | fats - Hệ thống  | trường    | tin dinh dưỡng    |     |
|           | gán giá trị mặc  | fats      |                   |     |
|           | định             |           |                   |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra xử lý   | Ảnh có đồ | Hệ thống tự động  | P   |
| _BB_8.2.7 | khi AI response  | ăn, JSON  | gán foodItems =   | ASS |
|           | thiếu trường     | thiếu     | \[\] (mảng rỗng), |     |
|           | foodItems - Hệ   | trường    | vẫn hiển thị      |     |
|           | thống gán giá    | foodItems | thông tin dinh    |     |
|           | trị mặc định     |           | dưỡng             |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra xử lý   | Ảnh có đồ | Hệ thống tự động  | P   |
| _BB_8.2.8 | khi AI response  | ăn, JSON  | gán calories=0,   | ASS |
|           | thiếu nhiều      | chỉ có    | protein=0,        |     |
|           | trường cùng      | isF       | carbs=0, fats=0,  |     |
|           | lúc - Hệ thống   | ood=true, | foodItems=\[\],   |     |
|           | gán giá trị mặc  | thiếu     | vẫn hiển thị      |     |
|           | định cho tất cả  | calories, | thông tin dinh    |     |
|           |                  | protein,  | dưỡng             |     |
|           |                  | carbs,    |                   |     |
|           |                  | fats,     |                   |     |
|           |                  | foodItems |                   |     |
+-----------+------------------+-----------+-------------------+-----+

Kiểm thử cho FR_8.3: Chỉ lưu ảnh khi có thực phẩm

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống chỉ gọi API
  lưu ảnh lên Image Host khi Google Gemini AI xác nhận ảnh chứa thực
  phẩm (isFood = true). Trường hợp isFood = false, hệ thống không được
  phép upload ảnh.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_8.3 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân hoạch tương đương.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ 2 kịch bản: isFood =
  true (hệ thống gọi API upload ảnh lên Image Host) và isFood = false
  (hệ thống không gọi API upload ảnh).

+-----------+------------------+-----------+-------------------+-----+
| **Mã TC** | **Tên Test Case  | **Dữ liệu | **Kết quả mong    | **T |
|           | (Kịch bản kiểm   | đầu vào   | đợi (Expected     | rạn |
|           | thử)**           | (Input)** | Result)**         | g** |
|           |                  |           |                   |     |
|           |                  |           |                   | **  |
|           |                  |           |                   | Thá |
|           |                  |           |                   | i** |
+===========+==================+===========+===================+=====+
| TC        | Kiểm tra lưu ảnh | isF       | Hệ thống gọi API  | P   |
| _BB_8.3.1 | khi              | ood=true, | upload lên Image  | ASS |
|           | isFood=true - Hệ | ảnh JPG   | Host, trả về      |     |
|           | thống upload ảnh | dung      | imageUrl, hiển    |     |
|           | thành công       | lượng 5MB | thị ảnh kèm dinh  |     |
|           |                  |           | dưỡng             |     |
+-----------+------------------+-----------+-------------------+-----+
| TC        | Kiểm tra không   | isF       | Hệ thống không    | P   |
| _BB_8.3.2 | lưu ảnh khi      | ood=false | gọi API upload,   | ASS |
|           | isFood=false -   |           | chỉ hiển thị      |     |
|           | Hệ thống bỏ qua  |           | thông báo \"No    |     |
|           | upload           |           | food detected\"   |     |
+-----------+------------------+-----------+-------------------+-----+

### UC-9: Record Food Intake

Kiểm thử cho Yêu cầu FR_9.1: Validate dữ liệu bữa ăn và lưu vào database

- **Mục tiêu kiểm thử (Test Objective): **Xác minh hệ thống validate dữ
  liệu bữa ăn chính xác: tên bữa ăn không được rỗng, các chỉ số
  calories, protein, carbs, fats không được âm. Nếu dữ liệu hợp lệ, hệ
  thống lưu vào database. Nếu dữ liệu không hợp lệ, hệ thống trả về
  thông báo lỗi và không lưu.

- **Ánh xạ yêu cầu: **Phục vụ trực tiếp cho FR_9.1 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng: **Kiểm thử Hộp đen - Phân hoạch tương đương
  (Quy định: tên không rỗng, calories/protein/carbs/fats ≥ 0).

- **Phân tích miền dữ liệu: **Tập kiểm thử bao phủ các trường hợp: tên
  bữa ăn rỗng (không hợp lệ), calories âm (không hợp lệ), protein âm
  (không hợp lệ), carbs âm (không hợp lệ), fats âm (không hợp lệ), dữ
  liệu hợp lệ (lưu thành công).

  ---------------------------------------------------------------------------------
  **Mã TC**     **Tên Test Case**   **Dữ liệu đầu    **Kết quả mong đợi   **Trạng
                                    vào (Input)**    (Expected Result)**  thái**
  ------------- ------------------- ---------------- -------------------- ---------
  TC_BB_9.1.1   Kiểm tra validate   Tên = \"\",      Hệ thống trả về      PASS
                khi tên bữa ăn      calories=500,    thông báo lỗi        
                rỗng - Hệ thống báo protein=20,      \"Invalid meal       
                lỗi, không lưu      carbs=50,        data\", không lưu    
                                    fats=10          vào database         

  TC_BB_9.1.2   Kiểm tra validate   Tên = \"Cơm      Hệ thống trả về      PASS
                khi calories âm -   trưa\",          thông báo lỗi        
                Hệ thống báo lỗi,   calories=-100,   \"Invalid meal       
                không lưu           protein=20,      data\", không lưu    
                                    carbs=50,        vào database         
                                    fats=10                               

  TC_BB_9.1.3   Kiểm tra validate   Tên = \"Cơm      Hệ thống trả về      PASS
                khi protein âm - Hệ trưa\",          thông báo lỗi        
                thống báo lỗi,      calories=500,    \"Invalid meal       
                không lưu           protein=-5,      data\", không lưu    
                                    carbs=50,        vào database         
                                    fats=10                               

  TC_BB_9.1.4   Kiểm tra validate   Tên = \"Cơm      Hệ thống trả về      PASS
                khi carbs âm - Hệ   trưa\",          thông báo lỗi        
                thống báo lỗi,      calories=500,    \"Invalid meal       
                không lưu           protein=20,      data\", không lưu    
                                    carbs=-10,       vào database         
                                    fats=10                               

  TC_BB_9.1.5   Kiểm tra validate   Tên = \"Cơm      Hệ thống trả về      PASS
                khi fats âm - Hệ    trưa\",          thông báo lỗi        
                thống báo lỗi,      calories=500,    \"Invalid meal       
                không lưu           protein=20,      data\", không lưu    
                                    carbs=50,        vào database         
                                    fats=-3                               

  TC_BB_9.1.6   Kiểm tra dữ liệu    Tên = \"Cơm      Hệ thống lưu thành   PASS
                hợp lệ - Hệ thống   trưa\",          công vào database    
                lưu thành công vào  calories=500,                         
                database            protein=20,                           
                                    carbs=50,                             
                                    fats=10,                              
                                    healthScore=8                         
  ---------------------------------------------------------------------------------

Kiểm thử cho FR_9.2: Gán Health Score

- **Mục tiêu kiểm thử (Test Objective): **Xác minh hệ thống xử lý health
  score đúng theo cơ chế: làm tròn (Math.round) và clamp trong khoảng
  \[1-10\]. Áp dụng cho cả healthScore do người dùng cung cấp và
  healthScore do hệ thống tự tính.

- **Ánh xạ yêu cầu: **Phục vụ trực tiếp cho FR_9.2 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng: **Kiểm thử Hộp đen - Phân tích giá trị biên kết
  hợp phân hoạch tương đương (Quy định: health score sau khi làm tròn và
  clamp phải nằm trong \[1-10\]).

- **Phân tích miền dữ liệu: **Tập kiểm thử bao phủ các trường hợp: không
  gửi healthScore (hệ thống tự tính), healthScore cần làm tròn (7.6,
  7.4), healthScore vượt quá 10 (12), healthScore dưới 1 (0.4),
  healthScore là số nguyên trong khoảng (5).

  --------------------------------------------------------------------------
  **Mã TC**     **Tên Test   **Dữ liệu đầu vào    **Kết quả mong   **Trạng
                Case**       (Input)**            đợi (Expected    thái**
                                                  Result)**        
  ------------- ------------ -------------------- ---------------- ---------
  TC_BB_9.2.1   Kiểm tra tự  Tên = \"Cơm trưa\",  Hệ thống tự tính PASS
                động tính    calories=500,        score, sau đó    
                health score protein=20,          làm tròn và      
                khi chưa     carbs=50, fats=10,   clamp trong      
                được cung    không gửi            khoảng \[1-10\]  
                cấp          healthScore                           

  TC_BB_9.2.2   Kiểm tra     Tên = \"Cơm trưa\",  Hệ thống làm     PASS
                health score calories=500,        tròn thành 8,    
                có giá trị   protein=20,          lưu healthScore  
                thập phân    carbs=50, fats=10,   = 8              
                cần làm tròn healthScore=7.6                       
                lên                                                

  TC_BB_9.2.3   Kiểm tra     Tên = \"Cơm trưa\",  Hệ thống làm     PASS
                health score calories=500,        tròn thành 7,    
                có giá trị   protein=20,          lưu healthScore  
                thập phân    carbs=50, fats=10,   = 7              
                cần làm tròn healthScore=7.4                       
                xuống                                              

  TC_BB_9.2.4   Kiểm tra     Tên = \"Cơm trưa\",  Hệ thống clamp   PASS
                health score calories=500,        về 10, lưu       
                vượt quá     protein=20,          healthScore = 10 
                giới hạn     carbs=50, fats=10,                    
                trên         healthScore=12                        

  TC_BB_9.2.5   Kiểm tra     Tên = \"Cơm trưa\",  Hệ thống clamp   PASS
                health score calories=500,        lên 1, lưu       
                thấp hơn     protein=20,          healthScore = 1  
                giới hạn     carbs=50, fats=10,                    
                dưới         healthScore=0.4                       

  TC_BB_9.2.6   Kiểm tra     Tên = \"Cơm trưa\",  Hệ thống giữ     PASS
                health score calories=500,        nguyên 5, lưu    
                là số nguyên protein=20,          healthScore = 5  
                trong khoảng carbs=50, fats=10,                    
                cho phép     healthScore=5                         
  --------------------------------------------------------------------------

Kiểm thử cho FR_9.2: Tính Health Score

- **Mục tiêu kiểm thử (Test Objective):** Xác minh thuật toán tính
  health score trong hàm calculateHealthScore chạy đúng trên tất cả các
  nhánh logic, đảm bảo kết quả trả về chính xác sau khi làm tròn và
  clamp trong khoảng \[1-10\].

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_9.2 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp trắng - Bao phủ nhánh theo
  nguyên lý McCabe.

- **Phân tích luồng (Path Analysis):** Hàm calculateHealthScore có 5
  đường đi độc lập (V(G) = 5). Các đường đi bao gồm: healthScore được
  cung cấp sẵn, proteinRatio \> 0.25 kết hợp fatRatio 20-35% và calories
  \< 300, 0.15 \< proteinRatio ≤ 0.25 kết hợp fatRatio \> 50% và
  calories \> 1000, proteinRatio ≤ 0.15 kết hợp fatRatio \> 50% và
  calories bình thường, proteinRatio \> 0.25 kết hợp fatRatio bình
  thường và calories \< 300.

- **Độ phức tạp Cyclomatic:** V(G) = 5. Do đó, tối thiểu 5 test case là
  đủ để bao phủ 100% luồng điều khiển của hàm này.

  ----------------------------------------------------------------------------
  **Mã TC**     **Luồng bao phủ  **Dữ liệu kiểm thử **Kết quả mong   **Trạng
                (Path)**         (Input             đợi (Measurable  thái**
                                 Variables)**       Expected         
                                                    Return)**        
  ------------- ---------------- ------------------ ---------------- ---------
  TC_WB_9.3.1   Path 1:          calories=500,      Hệ thống: Làm    PASS
                healthScore được protein=20,        tròn và clamp    
                cung cấp sẵn     carbs=50, fats=10, healthScore      
                                 healthScore=7.5    trong \[1-10\],  
                                                    trả về 8         

  TC_WB_9.3.2   Path 2:          calories=250,      Hệ thống: score  PASS
                proteinRatio \>  protein=30,        = 5 + 1.5 + 1 +  
                0.25, fatRatio   carbs=20, fats=10  0.5 = 8, trả về  
                20-35%, calories                    8                
                \< 300                                               

  TC_WB_9.3.3   Path 3: 0.15 \<  calories=1200,     Hệ thống: score  PASS
                proteinRatio ≤   protein=60,        = 5 + 0.5 - 1 -  
                0.25, fatRatio   carbs=100, fats=70 0.5 = 4, trả về  
                \> 50%, calories                    4                
                \> 1000                                              

  TC_WB_9.3.4   Path 4:          calories=600,      Hệ thống: score  PASS
                proteinRatio ≤   protein=10,        = 5 + 0 - 1 = 4, 
                0.15, fatRatio   carbs=50, fats=40  trả về 4         
                \> 50%, calories                                     
                bình thường                                          

  TC_WB_9.3.5   Path 5:          calories=280,      Hệ thống: score  PASS
                proteinRatio \>  protein=35,        = 5 + 1.5 + 0 +  
                0.25, fatRatio   carbs=30, fats=12  0.5 = 7, trả về  
                bình thường,                        7                
                calories \< 300                                      
  ----------------------------------------------------------------------------

### UC-10: View Daily Summary

Kiểm thử cho FR_10.1: Lấy mục tiêu dinh dưỡng từ database

- **Mục tiêu kiểm thử (Test Objective**): Xác minh hệ thống lấy đúng mục
  tiêu dinh dưỡng (calo, protein, carbs, fats) từ cơ sở dữ liệu theo
  userId và ngày được chỉ định.

- **Ánh xạ yêu cầu: **Phục vụ trực tiếp cho FR_10.1 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng: **Kiểm thử Hộp đen - Phân hoạch tương đương.

- Phân tích miền dữ liệu: Tập kiểm thử bao phủ 2 kịch bản: người dùng đã
  thiết lập mục tiêu cho ngày cụ thể (hệ thống trả về đúng dữ liệu),
  người dùng có mục tiêu nhưng ngày được chọn không có dữ liệu (hệ thống
  trả về null hoặc target mặc định).

  --------------------------------------------------------------------------
  **Mã TC**      **Tên Test Case** **Dữ liệu đầu     **Kết quả     **Trạng
                                   vào**             mong đợi**    thái**
  -------------- ----------------- ----------------- ------------- ---------
  TC_BB_10.1.1   Kiểm tra lấy đúng userId =          Trả về đúng   PASS
                 mục tiêu khi đã   \"user123\", date target        
                 thiết lập         = \"2024-01-15\"                

  TC_BB_10.1.2   Kiểm tra lấy mục  userId =          Trả về null   PASS
                 tiêu với ngày     \"user123\", date hoặc target   
                 không có dữ liệu  = \"2025-01-01\"  mặc định      
  --------------------------------------------------------------------------

Kiểm thử cho FR_10.2: Tính tổng tiêu thụ và lượng còn lại

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống tính đúng
  tổng lượng dinh dưỡng tiêu thụ từ các bữa ăn trong ngày và tính lượng
  còn lại (mục tiêu - tiêu thụ) với quy tắc không âm.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_10.2 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân hoạch tương đương
  (Quy định: lượng còn lại không được âm).

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ 3 kịch bản: tổng tiêu
  thụ được tính đúng từ các bữa ăn, lượng còn lại khi tiêu thụ nhỏ hơn
  mục tiêu (remaining = target - consumed), lượng còn lại khi tiêu thụ
  lớn hơn mục tiêu (remaining = 0).

  ------------------------------------------------------------------------------
  **Mã TC**      **Tên Test Case** **Dữ liệu đầu vào **Kết quả mong    **Trạng
                                   (Input)**         đợi (Expected     thái**
                                                     Result)**         
  -------------- ----------------- ----------------- ----------------- ---------
  TC_BB_10.2.1   Kiểm tra consumed userId =          Hệ thống tính     PASS
                 = tổng macros của \"user123\", date đúng tổng calo,   
                 các bữa ăn trong  = \"2024-01-15\", protein, carbs,   
                 ngày              có 3 bữa ăn       fats từ các bữa   
                                                     ăn                

  TC_BB_10.2.2   Kiểm tra          Mục tiêu:         Hệ thống tính     PASS
                 remaining =       calo=2000, Tiêu   remaining = 500   
                 target - consumed thụ: calo=1500                      
                 khi consumed \<                                       
                 target                                                

  TC_BB_10.2.3   Kiểm tra          Mục tiêu:         Hệ thống tính     PASS
                 remaining không   calo=2000, Tiêu   remaining = 0     
                 âm khi consumed   thụ: calo=2500    (không âm)        
                 \> target                                             
  ------------------------------------------------------------------------------

Kiểm thử cho FR_10.3: Xử lý khi chưa thiết lập mục tiêu

- **Mục tiêu kiểm thử (Test Objective):** Xác minh khi người dùng chưa
  thiết lập mục tiêu dinh dưỡng, hệ thống yêu cầu người dùng thiết lập
  mục tiêu và không hiển thị tóm tắt (targets, consumed, remaining,
  meals).

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_10.3 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân hoạch tương đương.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ kịch bản người dùng
  chưa thiết lập mục tiêu dinh dưỡng, hệ thống không hiển thị summary mà
  chuyển sang flow thiết lập mục tiêu.

  -----------------------------------------------------------------------------
  **Mã TC**      **Tên Test       **Dữ liệu đầu vào **Kết quả mong    **Trạng
                 Case**           (Input)**         đợi (Expected     thái**
                                                    Result)**         
  -------------- ---------------- ----------------- ----------------- ---------
  TC_BB_10.4.1   Kiểm tra thiếu   userId =          Hệ thống không    PASS
                 target thì       \"user123\", date hiển thị summary, 
                 chuyển hướng     = \"2024-01-15\", chuyển sang flow  
                 setup, không     chưa có mục tiêu  thiết lập mục     
                 hiển thị summary                   tiêu              

  -----------------------------------------------------------------------------

### UC-11: View Meal History

Kiểm thử cho FR_11.1: Định dạng ngày tháng

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống chấp nhận
  đầu vào ngày bắt đầu và ngày kết thúc theo đúng định dạng YYYY-MM-DD,
  đồng thời từ chối và báo lỗi khi định dạng sai.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_11.1 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân hoạch tương đương.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ 2 kịch bản: ngày
  tháng đúng định dạng YYYY-MM-DD (hệ thống chấp nhận và xử lý bình
  thường), ngày tháng sai định dạng (hệ thống từ chối và trả về thông
  báo lỗi).

  ----------------------------------------------------------------------------
  **Mã TC**      **Tên Test Case** **Dữ liệu đầu vào **Kết quả mong  **Trạng
                                   (Input)**         đợi (Expected   thái**
                                                     Result)**       
  -------------- ----------------- ----------------- --------------- ---------
  TC_BB_11.1.1   Kiểm tra nhận     startDate =       Hệ thống chấp   PASS
                 startDate và      \"2024-01-01\",   nhận và xử lý   
                 endDate đúng định endDate =         bình thường     
                 dạng YYYY-MM-DD   \"2024-01-31\"                    

  TC_BB_11.1.2   Kiểm tra định     startDate =       Hệ thống từ     PASS
                 dạng ngày sai bị  \"01/01/2024\",   chối, trả về    
                 từ chối / báo lỗi endDate =         thông báo lỗi   
                                   \"31/01/2024\"    định dạng       
  ----------------------------------------------------------------------------

Kiểm thử cho FR_11.2: Điều chỉnh ngày bắt đầu khi trước ngày tạo tài
khoản

- **Mục tiêu kiểm thử (Test Objective):** Xác minh khi người dùng chọn
  ngày bắt đầu trước ngày tạo tài khoản, hệ thống tự động điều chỉnh
  ngày bắt đầu thành ngày tạo tài khoản.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_11.2 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân tích giá trị biên.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ kịch bản ngày bắt đầu
  nhỏ hơn ngày tạo tài khoản (hệ thống tự động điều chỉnh thành ngày tạo
  tài khoản). Các trường hợp ngày bắt đầu lớn hơn hoặc bằng ngày tạo tài
  khoản sẽ giữ nguyên (không cần điều chỉnh).

  -----------------------------------------------------------------------------
  **Mã TC**      **Tên Test      **Dữ liệu đầu vào   **Kết quả mong   **Trạng
                 Case**          (Input)**           đợi (Expected    thái**
                                                     Result)**        
  -------------- --------------- ------------------- ---------------- ---------
  TC_BB_11.2.1   Kiểm tra        startDate =         Hệ thống tự động PASS
                 startDate \<    \"2020-01-01\",     điều chỉnh       
                 ngày tạo tài    userCreatedDate =   startDate thành  
                 khoản - Hệ      \"2023-01-01\"      \"2023-01-01\"   
                 thống tự động                                        
                 điều chỉnh                                           

  -----------------------------------------------------------------------------

Kiểm thử cho FR_11.3: Lấy bữa ăn, nhóm theo ngày và tính tóm tắt

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống lấy đúng tất
  cả bữa ăn trong khoảng thời gian được chỉ định, nhóm chính xác theo
  từng ngày và tính tóm tắt dinh dưỡng (targets, consumed, remaining)
  cho mỗi ngày. Đồng thời xử lý các trường hợp ngoại lệ như không có bữa
  ăn hoặc ngày bắt đầu lớn hơn ngày kết thúc.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_11.3 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân hoạch tương đương.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ 5 kịch bản: lấy đúng
  bữa ăn theo khoảng thời gian, nhóm bữa ăn theo ngày, tính tóm tắt dinh
  dưỡng cho mỗi ngày, không có bữa ăn trong khoảng thời gian, ngày bắt
  đầu lớn hơn ngày kết thúc.

  -----------------------------------------------------------------------------
  **Mã TC**      **Tên Test       **Dữ liệu đầu vào **Kết quả mong    **Trạng
                 Case**           (Input)**         đợi (Expected     thái**
                                                    Result)**         
  -------------- ---------------- ----------------- ----------------- ---------
  TC_BB_11.3.1   Kiểm tra lấy     startDate =       Hệ thống trả về   PASS
                 đúng bữa ăn theo \"2024-01-01\",   đúng các bữa ăn   
                 khoảng thời gian endDate =         trong khoảng thời 
                                  \"2024-01-31\"    gian              

  TC_BB_11.3.2   Kiểm tra nhóm    Các bữa ăn thuộc  Hệ thống nhóm     PASS
                 bữa ăn theo ngày nhiều ngày khác   đúng các bữa ăn   
                                  nhau              theo từng ngày    

  TC_BB_11.3.3   Kiểm tra tính    Dữ liệu bữa ăn và Hệ thống tính     PASS
                 tóm tắt          mục tiêu của từng đúng targets,     
                 (targets,        ngày              consumed,         
                 consumed,                          remaining cho mỗi 
                 remaining) cho                     ngày              
                 mỗi ngày                                             

  TC_BB_11.3.4   Kiểm tra khi     startDate =       Hệ thống trả về   PASS
                 không có bữa ăn  \"2024-01-01\",   mảng rỗng hoặc    
                 trong khoảng     endDate =         thông báo \"Không 
                 thời gian        \"2024-01-31\",   có dữ liệu\"      
                                  không có bữa ăn                     
                                  nào                                 

  TC_BB_11.3.5   Kiểm tra khi     startDate =       Hệ thống từ chối, PASS
                 startDate lớn    \"2024-01-31\",   trả về thông báo  
                 hơn endDate      endDate =         lỗi \"Ngày bắt    
                                  \"2024-01-01\"    đầu phải nhỏ hơn  
                                                    ngày kết thúc\"   
  -----------------------------------------------------------------------------

Kiểm thử cho FR_11.4: Sắp xếp kết quả

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống sắp xếp danh
  sách tóm tắt dinh dưỡng theo ngày từ ngày mới nhất đến ngày cũ nhất
  (giảm dần).

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_11.4 (Chi tiết kỹ thuật
  xem tại Ma trận dò vết Chương 4).

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Phân hoạch tương đương.

- **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ kịch bản hệ thống trả
  về danh sách các ngày trong khoảng thời gian được sắp xếp theo thứ tự
  giảm dần (ngày mới nhất đứng đầu, ngày cũ nhất đứng cuối).

  -----------------------------------------------------------------------------
  **Mã TC**      **Tên Test     **Dữ liệu đầu vào **Kết quả mong đợi  **Trạng
                 Case**         (Input)**         (Expected Result)** thái**
  -------------- -------------- ----------------- ------------------- ---------
  TC_BB_11.4.1   Kiểm tra sắp   startDate =       Hệ thống trả về     PASS
                 xếp từ ngày    \"2024-01-01\",   danh sách sắp xếp   
                 mới nhất đến   endDate =         giảm dần: 31/01 →   
                 ngày cũ nhất   \"2024-01-31\"    01/01               

  -----------------------------------------------------------------------------

### UC-12: Quản lý hồ sơ sức khỏe

Kiểm thử cho Yêu cầu FR_12.1: Cập nhật cân nặng trong hồ sơ sức khỏe

- **Mục tiêu kiểm thử:** Xác minh hệ thống xử lý đúng việc cập nhật một
  trường dữ liệu đơn lẻ (partial update), đảm bảo ràng buộc biên vẫn
  được thực thi khi các trường khác không được gửi lên.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_12.1.

- **Phương pháp áp dụng:** Kiểm thử hộp đen -- Phân tích giá trị biên
  kết hợp kiểm thử Partial Update.

- **Ràng buộc:** 30 kg ≤ weight ≤ 300 kg

- **Phân tích miền dữ liệu:** 29 (Dưới Min), 30 (Min), 75 (Nominal), 300
  (Max), 301 (Vượt Max)

  ----------------------------------------------------------------------------
  **Mã TC**      **Tên        **Dữ liệu đầu   **Kết quả mong đợi     **Trạng
                 Testcase**   vào (Input)**   (Expected Result)**    thái**
  -------------- ------------ --------------- ---------------------- ---------
  TC_BB_12.1.1   Cân nặng     { weight: 29 }  Từ chối, không cập     PASS
                 dưới Min                     nhật CSDL. UI hiển thị 
                                              lỗi validation         

  TC_BB_12.1.2   Cân nặng     { weight: 30 }  Ghi nhận weight = 30,  PASS
                 bằng Min                     các trường khác giữ    
                                              nguyên                 

  TC_BB_12.1.3   Cân nặng     { weight: 75 }  Ghi nhận weight = 75,  PASS
                 Nominal                      các trường khác giữ    
                                              nguyên                 

  TC_BB_12.1.4   Cân nặng     { weight: 300 } Ghi nhận weight = 300, PASS
                 bằng Max                     các trường khác giữ    
                                              nguyên                 

  TC_BB_12.1.5   Cân nặng     { weight: 301 } Từ chối, không cập     PASS
                 vượt Max                     nhật CSDL. UI hiển thị 
                                              lỗi validation         
  ----------------------------------------------------------------------------

Kiểm thử cho Yêu cầu FR_12.2: Cập nhật mức độ vận động và tính lại TDEE

- **Mục tiêu kiểm thử:** Xác minh khi cập nhật trực tiếp activityLevel,
  hệ thống tính lại TDEE đúng với toàn bộ 5 mức PAL.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR_12.2.

- **Phương pháp áp dụng:** Kiểm thử hộp trắng -- Bao phủ nhánh theo
  McCabe.

- **Kiểm soát biến số:** BMR = 1617.5 kcal

- **Công thức:** TDEE=BMR×PAL

  --------------------------------------------------------------------------------------
  **Mã TC**      **Tên         **Dữ liệu đầu vào (Input)**     **Kết quả mong  **Trạng
                 Testcase**                                    đợi (Expected   thái**
                                                               Result)**       
  -------------- ------------- ------------------------------- --------------- ---------
  TC_WB_12.2.1   sedentary     activityLevel=\'sedentary\'     1617.5 × 1.2 =  PASS
                 (PAL=1.2)                                     **1941.0 kcal** 

  TC_WB_12.2.2   light         activityLevel=\'light\'         1617.5 × 1.375  PASS
                 (PAL=1.375)                                   = **2224.1      
                                                               kcal**          

  TC_WB_12.2.3   moderate      activityLevel=\'moderate\'      1617.5 × 1.55 = PASS
                 (PAL=1.55)                                    **2507.1 kcal** 

  TC_WB_12.2.4   active        activityLevel=\'active\'        1617.5 × 1.725  PASS
                 (PAL=1.725)                                   = **2790.2      
                                                               kcal**          

  TC_WB_12.2.5   very_active   activityLevel=\'very_active\'   1617.5 × 1.9 =  PASS
                 (PAL=1.9)                                     **3073.3 kcal** 
  --------------------------------------------------------------------------------------

### UC-13: Update Target Plan

Kiểm thử cho Yêu cầu FR_13.1: Nhập mục tiêu calo thủ công

- **Mục tiêu kiểm thử:** Xác minh ràng buộc tối thiểu calories ≥ 1000
  kcal tại tầng DTO.

- **Phương pháp:** Kiểm thử hộp đen -- BVA

  ------------------------------------------------------------------------------
  **Mã TC**      **Tên        **Dữ liệu   **Kết quả mong đợi (Expected **Trạng
                 Testcase**   đầu vào     Result)**                    thái**
                              (Input)**                                
  -------------- ------------ ----------- ---------------------------- ---------
  TC_BB_13.1.1   Dưới mức tối 999         HTTP 400, báo lỗi "Calo tối  PASS
                 thiểu                    thiểu 1000 kcal"             

  TC_BB_13.1.2   Bằng mức tối 1000        Chấp nhận, lưu vào           PASS
                 thiểu                    TargetPeriod                 

  TC_BB_13.1.3   Nominal      2000        Chấp nhận, lưu vào           PASS
                                          TargetPeriod                 
  ------------------------------------------------------------------------------

Kiểm thử cho Yêu cầu FR_13.2: Nhập macro thủ công

**Ràng buộc**

- protein ≥ 50g

- carbs ≥ 50g

- fats ≥ 20g

  ---------------------------------------------------------------------------
  **Mã TC**      **Tên          **Dữ liệu đầu **Kết quả mong đợi    **Trạng
                 Testcase**     vào (Input)** (Expected Result)**   thái**
  -------------- -------------- ------------- --------------------- ---------
  TC_BB_13.2.1   Protein \< min p=49, c=200,  HTTP 400 -- lỗi       PASS
                                f=60          protein               

  TC_BB_13.2.2   Protein = min  p=50, c=200,  Chấp nhận             PASS
                                f=60                                

  TC_BB_13.2.3   Carbs \< min   p=150, c=49,  HTTP 400 -- lỗi carbs PASS
                                f=60                                

  TC_BB_13.2.4   Carbs = min    p=150, c=50,  Chấp nhận             PASS
                                f=60                                

  TC_BB_13.2.5   Fats \< min    p=150, c=200, HTTP 400 -- lỗi fats  PASS
                                f=19                                

  TC_BB_13.2.6   Fats = min     p=150, c=200, Chấp nhận             PASS
                                f=20                                

  TC_BB_13.2.7   Vi phạm nhiều  p=49, c=49,   HTTP 400 -- trả về    PASS
                 trường         f=19          toàn bộ lỗi           
  ---------------------------------------------------------------------------

### UC-14: Theo dõi Xu hướng Cân nặng

#### Kiểm thử Hộp đen cho FR_14.1: Validation dữ liệu biên

- **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống và giao diện
  có khả năng lọc chặn tuyệt đối các mức dữ liệu cân nặng phi logic.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho quá trình truy xuất dò vết
  của chức năng đánh giá FR_14.1.

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - **Phân tích Giá trị Biên
  (Boundary Value Analysis - BVA)** kết hợp góc nhìn trải nghiệm người
  dùng (UX). Quy định nghiệp vụ: $20.0kg \leq Cânnặng \leq 300.0kg$.

- **Phân tích miền dữ liệu và Suy luận Kết quả:** Để đảm bảo Data
  Coverage tối đa mà không gây bùng nổ số lượng Testcase dư thừa, tập
  kiểm thử sẽ bao phủ trúng 5 mốc giá trị nằm ở ranh giới và trung tâm:

  - **19.9** (Dưới Min): Kỳ vọng UI văng thông báo lỗi bảo vệ.

  - **20.0** (Biên Min): Kỳ vọng luồng dữ liệu hợp lệ (Lưu thành công).

  - **65.5** (Giá trị Nominal/Trung tâm): Xác thực đường màu hồng (Happy
    Path).

  - **300.0** (Biên Max): Giới hạn sinh học trên của hệ thống (Lưu thành
    công).

  - **300.1** (Vượt Max): Kỳ vọng UI bẻ gãy khối lệnh, báo lỗi (Lưu thất
    bại).

- **Bảng Testcase Blackbox:**

  ------------------------------------------------------------------------------
  **Mã TC**      **Kịch bản         **Input Data**    **Expected      **Trạng
                 (Scenarios)**                        Result**        thái**
  -------------- ------------------ ----------------- --------------- ----------
  TC_BB_14.1.1   Kiểm tra tiện ích  Gõ vào            **UI:** Hiện    \[PASS\]
                 ghi nhận khi người TextBox: 20.0.    thông báo cập   
                 dùng nhập dữ liệu  Gửi form.         nhật thành công 
                 chuẩn xác ở mức                      mức cân nặng.   
                 cận dưới tối                                         
                 thiểu.                                               

  TC_BB_14.1.2   Kiểm tra tính năng Gõ vào            **UI:** Hiển    \[PASS\]
                 chặn rác khi người TextBox: 19.9.    thị pop-up      
                 dùng gõ mức độ cực Gửi form.         thông báo \"Cân 
                 đoan thấp hơn giá                    nặng phải lớn   
                 trị chuẩn (Dưới                      hơn 20kg\".     
                 biên).                                               

  TC_BB_14.1.3   Kiểm tra quy trình Gõ vào            **UI:** Vẽ điểm \[PASS\]
                 đồ thị hóa tại     TextBox: 65.5.    tích mốc dữ     
                 điểm cân nặng      Gửi form.         liệu mới lên    
                 trung bình                           trên biểu đồ xu 
                 (Nominal) của con                    hướng.          
                 người.                                               

  TC_BB_14.1.4   Kiểm tra hệ thống  Gõ vào            **UI:** Đồ thị  \[PASS\]
                 trích xuất và đo   TextBox: 300.0.   load thành công 
                 lường sự kiện tại  Gửi form.         vạch mốc 300kg. 
                 điểm cận cao nhất                                    
                 cho phép (Max                                        
                 Limit).                                              

  TC_BB_14.1.5   Kiểm tra khả năng  Gõ vào            **UI:** Chặn    \[PASS\]
                 chống dữ liệu bất  TextBox: 300.1.   không cho lưu,  
                 thường ở mức độ    Gửi form.         hiện cảnh báo   
                 cực đoan cao phi                     \"Cân nặng vượt 
                 thực tế (Vượt                        giới hạn cho    
                 Max).                                phép\".         
  ------------------------------------------------------------------------------

#### Kiểm thử Hộp trắng cho Hàm xử lý FR_14.2: ScientificService.calculateEMA()

- **Mục tiêu kiểm thử (Test Objective):** Quét sạch toàn bộ các nhánh rẽ
  sinh ra trong mã nguồn của thuật toán làm phẳng đồ thị Moving Average.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho thuật toán Core tính EMA tại
  FR_14.2.

- **Phương pháp áp dụng:** Kiểm thử Hộp trắng - Lược đồ luồng điều khiển
  và **Nguyên lý Độ phức tạp McCabe **$V(G)$ nhằm đảm bảo 100% Path
  Coverage.

- **Kiểm soát biến số:** Cố định chỉ số bù nhiễu $\alpha = 0.1$ nhằm cô
  lập hàm nhánh, qua đó bộc lộ khả năng sai số của nhánh khuyết dữ liệu
  quá khứ.

- **Phân tích luồng (McCabe Analysis) & Suy luận số lượng:**

  - Hàm chỉ chứa 1 câu lệnh điều kiện rẽ nhánh an toàn sơ cấp: if
    (previousTrend === null).

  - Độ phức tạp Cyclomatic $V(G) = 1 + 1 = 2$. Cần thiết lập 2 Testcase
    để phủ 100% đường dẫn (Basis paths).

- **Kiểm soát biến số (Test Data Control):** Thiết lập mức độ bù nhiễu
  cố định $\alpha = 0.1$.

- **Biện luận Kết quả mong đợi (Expected Result Derivation):** Áp dụng
  công thức đường định
  tuyến: $EMA = actual \times \alpha + previousTrend \times (1 - \alpha)$.

  - **Nhánh 1 (Khuyết dữ liệu
    cũ):** $previousTrend = null \rightarrow$ Trả về trực tiếp chính giá
    trị $actual$ hiện tại.

  - **Nhánh 2 (Hợp lệ):** Giả
    sử $actual = 69.0$ và $previousTrend = 70.0$. Áp dụng công thức ta
    có: $EMA_{expected} = (69.0 \times 0.1) + (70.0 \times 0.9) = 6.9 + 63.0 = 69.9$.

- **Bảng Testcase Whitebox:**

  ---------------------------------------------------------------------------------
  **Mã TC**      **Path (Nhánh   **Input Variables       **Measurable    **Trạng
                 Thực thi        (Param code)**          Expected        thái**
                 Logic)**                                Return**        
  -------------- --------------- ----------------------- --------------- ----------
  TC_WB_14.2.1   Kiểm tra đường  actual = 70.0\          Hàm lập tức     \[PASS\]
                 viền rẽ nhánh   previousTrend = null    Return kết quả  
                 khi người dùng                          sớm trị số      
                 nhập thông tin                          nguyên          
                 cân nặng lần                            thủy 70.0.      
                 đầu tiên.                                               

  TC_WB_14.2.2   Kiểm tra logic  actual = 69.0\          Hệ thống trả về \[PASS\]
                 tính toán công  previousTrend = 70.0\   giá trị số      
                 thức trung bình alpha = 0.1             học 69.9.       
                 động có biến số                                         
                 Alpha.                                                  
  ---------------------------------------------------------------------------------

### UC-15: Tự động Hiệu chỉnh Mục tiêu Dinh dưỡng

#### Kiểm thử Hộp đen cho FR_15.1: Xử lý Mảng đầu vào

- **Mục tiêu kiểm thử & Phương pháp:** Kiểm tra việc hệ thống đọc nhận
  thao tác hiển thị và nhập liệu của người dùng trên Client. Dùng **Phân
  hoạch Tương đương (Equivalence Partitioning - EP)**.

- **Biện luận chia vùng dữ liệu:** Hành vi nhập liệu cân nặng của người
  dùng trên giao diện App (UI) được phân thành 3 vùng ranh giới: Người
  dùng nhập đầy đủ thường xuyên (Vùng Hợp lệ), Tài khoản mới trắng thông
  tin (Trống dữ liệu tuyệt đối), và Người lười chỉ đụng vào nhập 1 ngày
  duy nhất (Trống dữ liệu tương đối).

**Bảng Testcase Blackbox:**

  ----------------------------------------------------------------------------------
  **Mã TC**      **Kịch bản**       **Input Data**    **Expected Result   **Trạng
                                                      (System + UI        thái**
                                                      behavior)**         
  -------------- ------------------ ----------------- ------------------- ----------
  TC_BB_15.1.1   Kiểm tra tính năng Tài khoản đã lên  **UI:** Vẽ đồ thị   \[PASS\]
                 tính TDEE thích    App               mức tiêu hao TDEE   
                 ứng trên Dashboard nhập $> 2$ ngày   mới cho người dùng. 
                 khi người dùng có  dữ liệu đo cân                        
                 thói quen ghi chép nặng. Bấm nút Tối                     
                 biểu đồ cân.       ưu.                                   

  TC_BB_15.1.2   Xác minh hiển thị  Hồ sơ trống rỗng. **UI:** Trình chiếu \[PASS\]
                 bắt lỗi sớm khi    Không có ngày nào Text thông báo \"Dữ 
                 người dùng là tài  có cân nặng trên  liệu chưa đủ để     
                 khoản mới tanh,    UI. Bấm nút Tối   phân tích\".        
                 giao diện chưa có  ưu.                                   
                 bất cứ dữ liệu cân                                       
                 nặng nào.                                                

  TC_BB_15.1.3   Xác minh chức năng Lên ứng dụng nhập **UI:** Dashboard   \[PASS\]
                 cảnh báo khi người 1 mốc cân nặng    hiện thông báo yêu  
                 dùng chỉ mới điền  ngày hôm nay. Bấm cầu \"Cần nhập thêm 
                 duy nhất 1 lần đo  nút Tối ưu.       độ chênh lệch cân   
                 mốc cân nặng (Sắp                    nặng để thiết       
                 xếp không đủ để                      lập\".              
                 nhìn độ lệch).                                           
  ----------------------------------------------------------------------------------

#### Kiểm thử Hộp trắng cho Hàm xử lý FR_15.2: ScientificService.calculateAdaptiveTDEE()

- **Mục tiêu kiểm thử & Phương pháp:** Lấy biểu đồ đường chạy thông qua
  các toán hạng If. Ứng dụng mô hình **Độ phức tạp McCabe (V(G))** để
  bao phủ nhánh vòng lặp (Branch Coverage).

- **Phân tích luồng (McCabe Analysis):**

  - Mã nguồn logic hàm calculateAdaptiveTDEE rẽ nhánh bẫy lỗi ở Node if
    (days \<= 0).

  - Độ phức tạp đồ thị $V(G) = 1 + 1 = 2$. Hệ thống yêu cầu 2 Test Cases
    bao phủ 100% đường dẫn.

- **Kiểm soát biến số (Test Data Control):** Cố định mức Calo nạp trung
  bình $avgIntake = 2000$ kcal.

- **Biện luận Kết quả mong đợi (Expected Result Derivation):** Áp dụng
  công thức quy đổi $1kg = 7700kcal$. Công thức tổng
  quát: $TDEE_{new} = avgIntake - \frac{weightChange \times 7700}{days}$.

  - **Nhánh 1 (ZeroDivision):** Khoảng cách đo $days = 0$. Thuật toán
    kích hoạt Guardrail ngắt tính toán để chặn lỗi chia cho 0. Kết quả
    giữ nguyên Baseline $TDEE_{expected} = 2000$.

  - **Nhánh 2 (Thực thi thành công):** Giả sử truyền vào thời
    gian $days = 14$, sự sụt giảm cân nặng đo được
    là $weightChange = - 1.0kg$, suy ra năng lượng hao hụt mỗi
    ngày: $\frac{- 1.0 \times 7700}{14} = - 550$. Kết
    quả $TDEE_{expected} = 2000 - ( - 550) = 2550$ (kcal).

**Bảng Testcase Whitebox:**

  ----------------------------------------------------------------------------------
  **Mã TC**      **Path (Nhánh Thực **Input Variables      **Measurable   **Trạng
                 thi Logic)**       (Param code)**         Expected       thái**
                                                           Return**       
  -------------- ------------------ ---------------------- -------------- ----------
  TC_WB_15.2.1   Kiểm tra phản hồi  avgIntake = 2000\      Hệ thống trả   \[PASS\]
                 nhánh rẽ Exception weightChange = -1.2\   về giá trị     
                 ngầm khi khoảng    days = 0               đích           
                 cách chu kỳ thời                          danh 2000.     
                 gian Test bằng 0.                                        

  TC_WB_15.2.2   Kiểm thử điều      avgIntake = 2000\      Hệ thống trả   \[PASS\]
                 hướng luồng tính   weightChange = -1.0\   về kết quả số  
                 toán chênh lệch    days = 14              học 2550.      
                 khi Days vượt rào                                        
                 an toàn hợp lệ (\>                                       
                 0).                                                      
  ----------------------------------------------------------------------------------

### UC-16: Tư vấn Dinh dưỡng Thông minh

#### \[A\] Kiểm thử Hộp đen cho FR_16.1: Bảng Quyết định kiểm chứng Boundary API

- **Mục tiêu kiểm thử (Test Objective):** Xác minh chức năng tự vệ phân
  mảnh rủi ro mạng và rủi ro truy vấn vi phạm từ khóa y tế từ phía hệ
  thống Client.

- **Ánh xạ yêu cầu:** Đảm nhận chốt chặn Test chức năng Guardrail của
  FR_16.1.

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Kỹ thuật **Bảng quyết định
  (Decision Table Technique)** và cô lập yếu tố phụ thuộc (Dependency
  Islands).

- **Phân tích ma trận trạng thái và Suy luận logic:**

  - **Nguyên nhân (Causes / Inputs):** (C1) Câu hỏi dính dáng y khoa lâm
    sàng? (Đúng=T, Sai=F). (C2) Kết nối máy chủ Server ổn định? (Đúng=T,
    Sai=F).

  - **Hậu quả (Effects / Expected):** (E1) Trả lời bình thường. (E2) Ẩn
    đi và Miễn trừ y tế. (E3) Hủy thao tác, báo lỗi Internet.

  - **Suy luận \"Ốc Đảo Phụ Thuộc\" tối ưu TC:** Về lý thuyết chúng ta
    cần Test tổ hợp sinh ra $2 \times 2 = 4$ luồng. Tuy nhiên nếu C2=F
    (Không có Internet), thì máy khách ngay lập tức báo Lỗi Offline (E3)
    bất kể nội dung câu hỏi C1 là gì. Chúng ta tiết kiệm được phép kết
    hợp vô nghĩa, rút lõi rủi ro về còn 3 Testcase thiết thực, chứng
    minh được trình độ kỹ thuật kiểm thử cắt giảm hiệu năng không thừa
    lặp.

**Bảng Testcase Blackbox:**

  ----------------------------------------------------------------------------
  **Mã TC**      **Kịch bản**     **Input Data**  **Expected Result **Trạng
                                                  (System + UI      thái**
                                                  behavior)**       
  -------------- ---------------- --------------- ----------------- ----------
  TC_BB_16.1.1   Kiểm tra tính    Khung           **UI:** Hiển thị  \[PASS\]
                 năng Chatbot khi Chat: Lượng đạm Box chứa kết quả  
                 người dùng đặt   của thịt        tư vấn như một    
                 câu hỏi về sinh  gà? (C1: F, C2: đoạn tin nhắn     
                 dưỡng, thực phẩm T)              bình thường.      
                 thông dụng.                                        

  TC_BB_16.1.2   Kiểm tra tính    Khung Chat: Đau **UI:** Khung     \[PASS\]
                 năng tự vệ khi   dạ dày thì kê   Chat trả lại một  
                 người dùng cố    thuốc gì? (C1:  đoạn tin nhắn     
                 tình hỏi chuyện  T, C2: T)       cảnh báo miễn trừ 
                 trị bệnh, tư vấn                 trách nhiệm y     
                 phòng khám.                      khoa.             

  TC_BB_16.1.3   Kiểm tra khả     Tắt mạng Wifi.  **UI:** Nháy đỏ   \[PASS\]
                 năng chống chịu  Bấm Gửi câu hỏi nút gửi, hiển thị 
                 giao diện khi    (C2: F)         thông báo \"Xin   
                 thiết bị di động                 vui lòng kiểm tra 
                 bị cắt mạng hoặc                 kết nối đường     
                 ngắt Wifi.                       truyền\".         
  ----------------------------------------------------------------------------

- 📝 **Test Summary:** Decision Table dễ lập sơ đồ phủ cả cờ ngắt API
  Guardrail y tế và cờ xử lý Catch Exception Error, tránh tình trạng
  Treo App.

#### Kiểm thử Hộp trắng cho Hàm xử lý FR_16.2: Thuật toán Parser Dữ liệu (AiService.stripMarkdown)

- **Mục tiêu kiểm thử (Test Objective):** Điều hướng thuật toán Regex
  phức hợp bóc tách rác AI.

- **Ánh xạ yêu cầu:** Phục vụ trực tiếp luồng quét khối của chức năng
  Sanitize cho FR_16.2.

- **Phương pháp áp dụng:** Kiểm thử Hộp trắng - **Độ Phức Tạp Cyclomatic
  (McCabe V(G))** quét qua luồng lệnh chuỗi lệnh gộp Pipeline tuần tự.

- **Kiểm soát biến số:** Không gán ép kiểu hay ràng buộc Data Length.
  Ném Input chuỗi ký hiệu trực tiếp để Sandbox môi trường RegEx.

- **Phân tích luồng (McCabe Analysis) & Biện luận Độ phủ Mã Lệnh
  (Statement Coverage):**

  - Chuỗi Parser thực thi tuần tự tuyến tính chuỗi 6 replace(). Mặc dù
    Regex là kỹ thuật rẽ nhánh phức tạp tại nhân vi xử lý hệ thống cấp
    thấp, đối với đồ thị luồng CFG của Engine, không có khối If/Else nào
    chia cắt.

  - Độ phức tạp $V(G) = 0 + 1 = 1$. Về mặt lý thuyết chỉ cần 1 Testcase
    là phủ 100% Statement Coverage. Tuy nhiên thực chiến cần 2 Testcase
    để chặn điều kiện sai số Regex (Biên trơn và Biên nhiễu).

- **Kiểm soát biến số (Test Data Control):** Truyền trực tiếp các hạt
  Text Input thuần ký tự.

- **Biện luận Kết quả mong đợi (Expected Result Derivation):** Áp dụng
  lý thuyết Tập hợp tự động (Automata Theory):

  - **Nhánh 1 (Văn bản sạch):** Các Token đầu vào không khớp mảng mã
    Regex Array. Đầu ra giữ trọn vẹn giá trị ban đầu. Ví dụ:
    Input \"Here is meal\" $\rightarrow$ Expected: \"Here is meal\".

  - **Nhánh 2 (Văn bản chứa cấu trúc phân tách Markdown):** Các cụm ký
    tự đặc biệt lọt vào phễu quy tắc và bị xóa/đổi. Bóc tách phân lớp:
    Quét và gỡ bỏ Header (#), Xóa nhúng cặp sao Bold (\*\*), Chuyển list
    item (-) thành (•), và xóa Italic (\_). Ví dụ tính từ hàm thay thế
    tuần tự: Input \"## \*\*Eat\*\* \\n - \_apple\_\" được LLM dọn dẹp
    biến thành Expected: \"Eat \\n\\n• apple\".

**Bảng Testcase Whitebox:**

  ------------------------------------------------------------------------------
  **Mã TC**      **Path (Logic Regex **Input         **Measurable     **Trạng
                 Thực thi)**         Variables**     Expected         thái**
                                                     Result**         
  -------------- ------------------- --------------- ---------------- ----------
  TC_WB_16.2.1   Kiểm tra quy trình  Input: \"Here   Hệ thống xuất ra \[PASS\]
                 Regex khi nội dung  is meal\"       chính xác chuỗi  
                 truyền tải là ký tự                 nguyên           
                 văn chữ thuần túy                   thủy: \"Here is  
                 (Không có dấu cấp                   meal\".          
                 độ cú pháp).                                         

  TC_WB_16.2.2   Kiểm tra toàn diện  Input: \"##     Hệ thống xuất ra \[PASS\]
                 chuỗi Regex khi     \*\*Eat\*\*     chuỗi đã         
                 chuỗi đầu vào bị    \\n -           Format: \"Eat    
                 gắn lồng nhiều lớp  \_apple\_\"     \\n\\n• apple\". 
                 cấu trúc Markdown                                    
                 hỗn hợp.                                             
  ------------------------------------------------------------------------------

### UC-17: Recalculate Recommendations

Kiểm thử FR_17.1: Điều kiện kích hoạt

**Điều kiện:** weightLogs.length ≥ 2 AND within 14 days (about 2 weeks)

  -------------------------------------------------------------------------------
  **Mã TC**      **Tên        **Dữ liệu đầu   **Kết quả mong đợi        **Trạng
                 Testcase**   vào (Input)**   (Expected Result)**       thái**
  -------------- ------------ --------------- ------------------------- ---------
  TC_WB_17.1.1   0 log        length=0        Không kích hoạt           PASS

  TC_WB_17.1.2   1 log        length=1        Không kích hoạt           PASS

  TC_WB_17.1.3   Đủ điều kiện 2 log trong 14  Gọi                       PASS
                              ngày            calculateAdaptiveTDEE()   

  TC_WB_17.1.4   Ngoài cửa sổ log cách \>14   Không kích hoạt           PASS
                              ngày                                      
  -------------------------------------------------------------------------------

Kiểm thử FR_17.2: Adaptive TDEE

**Công thức:**
$TDEE_{\left\{ adaptive \right\}} = \, Intake_{\left\{ avg \right\}} - \frac{\Delta W\, \times 7700}{Days}$

  --------------------------------------------------------------------------
  **Mã TC**       **Tên        **Dữ liệu    **Kết quả mong đợi **Trạng
                  Testcase**   đầu vào      (Expected          thái**
                               (Input)**    Result)**          
  --------------- ------------ ------------ ------------------ -------------
  TC_WB_17.2.1    Giảm cân     ΔW = -0.5    1875 kcal          PASS

  TC_WB_17.2.2    Không đổi    ΔW = 0       1600 kcal          PASS

  TC_WB_17.2.3    Tăng cân     ΔW = +0.7    1215 kcal          PASS
  --------------------------------------------------------------------------

**Kiểm thử FR_17.3: Plateau**

**Công thức:** $deficit = TDEEadaptive - Intake\ $

  -------------------------------------------------------------------------
  **Mã TC**      **Tên          **Dữ liệu đầu **Kết quả mong đợi  **Trạng
                 Testcase**     vào (Input)** (Expected Result)** thái**
  -------------- -------------- ------------- ------------------- ---------
  TC_BB_17.3.1   Không plateau  1600          deficit \> 100 →    PASS
                                              FALSE               

  TC_BB_17.3.2   Biên (=100)    1775          deficit ≤ 100 →     PASS
                                              TRUE                

  TC_BB_17.3.3   Plateau rõ     1825          deficit ≤ 100 →     PASS
                                              TRUE                

  TC_BB_17.3.4   Vượt biên      1774          deficit \> 100 →    PASS
                                              FALSE               
  -------------------------------------------------------------------------

### UC-18: Dự báo Điểm chững cân

#### Kiểm thử Hộp đen cho FR_18.1: Độ tin cậy dữ liệu phục vụ toán tử đầu vào

- **Mục tiêu kiểm thử (Test Objective):** Kiểm tra cơ chế ứng phó rủi ro
  hiển thị trên UI khi người dùng bỏ đói nhật ký ăn uống dẫn tới khuyết
  dữ liệu phân tích sinh lý.

- **Ánh xạ yêu cầu:** Đảm nhận chốt chặn Test chất lượng Data Validation
  đầu vào cho FR_18.1.

- **Phương pháp áp dụng:** Kiểm thử Hộp đen - Khớp vùng **Phân hoạch
  Tương đương (Equivalence Partitioning - EP)**.

- **Biện luận chia vùng dữ liệu & Suy luận Test:** Hành vi tương tác của
  User trên màn hình Nhật ký ăn uống (Intake Log) mang đặc thù có/không.
  EP chặt ra làm 2 luồng:

  - **Nhóm Hợp lệ:** Khai báo đầy đủ các bữa ăn lên UI ứng dụng (Có điểm
    dữ liệu Calo Intake \> 0). Trả mốc báo cáo thành công.

  - **Nhóm Khuyết thông tin:** Bỏ bề mặt App, không chịu ấn thêm bữa ăn
    (Vùng Calo Intake = 0). Bắt buộc bật Pop-up chặn tính toán. Tiết
    kiệm công sức kiểm thử các số âm vô nghĩa.

**Bảng Testcase Blackbox:**

  -----------------------------------------------------------------------------
  **Mã TC**      **Kịch bản**     **Input Data**   **Expected Result **Trạng
                                                   (System + UI      thái**
                                                   behavior)**       
  -------------- ---------------- ---------------- ----------------- ----------
  TC_BB_18.1.1   Kiểm thử tiến    Trên UI: Điền đủ **UI:** Hiển thị  \[PASS\]
                 trình báo cáo    bữa ăn trong     Box chứa kết quả  
                 khi người dùng   ngày. Trạng thái đánh giá Plateau  
                 đã nhập liệu đầy Calo báo         sinh lý thông     
                 đủ các món ăn    đạt 2000 kcal.   thường.           
                 (Sáng, Trưa,     Bấm phân tích                      
                 Chiều) trên màn  Chững cân.                         
                 hình app.                                           

  TC_BB_18.1.2   Kiểm thử khả     Trên UI: Không   **UI:** Bật cảnh  \[PASS\]
                 năng bắt lỗi     gõ món ăn nào    báo Pop-up \"Cần  
                 giao diện khi    vào màn hình     theo dõi và thêm  
                 người dùng quên  Điền Bữa. Tổng   bữa ăn đầy đủ để  
                 ấn chọn hoặc     thu nạp calo     hệ thống cấp lấy  
                 phớt lờ mục Thêm trên giao diện   được kết quả\".   
                 Nhật ký Dinh     bằng 0.                            
                 dưỡng hôm nay.                                      
  -----------------------------------------------------------------------------

#### Kiểm thử Hộp trắng cho Hàm xử lý FR_18.2: Hàm Toán học predictPlateau()

- **Mục tiêu kiểm thử & Phương pháp:** Đi sâu cấu trúc hệ phương trình
  xác định biên độ thu hẹp của lượng suy giảm thâm hụt năng lượng theo
  Threshold 100 kcal. Sử dụng **Bao phủ McCabe\'s Cyclomatic Complexity
  (V(G))**.

- **Phân tích luồng (McCabe Analysis):**

  - Sau khi vượt qua cổng an toàn đo Intake, Engine chạm tới điều kiện
    rẽ nhánh chốt: deficit \<= threshold.

  - Số liệu Test Cases cần đạt theo công thức
    McCabe: $V(G) = 1 + 1 = 2$. Hai Path đi vào mệnh đề Đúng hoặc Sai.

- **Kiểm soát biến số (Test Data Control):** Cố định hệ số
  trần $currentTDEE = 2500$ kcal. Khai báo hằng số Threshold mặc định
  của người dùng là $100$ kcal.

- **Biện luận Kết quả mong đợi (Expected Result Derivation):** Áp dụng
  toán học cơ bản: $Deficit = currentTDEE - dailyIntake$.

  - **Nhánh 1 (Lệch cực ngưỡng an toàn):** Với lượng Intake là $2000$,
    ta giải bài toán phân tích $Deficit = 2500 - 2000 = 500$ kcal. So
    sánh mệnh đề rẽ logic: $\because 500 > 100$ dẫn tới kết quả False
    (Đang ở trạng thái thâm hụt tốt, không bị
    Plateau). $\rightarrow Expected = false$.

  - **Nhánh 2 (Cán sát ranh giới Plateau):** Nếu User ăn tới $2450$, ta
    tính được $Deficit = 2500 - 2450 = 50$ kcal. Đánh giá luồng
    logic: $\because 50 \leq 100$ dẫn tới kết quả True (User đang tiến
    vào vùng cảnh báo Plateau). $\rightarrow Expected = true$.

**Bảng Testcase Whitebox:**

  -------------------------------------------------------------------------------
  **Mã TC**      **Path (Nhánh Thực  **Input         **Measurable      **Trạng
                 thi Logic)**        Variables**     Expected Result** thái**
  -------------- ------------------- --------------- ----------------- ----------
  TC_WB_18.2.1   Kiểm thử khi Calo   currentTDEE =   Hàm logic Return  \[PASS\]
                 nằm trong giới hạn  2500\           biến Flag         
                 cắt giảm an toàn    dailyIntake =   Boolean: False.   
                 (Độ Deficit lớn hơn 2000                              
                 Threshold 100).                                       

  TC_WB_18.2.2   Kiểm thử khi Calo   currentTDEE =   Hàm logic Return  \[PASS\]
                 đã xói mòn và chạm  2500\           biến Flag         
                 mức quá tải thâm    dailyIntake =   Boolean: True.    
                 hụt (Deficit tiệm   2450                              
                 cận hoặc nhỏ hơn                                      
                 Threshold).                                           
  -------------------------------------------------------------------------------

## Đánh giá Độ bao phủ và Tổng kết Chất lượng (Coverage & Quality Assurance)

- Dựa trên kết quả thực thi các kịch bản kiểm thử, nhóm Đảm bảo chất
  lượng (SQA) đưa ra kết luận sau:

  - Độ bao phủ Yêu cầu (Requirements Coverage): Đạt 100%

  - Đối chiếu với Ma trận dò vết (Chương 4), toàn bộ 100% Yêu cầu chức
    năng (FR) đều đã được ánh xạ thành công tới các Testcase Hộp đen.
    Phần mềm không bỏ sót bất kỳ tính năng nào so với cam kết ban đầu.

  - Độ bao phủ Mã lệnh (Path Coverage): Đạt 100% cho luồng lõi

  - Các hàm toán học quan trọng nhất đã được kiểm thử Hộp trắng dựa trên
    nguyên lý McCabe, đảm bảo mọi ngã rẽ if/else đều được máy tính chạy
    qua ít nhất 1 lần, không phát hiện \"code chết\" (dead code).

  - Mức độ sẵn sàng phát hành (Release Readiness):

  - Tỷ lệ Pass testcase đạt \[Ví dụ: 95%\]. Một số lỗi nhỏ ở khâu giao
    diện đã được ghi nhận vào biên bản rà soát để khắc phục ở chu kỳ
    UP/RUP tiếp theo. Hệ thống đủ điều kiện chất lượng để chuyển giao
    (Deploy).
