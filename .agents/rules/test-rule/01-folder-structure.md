# 01. CẤU TRÚC THƯ MỤC & PHÂN LOẠI TEST

```
backend/
├── src/
│   ├── scientific/
│   │   └── scientific.service.spec.ts   ← Unit Test (TC_WB_)
│   ├── meals/
│   │   └── meals.service.spec.ts         ← Unit Test (TC_WB_)
│   └── onboarding/
│       └── onboarding.service.spec.ts    ← Unit Test (TC_WB_)
├── test/
│   ├── helpers/
│   │   └── db-teardown.ts               ← Dọn DB giữa các E2E test
│   ├── meals.e2e-spec.ts             ← Supertest API test
│   ├── weight-logs.e2e-spec.ts       ← Supertest API test
│   └── jest-e2e.json                ← Jest config cho E2E

frontend/
└── e2e/                              ← Playwright (TC_BB_ UI)
    ├── playwright.config.ts
    ├── weight-log.spec.ts            ← TC_BB_14.1.x (nhập cân nặng)
    └── onboarding.spec.ts            ← TC_BB_05.x (form đăng ký)
```

---

## PHÂN LOẠI TEST — ÁNH XẠ THEO BÁO CÁO

| Ký hiệu báo cáo | Tool viết test | Vị trí file | Lệnh chạy |
|---|---|---|---|
| `TC_WB_` (Hộp trắng) | **Jest** | `backend/src/**/*.spec.ts` | `npm test` |
| `TC_BB_` (Hộp đen) | **Playwright** | `frontend/e2e/**/*.spec.ts` | `yarn test:e2e` |

**KHÔNG dùng Supertest để implement `TC_BB_`** — báo cáo mô tả TC_BB theo góc nhìn UI ("Gõ vào TextBox", "Bấm nút", "UI hiển thị...").
