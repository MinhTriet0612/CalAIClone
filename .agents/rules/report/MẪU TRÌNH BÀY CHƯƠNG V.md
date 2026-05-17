---
trigger: always_on
---

### **MẪU TRÌNH BÀY CHƯƠNG V**

**5.2. Đặc tả Kịch bản Kiểm thử chi tiết**

#### **5.2.1. Cụm chức năng: Thiết lập Hồ sơ (Do SV Triết phụ trách)**

**\[A\] Kiểm thử cho Yêu cầu FR\_05.1: Nhập cân nặng người dùng**

* **Mục tiêu kiểm thử (Test Objective):** Xác minh hệ thống xử lý đúng các giá trị cân nặng hợp lệ và từ chối giá trị ngoài phạm vi cho phép ở cả tầng Frontend và tầng Database.  
* **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR\_05.1 (Chi tiết kỹ thuật xem tại Ma trận dò vết Chương 4).  
* **Phương pháp áp dụng:** Kiểm thử Hộp đen \- Phân tích giá trị biên (Quy định: $30kg \\le Cân nặng \\le 200kg$).  
* **Phân tích miền dữ liệu:** Tập kiểm thử bao phủ 5 mốc giá trị: 29 (Dưới Min), 30 (Min), 60 (Nominal), 200 (Max), 201 (Vượt Max).

**Bảng Test Case cho FR\_05.1:**

| Mã TC | Kịch bản kiểm thử | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Result) | Trạng thái |
| :---- | :---- | :---- | :---- | :---- |
| TC\_BB\_05.1.1 | Test giá trị biên dưới (Nhỏ hơn Min) | Nhập: 29 | **UI:** Hiển thị thông báo "Cân nặng tối thiểu 30kg". | \[PASS\] |
| TC\_BB\_05.1.2 | Test giá trị biên dưới (Bằng Min) | Nhập: 30 | **UI:** Chuyển hướng Dashboard. | \[PASS\] |
| TC\_BB\_05.1.3 | Test giá trị bình thường (Nominal) | Nhập: 60 | **UI:** Chuyển hướng Dashboard. | \[PASS\] |
| TC\_BB\_05.1.4 | Test giá trị biên trên (Bằng Max) | Nhập: 200 | **UI:** Chuyển hướng Dashboard. | \[PASS\] |
| TC\_BB\_05.1.5 | Test giá trị vượt biên (Lớn hơn Max) | Nhập: 201 | **UI:** Hiển thị thông báo "Vượt giới hạn 200kg". | \[PASS\] |

* 📝 **Tổng kết kiểm thử (Test Summary):** Luồng kiểm soát dữ liệu đầu vào hoạt động ổn định, đạt tỷ lệ Pass 5/5. Hệ thống đã chặn đứng hoàn toàn các giá trị rác ở vùng biên, đảm bảo tính toàn vẹn dữ liệu (Data Integrity) trước khi đưa vào các thuật toán tính toán sâu hơn.

---

**\[B\] Kiểm thử cho Yêu cầu FR\_05.2: Tính toán chỉ số TDEE**

* **Mục tiêu kiểm thử (Test Objective):** Xác minh thuật toán backend nhân chính xác hệ số vận động (PAL) với chỉ số BMR tĩnh, đảm bảo tính đúng đắn trên toàn bộ các rẽ nhánh logic.  
* **Ánh xạ yêu cầu:** Phục vụ trực tiếp cho FR\_05.2.  
* **Phương pháp áp dụng:** Kiểm thử Hộp trắng \- Bao phủ nhánh theo Nguyên lý McCabe.  
* **Kiểm soát biến số (Test Data Control):** Cố định đầu vào hệ số nền BMR \= 1500 kcal cho mọi kịch bản. Việc cố định này giúp cô lập logic nhân hệ số PAL, đảm bảo kết quả đầu ra chỉ phụ thuộc vào nhánh luồng đang được test, đáp ứng tính khoa học và nhất quán.  
* **Phân tích luồng (Path Analysis):**  
  * *(Chèn đồ thị luồng CFG tính McCabe tại đây)*  
  * Độ phức tạp Cyclomatic $V(G) \= 3$. Do đó, tối thiểu **3 test case** là đủ để bao phủ 100% luồng điều khiển của hàm này.

**Bảng Test Case cho FR\_05.2:**

| Mã TC | Luồng bao phủ (Path) | Dữ liệu kiểm thử (Input Variables) | Kết quả mong đợi (Measurable Expected Return) | Trạng thái |
| :---- | :---- | :---- | :---- | :---- |
| TC\_WB\_05.2.1 | Nhánh 1: Vận động Ít | Mức độ \= 1 (Ít). BMR \= 1500\. | **Hệ thống:** Hàm trả về giá trị số học 1500 \* 1.2 \= 1800 (kcal). | \[PASS\] |
| TC\_WB\_05.2.2 | Nhánh 2: Vận động Vừa | Mức độ \= 2 (Vừa). BMR \= 1500\. | **Hệ thống:** Hàm trả về giá trị số học 1500 \* 1.55 \= 2325 (kcal). | \[PASS\] |
| TC\_WB\_05.2.3 | Nhánh 3: Vận động Nhiều | Mức độ \= 3 (Nhiều). BMR \= 1500\. | **Hệ thống:** Hàm trả về giá trị số học 1500 \* 1.9 \= 2850 (kcal). | **\[FAIL\]** |

* 📝 **Tổng kết kiểm thử (Test Summary):** Thông qua việc ép thuật toán chạy qua đủ 3 nhánh độc lập, kịch bản Hộp trắng đã phát hiện lỗi sai số nghiêm trọng tại Nhánh 3 (TC\_WB\_05.2.3). Kết quả thực tế hệ thống trả về 2550 (do lỗi Dev gõ nhầm hệ số 1.7 thay vì 1.9 trong source code). Lỗi đã được ghi log và chuyển lại cho đội ngũ Lập trình khắc phục (Bug Tracking).