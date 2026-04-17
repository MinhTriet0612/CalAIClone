# Class UML Diagrams - Cal AI

All diagrams use [Mermaid](https://mermaid.js.org/) syntax and render on GitHub, GitLab, and most Markdown viewers.

---

## 1. Data Model (Prisma / Database)

```mermaid
classDiagram
    direction LR

    class User {
        +String id
        +String email
        +String password
        +String role
        +Int age
        +String gender
        +Float height
        +Float weight
        +String activityLevel
        +String goal
        +Float targetWeight
        +DateTime createdAt
        +DateTime updatedAt
    }

    class Meal {
        +String id
        +String userId
        +String name
        +String[] foodItems
        +Float calories
        +Float protein
        +Float carbs
        +Float fats
        +String imageUrl
        +Int healthScore
        +DateTime date
        +DateTime createdAt
        +DateTime updatedAt
    }

    class TargetPeriod {
        +String id
        +String userId
        +DateTime startDate
        +DateTime endDate
        +Int calories
        +Float protein
        +Float carbs
        +Float fats
        +String goal
        +DateTime createdAt
    }

    class WeightLog {
        +String id
        +String userId
        +Float rawWeight
        +Float trendWeight
        +DateTime createdAt
    }

    User "1" --> "*" Meal : meals
    User "1" --> "*" TargetPeriod : targetPeriods
    User "1" --> "*" WeightLog : weightLogs
```

---

## 2. Shared TypeScript Interfaces

```mermaid
classDiagram
    direction TB

    class MacroTargets {
        +number calories
        +number protein
        +number carbs
        +number fats
        +number estimatedDays
        +string projectedDate
    }

    class Meal {
        +string id
        +string userId
        +Date date
        +string name
        +string[] foodItems
        +number calories
        +number protein
        +number carbs
        +number fats
        +string imageUrl
        +number healthScore
        +Date createdAt
    }

    class MealAnalysis {
        +boolean isFood
        +string[] foodItems
        +number calories
        +number protein
        +number carbs
        +number fats
        +number healthScore
        +number confidence
        +string imageUrl
    }

    class DailySummary {
        +string date
        +MacroTargets targets
        +MacroTargets consumed
        +MacroTargets remaining
        +Meal[] meals
        +number healthScore
    }

    class UserProfile {
        +number age
        +string gender
        +number height
        +number weight
        +string activityLevel
        +string goal
        +number targetWeight
    }

    class ChatMessage {
        +string role
        +string content
    }

    DailySummary --> MacroTargets : targets
    DailySummary --> MacroTargets : consumed
    DailySummary --> MacroTargets : remaining
    DailySummary --> "*" Meal : meals
```

---

## 3. Backend Services (NestJS)

```mermaid
classDiagram
    direction TB

    class AppModule {
        <<Module>>
    }

    class PrismaService {
        +onModuleInit() void
        +onModuleDestroy() void
    }

    class AuthService {
        -PrismaService prisma
        -JwtService jwtService
        +register(dto: RegisterDto) Promise
        +login(dto: LoginDto) Promise
        +validateUserById(userId: string) Promise
        -getUserByEmail(email: string) Promise
        -validateUser(email: string, password: string) Promise
    }

    class AuthController {
        -AuthService authService
        +register(dto: RegisterDto) Promise
        +login(dto: LoginDto) Promise
        +verifyToken(user: UserPayload) Promise
    }

    class UsersService {
        -PrismaService prisma
        +createUser(email, password, role) Promise
        +getUserById(id: string) Promise
        +getUserByEmail(email: string) Promise
        +validateUser(email, password) Promise
        +updateUserProfile(userId, profile) Promise~void~
        +updateUserTargets(userId, targets, goal) Promise~void~
        +updateUserRole(userId, role) Promise~void~
        +getUserTargets(userId) Promise~MacroTargets~
    }

    class UsersController {
        -UsersService usersService
        +getCurrentUser(user) Promise
        +updateProfile(user, profile) Promise
        +updateTargets(user, targets) Promise
        +updateUserRole(body) Promise
    }

    class MealsService {
        -PrismaService prisma
        +getDailySummary(userId, date?) Promise~DailySummary~
        +getHistory(userId, startDate, endDate) Promise~DailySummary[]~
        -calculateHealthScore(meal) number
    }

    class MealsController {
        -MealsService mealsService
        -AiService aiService
        -ImageService imageService
        +getDailySummary(user, date?) Promise
        +analyzeMeal(file) Promise~MealAnalysis~
        +getTodayMeals(user) Promise
        +logMeal(user, dto) Promise
        +getHistory(user, startDate, endDate) Promise
    }

    class AiService {
        -GoogleGenerativeAI genAI
        -model any
        +analyzeMealImage(buffer, mimeType) Promise~MealAnalysis~
        +generateMeatCoachAdvice(prompt, history?, summary?) Promise~string~
        -stripMarkdown(text) string
        -formatClientContext(summary?) string
    }

    class ImageService {
        -string apiKey
        -string uploadUrl
        +uploadImage(buffer, filename?) Promise~string~
        +uploadImageFromBase64(base64, filename?) Promise~string~
    }

    class OnboardingService {
        +calculateRecommendations(data: OnboardingData) OnboardingRecommendations
        -calculateAge(birthDate) number
        -mapWorkoutsToActivityLevel(workouts) string
        -calculateBMR(weight, height, age, gender) number
        -calculateTDEE(bmr, activityLevel) number
        -adjustCaloriesForGoal(tdee, goal) number
        -calculateMacros(calories, weight, goal) object
    }

    class OnboardingController {
        -OnboardingService onboardingService
        -UsersService usersService
        -TargetPeriodsService targetPeriodsService
        +calculateRecommendations(data) Promise~MacroTargetsDto~
        +approveRecommendations(user, targets) Promise
    }

    class TargetPeriodsService {
        -PrismaService prisma
        +getTargetsForDate(userId, date) Promise~MacroTargets~
    }

    class ScientificService {
        +calculateEMA(rawCurrent, trendPrevious) number
        +calculateAdaptiveTDEE(meals, weights) number
        +predictPlateau(tdeeReal, tdeeInitial) boolean
        +getTrajectory(currentWeight, target, tdeeReal) TrajectoryPoint[]
    }

    class ChatMealSummaryService {
        -PrismaService prisma
        -TargetPeriodsService targetPeriodsService
        +getDailySummary(userId, date?) Promise~DailySummary~
        -findMealsByDate(userId, date) Promise~Meal[]~
    }

    class MetricsService {
        +Registry registry
        +Histogram httpRequestDuration
        +Counter httpRequestTotal
        +Counter httpRequestErrors
        +Counter mealsLogged
        +Counter mealAnalysisTotal
        +Histogram mealAnalysisDuration
        +Counter chatMessagesTotal
        +Gauge activeUsers
        +Counter authAttempts
        +Counter registrations
        +getMetrics() Promise~string~
        +getContentType() string
    }

    class MetricsController {
        -MetricsService metricsService
        +getMetrics(res) Promise
        +getHealth() object
        +getReadiness() object
    }

    %% Guards
    class JwtAuthGuard {
        -JwtService jwtService
        -ConfigService configService
        -PrismaService prisma
        +canActivate(context) Promise~boolean~
        -extractTokenFromHeader(request) string
    }

    class RolesGuard {
        -Reflector reflector
        +canActivate(context) boolean
    }

    %% Relationships
    AppModule ..> AuthController
    AppModule ..> UsersController
    AppModule ..> MealsController
    AppModule ..> OnboardingController
    AppModule ..> ChatController
    AppModule ..> MetricsController

    AuthController --> AuthService
    AuthService --> PrismaService
    AuthService --> JwtAuthGuard

    UsersController --> UsersService
    UsersService --> PrismaService

    MealsController --> MealsService
    MealsController --> AiService
    MealsController --> ImageService
    MealsService --> PrismaService
    MealsService --> DailyTargetsService

    OnboardingController --> OnboardingService
    OnboardingController --> UsersService
    OnboardingController --> TargetPeriodsService

    MealsService --> ScientificService
    OnboardingService --> ScientificService
    ChatMealSummaryService --> ScientificService

    TargetPeriodsService --> PrismaService

    ChatController --> AiService
    ChatController --> ChatMealSummaryService
    ChatMealSummaryService --> PrismaService
    ChatMealSummaryService --> TargetPeriodsService

    MetricsController --> MetricsService

    JwtAuthGuard --> PrismaService
    UsersController --> RolesGuard
```

---

## 4. Frontend Components (React)

```mermaid
classDiagram
    direction TB

    class App {
        +render() JSX
    }

    class AuthProvider {
        -User currentUser
        -boolean loading
        -string token
        +login(email, password) Promise~void~
        +signup(email, password) Promise~void~
        +logout() Promise~void~
        +render() JSX
    }

    class AppContent {
        -DailySummary dailySummary
        -MealAnalysis pendingMeal
        -File pendingFile
        -boolean analyzing
        -boolean loading
        -boolean needsOnboarding
        +checkOnboardingStatus() void
        +loadDailySummary() void
        +handleMealAnalyzed(analysis, file) void
        +handleReAnalyze() void
        +handleConfirmMeal() void
    }

    class Login {
        -string email
        -string password
        -boolean isSignup
        -string error
        -boolean loading
        +handleSubmit(e) void
    }

    class OnboardingFlow {
        -number step
        -boolean loading
        -string error
        -MacroTargets recommendations
        -OnboardingData formData
        +handleNext() void
        +handleApprove() void
    }

    class MacroTargetsCard {
        +MacroTargets targets
        +MacroTargets consumed
        +MacroTargets remaining
        +number healthScore
    }

    class MealsList {
        +Meal[] meals
    }

    class AddMealButton {
        +onMealAnalyzed callback
    }

    class MealAnalysisModal {
        +MealAnalysis meal
        +MacroTargets currentRemaining
        +onConfirm callback
        +onCancel callback
        +onReAnalyze callback
        +boolean analyzing
    }

    class MeatChat {
        -ChatMessage[] messages
        -string input
        -boolean loading
    }

    class History {
        -DailySummary[] history
        -boolean loading
        -string activeTab
        -number chartRange
    }

    class Settings {
        -boolean loading
        -boolean saving
        -MacroTargets currentTargets
        -MacroTargets recommendations
        -OnboardingData formData
        +onTargetsUpdated callback
    }

    %% Frontend Services
    class ApiService {
        +setAuthToken(token) void
    }
    class authApi {
        +register(email, password) Promise
        +login(email, password) Promise
        +verify() Promise
    }
    class mealsApi {
        +getDailySummary(date?) Promise~DailySummary~
        +analyzeMeal(file) Promise~MealAnalysis~
        +logMeal(data) Promise~DailySummary~
        +getHistory(start, end) Promise~DailySummary[]~
    }
    class onboardingApi {
        +calculateRecommendations(data) Promise~MacroTargets~
        +approveRecommendations(targets) Promise
    }
    class chatApi {
        +askMeatCoach(prompt, history) Promise
    }

    %% Component hierarchy
    App --> AuthProvider
    AuthProvider --> AppContent
    AppContent --> Login : if !currentUser
    AppContent --> OnboardingFlow : if needsOnboarding
    AppContent --> MacroTargetsCard : dashboard
    AppContent --> MealsList : dashboard
    AppContent --> History : dashboard
    AppContent --> AddMealButton : dashboard
    AppContent --> MealAnalysisModal : if pendingMeal
    AppContent --> MeatChat : /chat route
    AppContent --> Settings : /settings route

    %% Service usage
    Login ..> authApi
    OnboardingFlow ..> onboardingApi
    AppContent ..> mealsApi
    MeatChat ..> chatApi
    Settings ..> onboardingApi
    Settings ..> mealsApi
    AuthProvider ..> ApiService
```

---

## 5. Authentication & Guard Flow

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant JwtAuthGuard
    participant JwtService
    participant PrismaService
    participant RolesGuard

    Client->>Controller: HTTP Request (Bearer token)
    Controller->>JwtAuthGuard: canActivate()
    JwtAuthGuard->>JwtAuthGuard: extractTokenFromHeader()
    alt No token
        JwtAuthGuard-->>Client: 401 Unauthorized
    end
    JwtAuthGuard->>JwtService: verifyAsync(token, secret)
    alt Invalid token
        JwtAuthGuard-->>Client: 401 Unauthorized
    end
    JwtAuthGuard->>PrismaService: user.findUnique(payload.sub)
    alt User not found
        JwtAuthGuard-->>Client: 401 Unauthorized
    end
    JwtAuthGuard->>Controller: request.user = { id, email, role }

    opt Admin-only endpoints
        Controller->>RolesGuard: canActivate()
        RolesGuard->>RolesGuard: check user.role in requiredRoles
        alt Not admin
            RolesGuard-->>Client: 403 Forbidden
        end
    end

    Controller->>Controller: Execute handler
    Controller-->>Client: Response
```

---

## 6. Meal Analysis Flow

```mermaid
sequenceDiagram
    participant D as Người dùng
    participant Frontend
    participant MealsController
    participant AiService
    participant GeminiAI
    participant ImageService
    participant FreeImageHost

    D->>Frontend: Upload meal photo
    Frontend->>MealsController: POST /api/meals/analyze (multipart)
    MealsController->>AiService: analyzeMealImage(buffer, mime)
    AiService->>AiService: Convert to base64
    AiService->>GeminiAI: generateContent(prompt + image)
    GeminiAI-->>AiService: JSON response
    AiService->>AiService: Parse JSON, validate, clamp healthScore
    AiService-->>MealsController: MealAnalysis

    alt isFood = true
        MealsController->>ImageService: uploadImage(buffer, filename)
        ImageService->>FreeImageHost: POST upload
        FreeImageHost-->>ImageService: image URL
        ImageService-->>MealsController: imageUrl
        MealsController->>MealsController: analysis.imageUrl = url
    end

    MealsController-->>Frontend: MealAnalysis
    Frontend->>D: Show MealAnalysisModal

    D->>Frontend: Click Confirm
    Frontend->>MealsController: POST /api/meals/log
    MealsController-->>Frontend: Updated DailySummary
    Frontend->>D: Update dashboard
```
