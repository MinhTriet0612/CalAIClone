# CalAI Tests

## Directory Structure

```
tests/
├── backend_tests/        # Backend unit tests (Jest + NestJS Testing)
│   ├── unit/             # Service-level unit tests
│   │   ├── auth.service.spec.ts
│   │   ├── meals.service.spec.ts
│   │   ├── users.service.spec.ts
│   │   ├── onboarding.service.spec.ts
│   │   ├── daily-targets.service.spec.ts
│   │   ├── ai.service.spec.ts
│   │   ├── image.service.spec.ts
│   │   └── jwt-auth.guard.spec.ts
│   ├── jest.config.ts
│   └── tsconfig.json
│
├── frontend_tests/       # Frontend unit tests (Vitest + React Testing Library)
│   ├── unit/             # Service/utility tests
│   │   └── api.service.test.ts
│   ├── components/       # Component tests
│   │   ├── Login.test.tsx
│   │   └── MacroTargetsCard.test.tsx
│   ├── vitest.config.ts
│   ├── setup.ts
│   └── package.json
│
├── e2e_tests/            # End-to-end tests (Playwright)
│   ├── specs/            # Test specifications
│   │   ├── auth.spec.ts
│   │   ├── onboarding.spec.ts
│   │   ├── dashboard.spec.ts
│   │   ├── meals.spec.ts
│   │   ├── chat.spec.ts
│   │   └── settings.spec.ts
│   ├── fixtures/
│   ├── playwright.config.ts
│   └── package.json
│
└── README.md
```

## Running Tests

### Backend Unit Tests

```bash
cd backend
npx jest --config ../tests/backend_tests/jest.config.ts
# Or with coverage:
npx jest --config ../tests/backend_tests/jest.config.ts --coverage
```

### Frontend Unit Tests

```bash
cd tests/frontend_tests
npm install
npm test
# With coverage:
npm run test:coverage
```

### E2E Tests

```bash
cd tests/e2e_tests
npm install
npx playwright install
npm test
# Headed mode (see browser):
npm run test:headed
# Interactive UI:
npm run test:ui
```

## Monitoring

See `monitoring/` directory for Grafana + Prometheus + GlitchTip setup.

```bash
cd monitoring
docker compose up -d
```

- Grafana: http://localhost:3002 (admin/admin)
- Prometheus: http://localhost:9090
- GlitchTip: http://localhost:8000
