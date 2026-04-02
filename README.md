# Cal AI - AI-Powered Calorie Tracker

A full-stack calorie tracking application. Users photograph meals, Google Gemini AI estimates nutrition, and the system tracks progress against personalised daily macro targets.

## Quick Start

```bash
# 1. Infrastructure (Database)
docker compose up -d           # Starts PostgreSQL on localhost:5432

# 2. Backend
cd backend
cp .env.example .env          # Add GOOGLE_AI_API_KEY
npm install
npx prisma migrate dev
npm run start:dev              # http://localhost:3001

# 3. Frontend
cd frontend
npm install
npm run dev                    # http://localhost:3000

# 3. Monitoring (optional)
cd monitoring
docker compose up -d           # Grafana :3002, Prometheus :9090, GlitchTip :8000
```

## Documentation

| Document | Description |
|----------|-------------|
| [Business Analysis](docs/BUSINESS_ANALYSIS.md) | Stakeholders, business rules, feature matrix, domain model, risks |
| [Use Cases](docs/USE_CASES.md) | 20 use cases with Mermaid diagrams, actor matrix |
| [Class UML](docs/CLASS_UML.md) | Data model, service classes, component hierarchy, sequence diagrams |
| [API Documentation](API_DOCUMENTATION.md) | Full REST API reference |
| [Quickstart](QUICKSTART.md) | Step-by-step setup guide |

## Architecture Overview

```
                    +-----------+
                    |  Browser  |
                    |  React 18 |
                    |  Vite     |
                    +-----+-----+
                          |
                     port 3000
                          |
                    +-----v-----+       +------------------+
                    |  NestJS   |------>| Google Gemini AI  |
                    |  Backend  |       +------------------+
                    +-----+-----+       +------------------+
                          |      ------>| freeimage.host    |
                     port 3001          +------------------+
                          |
                    +-----v-----+
                    | PostgreSQL|
                    |  (Prisma) |
                    +-----------+
```

## Project Structure

```
CalAIClone/
|
+-- backend/                        NestJS API server
|   +-- src/
|   |   +-- auth/                   JWT authentication, guards, decorators
|   |   +-- users/                  User CRUD, profile, macro targets
|   |   +-- meals/                  Meal logging, daily summary, history
|   |   +-- ai/                     Google Gemini integration (analysis + chat)
|   |   +-- image/                  Image upload to freeimage.host
|   |   +-- onboarding/             BMR/TDEE calculation, target recommendations
|   |   +-- daily-targets/          Per-day custom macro targets
|   |   +-- chat/                   AI nutrition coach ("Meat Chat")
|   |   +-- monitoring/             Prometheus metrics, health checks
|   |   +-- prisma/                 Database client service
|   |   +-- config/                 Environment config module
|   |   +-- app.module.ts           Root module
|   |   +-- main.ts                 Bootstrap (CORS, validation, Swagger)
|   +-- prisma/
|   |   +-- schema.prisma           Database schema (User, Meal, DailyTarget)
|   +-- package.json
|
+-- frontend/                       React SPA
|   +-- src/
|   |   +-- components/
|   |   |   +-- Login.tsx           Authentication form
|   |   |   +-- OnboardingFlow.tsx  6-step onboarding wizard
|   |   |   +-- MacroTargetsCard.tsx Progress bars for macros
|   |   |   +-- MealsList.tsx       Today's meal list
|   |   |   +-- AddMealButton.tsx   Camera/file upload trigger
|   |   |   +-- MealAnalysisModal.tsx AI analysis review modal
|   |   |   +-- MeatChat.tsx        AI nutrition coach chat
|   |   |   +-- History.tsx         History list + analytics charts
|   |   |   +-- Settings.tsx        Macro target management
|   |   +-- services/
|   |   |   +-- api.ts              Axios client (auth, meals, onboarding, chat)
|   |   +-- contexts/
|   |   |   +-- AuthContext.tsx      Auth state + JWT management
|   |   +-- monitoring/
|   |   |   +-- sentry.ts           Sentry/GlitchTip error tracking
|   |   +-- App.tsx                 Router, dashboard, layout
|   |   +-- main.tsx                React entry point
|   +-- package.json
|
+-- shared/                         Shared TypeScript interfaces
|   +-- types.ts                    Meal, MealAnalysis, MacroTargets, DailySummary, etc.
|
+-- tests/                          All tests (separated by scope)
|   +-- backend_tests/unit/         8 Jest test suites (63 tests)
|   +-- frontend_tests/             Vitest + React Testing Library
|   |   +-- unit/                   API service tests
|   |   +-- components/             Login, MacroTargetsCard tests
|   +-- e2e_tests/                  6 Playwright specs
|   |   +-- specs/                  auth, onboarding, dashboard, meals, chat, settings
|   +-- README.md                   How to run tests
|
+-- monitoring/                     Observability stack
|   +-- docker-compose.yml          Prometheus + Grafana + GlitchTip
|   +-- prometheus/                 Scrape config + alert rules
|   +-- grafana/                    Dashboards + data source provisioning
|
+-- docs/                           Analysis & design documents
    +-- BUSINESS_ANALYSIS.md        Business rules, domain model, risks
    +-- USE_CASES.md                20 use cases with Mermaid diagrams
    +-- CLASS_UML.md                Class diagrams + sequence diagrams
```

## How to Approach the Source

### If you are new to this codebase

1. **Start with the docs** -- Read [Business Analysis](docs/BUSINESS_ANALYSIS.md) for the "why", then [Use Cases](docs/USE_CASES.md) for the "what".

2. **Understand the data model** -- Open `backend/prisma/schema.prisma`. There are only 3 tables: `User`, `Meal`, `DailyTarget`. Everything flows from these.

3. **Trace a request end-to-end** -- Pick the meal logging flow:
   - Frontend: `AddMealButton.tsx` -> `api.ts:mealsApi.analyzeMeal()` -> `MealAnalysisModal.tsx` -> `api.ts:mealsApi.logMeal()`
   - Backend: `MealsController.analyzeMeal()` -> `AiService.analyzeMealImage()` -> `MealsController.logMeal()` -> `MealsService.create()` + `getDailySummary()`

4. **Check the class diagrams** -- [Class UML](docs/CLASS_UML.md) shows every service, its dependencies, and the sequence of calls.

### Key entry points

| What | Where |
|------|-------|
| Backend bootstrap | `backend/src/main.ts` |
| All backend routes | `backend/src/*/*.controller.ts` |
| Business logic | `backend/src/*/*.service.ts` |
| Database schema | `backend/prisma/schema.prisma` |
| Frontend entry | `frontend/src/main.tsx` -> `App.tsx` |
| API client | `frontend/src/services/api.ts` |
| Auth state | `frontend/src/contexts/AuthContext.tsx` |
| Shared types | `shared/types.ts` |
| Swagger docs | http://localhost:3001/api-docs (when running) |

### Module dependency order (read bottom-up)

```
Prisma -> Users -> DailyTargets -> Meals -> Chat
                                         -> Onboarding
Auth (independent, used as guard by all controllers)
AI (independent, used by Meals + Chat)
Image (independent, used by Meals)
Monitoring (independent, global middleware)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Material-UI, Axios |
| Backend | NestJS 11, TypeScript, Prisma ORM |
| Database | PostgreSQL |
| AI | Google Gemini 2.0 Flash Lite |
| Auth | JWT (bcrypt password hashing) |
| Monitoring | Prometheus + Grafana (backend), Sentry/GlitchTip (frontend) |
| Testing | Jest (backend), Vitest (frontend), Playwright (E2E) |
| API Docs | Swagger/OpenAPI at `/api-docs` |

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/calai
JWT_SECRET=your-jwt-secret
GOOGLE_AI_API_KEY=your-gemini-api-key
FREEIMAGE_API_KEY=your-freeimage-key    # optional, has default
PORT=3001                                # optional, defaults to 3001
```

### Frontend (`frontend/.env`)

```env
VITE_SENTRY_DSN=https://key@glitchtip.yourdomain.com/1   # optional
VITE_ENVIRONMENT=production                                # optional
```

## Running Tests

```bash
# Backend unit tests (63 tests)
cd backend && npx jest --config ../tests/backend_tests/jest.config.js

# Frontend unit tests
cd tests/frontend_tests && npm install && npm test

# E2E tests (requires both servers running)
cd tests/e2e_tests && npm install && npx playwright install && npm test
```

## License

MIT
