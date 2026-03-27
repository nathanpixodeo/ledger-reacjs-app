# KeToan SaaS - ReactJS Frontend Implementation Plan

## Context

This is a SaaS accounting application for revenue & profit analysis. The repo is currently empty — we need to scaffold the entire React frontend from scratch. The API (Laravel 11) lives in a separate repo, so we'll use MSW (Mock Service Worker) for development until the API is ready.

**Tech Stack:** React 18 + Vite, Ant Design 5, Recharts, Axios, Zustand, TanStack React Query, MSW v2

---

## Architecture Decisions

| Decision | Choice | Why |
|---|---|---|
| Two apps (Admin + Tenant) | Single Vite project, two HTML entry points | 80%+ shared code, simpler build pipeline |
| Subdomain routing | `useSubdomain` hook + Axios `X-Tenant` header | Clean separation, dev fallback via `?tenant=slug` |
| Server state | React Query exclusively | Caching, dedup, background refresh built-in |
| Client state | Zustand (auth + UI only) | Lightweight, no boilerplate, persist middleware for auth |
| Mock strategy | MSW v2 | Network-level interception, zero code changes when switching to real API |
| Charts | Recharts + ResponsiveContainer | Declarative, good React integration |
| Form calculations | Ant Form `onValuesChange` + display-only fields | Gross profit & margin % computed live, also computed server-side |

---

## Directory Structure

```
src/
  apps/           AdminApp.jsx, TenantApp.jsx (root components + routers)
  api/            axios.js, auth.js, revenue.js, export.js, tenants.js, settings.js, import.js
  store/          authStore.js, revenueStore.js (UI filters only), uiStore.js
  hooks/          useAuth, useRevenue, useExport, useTenant, useSubdomain, usePlan
  pages/
    auth/         LoginPage, ForgotPasswordPage
    dashboard/    DashboardPage (KPI cards + charts + summary table)
    revenue/      RevenueListPage, RevenueFormPage
    export/       ExportPage
    import/       ImportPage
    settings/     CompanySettingsPage
    admin/        TenantListPage, TenantDetailPage
    audit/        AuditLogPage
    landing/      LandingPage, PricingPage
  components/
    charts/       RevenueBarChart, MarginLineChart, KpiCard
    layout/       AppLayout, AdminLayout, Sidebar, ProtectedRoute, TenantRoute
    common/       PageHeader, LoadingScreen, ErrorBoundary
    revenue/      RevenueTable, RevenueFormModal
    import/       ImportPreviewTable
  utils/          formatCurrency, formatPercent, dateHelper, subdomainHelper
  constants/      menuConfig, planFeatures, apiEndpoints, revenueColumns
  mocks/          handlers.js, browser.js, data/ (JSON seed data)
  styles/         theme.js, global.css
index.html        Tenant entry
admin.html        Admin entry
```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-3)

#### Step 1 - Project Init
- [ ] Initialize Vite + React 18 project
- [ ] Install deps: antd, @ant-design/icons, recharts, zustand, @tanstack/react-query, axios, react-router-dom, msw, html2canvas, file-saver, xlsx
- [ ] Configure `vite.config.js` (multi-page input, API proxy)
- [ ] Create folder skeleton
- [ ] Set up Ant Design 5 theme (`ConfigProvider` + theme tokens)
- [ ] Set up MSW with basic handlers
- [ ] Add `.env.development` with `VITE_API_BASE_URL`, `VITE_APP_DOMAIN`, `VITE_USE_MOCKS=true`

#### Step 2 - Auth Flow
- [ ] `src/api/axios.js` — Axios instance factory with tenant slug, auth token interceptor, 401 handler
- [ ] `src/store/authStore.js` — Zustand + persist: user, token, isAuthenticated, setAuth, clearAuth
- [ ] `src/api/auth.js` — login(), logout(), me(), forgotPassword()
- [ ] `src/hooks/useAuth.js` — React Query mutations wrapping auth API
- [ ] `src/pages/auth/LoginPage.jsx` — Ant Form, Vietnamese labels
- [ ] `src/pages/auth/ForgotPasswordPage.jsx`
- [ ] `src/components/layout/ProtectedRoute.jsx`

#### Step 3 - Layout Shell
- [ ] `src/components/layout/AppLayout.jsx` — Ant Layout + Sider + Header + Outlet
- [ ] `src/components/layout/Sidebar.jsx` — Ant Menu from menuConfig
- [ ] `src/constants/menuConfig.js`
- [ ] `src/apps/TenantApp.jsx` — React Router with all tenant routes
- [ ] `src/hooks/useSubdomain.js` — Extract tenant slug from hostname

#### Step 4 - Revenue CRUD
- [ ] `src/api/revenue.js` — getRevenues, createRevenue, updateRevenue, deleteRevenue
- [ ] `src/hooks/useRevenue.js` — React Query hooks (useRevenues, useCreateRevenue, etc.)
- [ ] `src/pages/revenue/RevenueListPage.jsx` — Ant Table, year selector, actions
- [ ] `src/components/revenue/RevenueFormModal.jsx` — Ant Modal + Form, live gross profit/margin calc
- [ ] MSW handlers for revenue endpoints + seed data

#### Step 5 - Dashboard
- [ ] `src/pages/dashboard/DashboardPage.jsx` — Year selector + KPI row + charts + summary table
- [ ] `src/components/charts/KpiCard.jsx` — Ant Card + Statistic
- [ ] `src/components/charts/RevenueBarChart.jsx` — Recharts BarChart (revenue vs COGS)
- [ ] `src/components/charts/MarginLineChart.jsx` — Recharts LineChart (margin %)
- [ ] `src/utils/formatCurrency.js` — Intl.NumberFormat vi-VN VND
- [ ] `src/utils/formatPercent.js`

#### Step 6 - Export
- [ ] `src/pages/export/ExportPage.jsx` — Year selector, Excel + PDF buttons
- [ ] `src/hooks/useExport.js` — Download triggers using file-saver
- [ ] `src/api/export.js` — downloadExcel, downloadPdf (blob responses)
- [ ] `src/utils/exportHelper.js` — html2canvas for chart screenshots

### Phase 2: Enhancement (Weeks 4-5)

#### Step 7 - Admin Portal
- [ ] `admin.html` entry point
- [ ] `src/apps/AdminApp.jsx` — Admin router + AdminLayout
- [ ] `src/components/layout/AdminLayout.jsx`
- [ ] `src/pages/admin/TenantListPage.jsx` — Ant Table with CRUD actions
- [ ] `src/pages/admin/TenantDetailPage.jsx`
- [ ] `src/api/tenants.js` + `src/hooks/useTenant.js`

#### Step 8 - Excel Import
- [ ] `src/pages/import/ImportPage.jsx` — Upload.Dragger + preview + confirm
- [ ] `src/components/import/ImportPreviewTable.jsx` — Editable preview with validation
- [ ] `src/api/import.js`

#### Step 9 - Company Settings
- [ ] `src/pages/settings/CompanySettingsPage.jsx` — Form + logo upload
- [ ] `src/api/settings.js`

#### Step 10 - Responsive + Audit
- [ ] Responsive sidebar (Drawer on mobile), responsive grid for KPI cards
- [ ] `src/pages/audit/AuditLogPage.jsx`

### Phase 3: DevOps & Security (Weeks 6-7)

- [ ] Production Vite config (code splitting, no source maps)
- [ ] Dockerfile (Nginx static hosting + subdomain routing)
- [ ] GitHub Actions CI/CD (lint, build, deploy)
- [ ] CSP headers, sanitization, 429 retry-after handling

### Phase 4: SaaS Business Layer (Weeks 8-10)

- [ ] `src/pages/landing/LandingPage.jsx` — Public marketing page
- [ ] `src/pages/landing/PricingPage.jsx` — Plan comparison cards
- [ ] Payment integration UI (VNPay/MoMo redirect flow)
- [ ] Multi-user management page
- [ ] Email notification preferences

---

## Key Technical Patterns

**Axios Instance Factory** (`src/api/axios.js`):
- Factory function `createApiClient(tenantSlug?)` — not a singleton
- Injects `X-Tenant` header, Bearer token from authStore
- `withCredentials: true` for Sanctum cookies
- 401 interceptor clears auth + redirects to /login

**React Query + Zustand Split**:
- React Query: ALL server data (revenues, tenants, user profile)
- Zustand: auth state (persisted), UI state (sidebar, filters)
- Revenue data is NEVER in Zustand — lives in React Query cache

**MSW for Development**:
- `src/mocks/handlers.js` defines all API handlers
- Started conditionally when `VITE_USE_MOCKS=true`
- Handlers serve as API contract documentation

---

## Verification

1. `npm run dev` — App starts, login page renders at localhost
2. MSW intercepts — Login works with mock credentials, dashboard shows mock data
3. Revenue CRUD — Create/edit/delete entries, table updates
4. Charts render — Bar chart + line chart display correctly with mock data
5. Export — Excel/PDF download triggers work
6. Routing — `/login`, `/`, `/revenue`, `/export` all resolve correctly
7. Auth guard — Unauthenticated users redirected to `/login`
8. `npm run build` — Production build succeeds with no errors
