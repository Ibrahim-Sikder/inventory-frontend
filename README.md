# Mini ERP – Inventory & Sales Management System (Frontend)

Frontend client for the Mini ERP Inventory & Sales Management System, built for the **MERN Stack Technical Assessment** (Full Stack MERN Developer position).

This repository contains the **frontend only**. It's a React 19 + TypeScript SPA built with Vite, styled with Tailwind CSS, using Redux Toolkit for state/data management, React Router for navigation, and Axios for API calls.

---

## 🔗 Live Links

| Resource | URL |
|---|---|
| Live Frontend | `https://erp.softypy.com/sales` |
| Live Backend API | `https://erpapi.softypy.com/sales/api/v1` |
| Frontend GitHub Repository | `https://github.com/Ibrahim-Sikder/inventory-frontend` |
| Backend GitHub Repository | `https://github.com/Ibrahim-Sikder/inventory-api` |

## 🔑 Admin Login Credentials

| Field | Value |
|---|---|
| Email | `admin@gmail.com` |
| Password | `123456` |
| Role | `admin` |

> ⚠️ These are demo credentials provided solely for evaluation purposes.

---

## 🧱 Tech Stack

- **Library:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **State & Data:** Redux Toolkit + React Redux (RTK Query for API calls, backed by a custom Axios base query)
- **HTTP Client:** Axios (with interceptors for silent access-token refresh on 401)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Icons:** lucide-react
- **Notifications / Alerts:** react-hot-toast, sweetalert2
- **Dates:** date-fns

---

## ✨ Features

### Authentication
- Login page that authenticates against the backend `/auth/login` endpoint
- Access/refresh tokens handled via HTTP-only cookies set by the backend
- Axios response interceptor triggers `/auth/refresh-token` on a `401` and retries the original request
- `ProtectedRoute` wrapper redirects unauthenticated users to `/login`
- Role-aware UI: navigation and actions are shown/hidden based on the logged-in user's role (`admin`, `manager`, `employee`)

### Dashboard
- Statistics cards: Total Products, Total Sales, Low Stock Products
- Low Stock Products list (stock < 5)

### Products
- Product list with search and pagination
- Add Product (with mandatory image upload)
- Edit Product (image optional on update)
- Delete Product
- Low-stock indicator on list rows

### Sales
- Create Sale page:
  - Multi-product selection with quantity input per line
  - Automatic subtotal and grand-total calculation as items/quantities change
  - Prevents submitting quantities that exceed available stock
- Sale history / list view

### Validation & UX
- Client-side form validation before hitting the API
- Toasts (`react-hot-toast`) for success/error feedback
- Confirmation modals (`sweetalert2`) for destructive actions like delete

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   ├── forms/
│   └── ui/
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProductsPage.tsx
│   ├── SalesPage.tsx
│   └── CustomersPage.tsx
├── redux/
│   ├── api/
│   │   ├── baseApi.ts
│   │   ├── authApi.ts
│   │   ├── productApi.ts
│   │   ├── saleApi.ts
│   │   ├── customerApi.ts
│   │   └── dashboardApi.ts
│   ├── features/
│   │   └── auth/
│   │       └── authSlice.ts
│   ├── hooks.ts
│   └── store.ts
├── axios/
│   ├── axiosInstance.ts
│   └── axiosBaseQuery.ts
├── routes/
│   ├── index.tsx
│   └── ProtectedRoute.tsx
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- The backend API running locally or deployed (see the backend README)

### 1. Clone the repository

```bash
git clone <https://github.com/Ibrahim-Sikder/inventory-frontend> mini-erp-client
cd mini-erp-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:9007/api/v1
```

> Vite only exposes variables prefixed with `VITE_` to client code — use `import.meta.env.VITE_API_URL` to read this in `axiosInstance.ts`.

### 4. Run in development

```bash
npm run dev
```

The app runs at `http://localhost:3000` by default.

### 5. Build for production

```bash
npm run build
```

### 6. Preview / run the production build

```bash
npm run preview
# or, to serve on a specific host/port (matches this project's "start" script):
npm start
```
`npm start` runs `vite preview --host 0.0.0.0 --port 9008`, so the production preview is served on port `9008`.

### 7. Lint

```bash
npm run lint
```

---

## 🔗 Connecting to the Backend

- All API calls go through `VITE_API_URL` (see `axios/axiosInstance.ts`).
- The backend uses HTTP-only cookies for auth, so Axios must be configured with `withCredentials: true`, and the backend's CORS config (`CROSS_ORIGIN_CLIENT`) must include this frontend's origin.
- On a `401` response, the Axios interceptor calls `/auth/refresh-token` once, then retries the original request; if refresh also fails, the user is redirected to `/login`.

---

## 🚀 Bonus Implementations

- [x] Modular Feature-Based Architecture
- [x] Reusable components (forms, protected route wrapper, toasts)
- [ ] Dynamic Role & Permission Management (database-driven)
- [ ] Generic Query Builder (search, filter, sort, pagination) shared across list pages
- [ ] Socket.io / WebSocket real-time dashboard updates

> Update this checklist to reflect what you actually implemented before submitting.

---

## 👤 Author

**Name:** Ibrahim Sikder
**Email:** ibrahimsikder5033@gmail.com
**Submitted for:** Full Stack (MERN) Developer position