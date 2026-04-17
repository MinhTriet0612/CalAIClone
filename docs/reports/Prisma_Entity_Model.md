# Lược đồ Lớp Thực thể (Prisma Entity Class Diagram)

Đây là bản thiết kế Lược đồ Lớp (Class Diagram) chuẩn PlantUML phản chiếu chính xác 100% cấu trúc cơ sở dữ liệu từ Prisma Schema. Sơ đồ này đóng vai trò là Lõi Dữ Liệu (Core Domain Model) quy chuẩn cho toàn bộ hệ thống Cal AI. Các Lược đồ Tuần tự (Sequence Diagram) ở các Use Case (UC-14, UC-15, UC-16, UC-18) sẽ tái sử dụng và refer trực tiếp đến các `<<Entity>>` này.

```plantuml
@startuml
skinparam style strictuml
skinparam roundcorner 5
skinparam classAttributeIconSize 0

' ==========================================
' Định nghĩa các Thực thể Cốt lõi (Entities)
' ==========================================

class User <<Entity>> {
    + id: String [PK]
    + email: String [Unique]
    + password: String
    + createdAt: DateTime
    + updatedAt: DateTime
}

class Profile <<Entity>> {
    + id: String [PK]
    + userId: String [FK] [Unique]
    + age: Int?
    + birthDate: DateTime?
    + gender: String?
    + height: Float?
    + weight: Float?
    + activityLevel: String?
    + workoutsPerWeek: Int?
    + goal: String?
    + targetWeight: Float?
    + createdAt: DateTime
    + updatedAt: DateTime
}

class TargetPeriod <<Entity>> {
    + id: String [PK]
    + profileId: String [FK]
    + startDate: DateTime
    + endDate: DateTime?
    + calories: Int
    + protein: Float
    + carbs: Float
    + fats: Float
    + goal: String?
    + createdAt: DateTime
}

class Meal <<Entity>> {
    + id: String [PK]
    + profileId: String [FK]
    + name: String
    + foodItems: String[]
    + calories: Float
    + protein: Float
    + carbs: Float
    + fats: Float
    + imageUrl: String?
    + healthScore: Int?
    + date: DateTime
    + createdAt: DateTime
    + updatedAt: DateTime
}

class WeightLog <<Entity>> {
    + id: String [PK]
    + profileId: String [FK]
    + rawWeight: Float
    + trendWeight: Float
    + createdAt: DateTime
}

' ==========================================
' Mối quan hệ giữa các Thực thể (Relations)
' ==========================================

User "1" -- "1" Profile : Mapped via userId
Profile "1" *-- "0..*" Meal : Contains
Profile "1" *-- "0..*" TargetPeriod : Contains
Profile "1" *-- "0..*" WeightLog : Contains

@enduml
```

### Chú thích Kiến trúc SQA
- **Ranh giới (Boundary):** Bất kỳ truy xuất nào từ Tầng Điều khiển (`Controller`/`Service`) trong các Sequenece Diagram đều bắt buộc mapping chuẩn xác vào các trường Dữ liệu (Attributes) đã khai báo ở trên.
- **Tính toàn vẹn (Integrity):** Quan hệ 1-Niec (`1-to-Many`) được ứng dụng từ `Profile` phân tán dữ liệu đến `Meal`, `TargetPeriod` và `WeightLog` cho phép truy vết dòng chảy logic, chống thất thoát dữ liệu trong quá trình V&V.
