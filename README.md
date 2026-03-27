# KeToan SaaS - Frontend

Phần mềm kế toán SaaS phân tích doanh thu & lợi nhuận. Đây là repo ReactJS frontend, API nằm ở repo riêng.

## Tech Stack

- **React 18** + **Vite** — Build tool & dev server
- **Ant Design 5** — UI component library (Vietnamese locale)
- **Recharts** — Charts (bar, line)
- **Zustand** — Client state (auth, UI)
- **TanStack React Query** — Server state & caching
- **Axios** — HTTP client with interceptors
- **MSW v2** — Mock Service Worker for API mocking
- **React Router v6** — Routing

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Demo Credentials

- **Tenant app**: `admin@demo.com` / `password`
- **Admin portal**: `superadmin@ketoan.vn` / `password`

## Project Structure

```
src/
  apps/           TenantApp, AdminApp (root components + routers)
  api/            Axios instance factory, API modules
  store/          Zustand stores (auth, revenue filters, UI)
  hooks/          Custom hooks (useAuth, useRevenue, useExport, etc.)
  pages/          Page components organized by feature
  components/     Reusable UI components (layout, charts, forms)
  utils/          Formatters (currency, percent, date)
  constants/      Menu config, plan features, API endpoints
  mocks/          MSW handlers + seed data
  styles/         Ant Design theme + global CSS
```

## Architecture

- **Two apps** in one Vite project: Tenant (`index.html`) and Admin (`admin.html`)
- **Multi-tenancy** via subdomain routing + `X-Tenant` header
- **Mock-first development**: MSW intercepts all API calls when `VITE_USE_MOCKS=true`
- **State split**: React Query for server data, Zustand for auth/UI only

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000/api` |
| `VITE_APP_DOMAIN` | App domain for subdomain parsing | `localhost` |
| `VITE_ADMIN_SUBDOMAIN` | Admin subdomain prefix | `admin` |
| `VITE_USE_MOCKS` | Enable MSW mock API | `true` |

## Implementation Status

- [x] Phase 1: Foundation (Auth, Dashboard, Revenue CRUD, Export, Charts)
- [ ] Phase 2: Admin portal enhancement, Excel import, Company settings
- [ ] Phase 3: DevOps & Security (Docker, CI/CD, CSP)
- [ ] Phase 4: SaaS Business Layer (Landing, Pricing, Payment)

See [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) for the full roadmap.
