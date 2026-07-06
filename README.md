# Mini ERP System - React + TypeScript SPA

A modern, fully-functional Enterprise Resource Planning (ERP) system built with **React 19 + TypeScript** and **Vite**. This application provides complete inventory management, sales tracking, and customer relationship management with a professional dark-themed UI. All data is static and self-contained for immediate use without backend dependencies.

## 🎯 Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure login system with token-based sessions
- **Role-Based Access Control**: Three distinct roles with specific permissions
  - **Admin**: Full system access
  - **Manager**: Product and sales management, customer management
  - **Employee**: View products, create sales
- **Protected Routes**: All sensitive pages require authentication

### Dashboard
- **Real-time Statistics**: Total products, customers, sales, and low stock alerts
- **Low Stock Products**: Quick view of inventory items below threshold
- **Recent Sales**: View latest transactions at a glance
- **Business Insights**: Visual overview of key metrics

### Product Management
- **Full CRUD Operations**: Create, read, update, and delete products
- **Product Fields**:
  - Product name and SKU
  - Category classification
  - Purchase and selling prices
  - Stock quantity tracking
  - Product image/icon support
- **Search & Filter**: Find products quickly by name or SKU
- **Pagination**: Efficient browsing of large product catalogs
- **Stock Visualization**: Visual stock level indicators

### Sales Management
- **Create Sales Transactions**: Add multiple products to a single sale
- **Customer Selection**: Link sales to customer records
- **Dynamic Calculation**: Automatic total calculation as items are added
- **Stock Validation**: Prevents selling unavailable or insufficient stock
- **Sales History**: Complete record of all transactions
- **Transaction Details**: View items, quantities, and totals

### Customer Management
- **Customer Directory**: Complete customer contact information
- **Purchase Tracking**: Monitor customer purchase history
- **Customer Lifetime Value**: Track total spending per customer
- **Contact Information**: Email and phone number storage
- **Search Capability**: Find customers quickly by name, email, or phone

## 🛠️ Technology Stack

- **React 19** - Modern UI library with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool
- **React Router v7** - Client-side routing without server dependencies
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Beautiful, consistent icon library
- **Context API** - State management for authentication

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **pnpm** (recommended) or npm/yarn

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The app will automatically open at `http://localhost:3000`

## 📖 Usage Guide

### Demo Credentials

#### Admin Account
- **Email**: `admin@example.com`
- **Password**: `password123`
- **Access**: Full system access, all modules

#### Manager Account
- **Email**: `manager@example.com`
- **Password**: `password123`
- **Access**: Products, sales, customers

#### Employee Account
- **Email**: `employee@example.com`
- **Password**: `password123`
- **Access**: View products, create sales

### Login
1. Navigate to the login page
2. Enter email and password from demo credentials
3. Click "Sign In"
4. You'll be redirected to the dashboard

### Dashboard
- View key business metrics
- Monitor low stock items
- Check recent sales activity
- Get quick business insights

### Products Module
- **View Products**: Browse all products with card view
- **Add Product**: Click "Add Product", fill in details
- **Edit Product**: Click edit icon on product card
- **Delete Product**: Click trash icon to remove product
- **Search**: Use search bar to find products by name or SKU
- **Pagination**: Navigate through product pages

### Sales Module
- **Create Sale**:
  1. Enter customer name
  2. Select products from dropdown
  3. Enter quantity
  4. Click "Add Item"
  5. Review items and totals
  6. Click "Complete Sale"
- **View History**: See all completed transactions
- **Stock Protection**: System prevents overselling

### Customers Module
- **View Customers**: Browse all customer records
- **Add Customer**: Click "Add Customer", enter details
- **Customer Metrics**: See total purchases and spending
- **Search**: Find customers by name, email, or phone
- **Delete**: Remove customer records

## 📁 Project Structure

```
mini-erp/
├── src/
│   ├── main.tsx                       # Entry point
│   ├── App.tsx                        # Main app with routing
│   ├── index.css                      # Global styles with Tailwind
│   ├── types.ts                       # TypeScript interfaces
│   │
│   ├── context/
│   │   └── AuthContext.tsx            # Authentication state
│   │
│   ├── components/
│   │   └── Layout.tsx                 # Main layout with sidebar
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx              # Login page
│   │   ├── DashboardPage.tsx          # Dashboard with KPIs
│   │   ├── ProductsPage.tsx           # Product management
│   │   ├── SalesPage.tsx              # Sales creation
│   │   └── CustomersPage.tsx          # Customer management
│   │
│   └── data/
│       └── mockData.ts                # Static mock data
│
├── index.html                         # HTML entry point
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript config
├── postcss.config.mjs                 # PostCSS config
├── tailwind.config.js                 # Tailwind config
└── package.json                       # Dependencies
```

## 🔐 Authentication

- **Context-based**: Uses React Context API for state management
- **Demo Credentials**: Pre-configured demo accounts for testing
- **Protected Routes**: Automatic route protection for authenticated users
- **Session State**: In-memory user session (persists during session)

## 💾 Data Management

All data is **static and hardcoded** in `src/data/mockData.ts`:
- **Products**: 6 items with pricing and stock levels
- **Customers**: 3 sample customers
- **Sales**: 3 transaction examples

### To Connect a Backend:
1. Replace `mockData.ts` with API calls
2. Update `AuthContext.tsx` to use real authentication
3. Convert static data to dynamic API responses
4. Add proper error handling and loading states

## 🎨 Design

- **Color Scheme**: Dark blue/slate with bright blue accents
- **Responsive**: Mobile-first, works on all screen sizes
- **Dark Theme**: Professional dark interface
- **Collapsible Sidebar**: Toggle for better space management

## 🧠 How It Works

### State Management
- **Auth Context**: Manages login/logout and user role
- **React Hooks**: useState for component-level state
- **React Router**: Client-side navigation

### Key Features
1. **Login** - Authenticate with demo credentials
2. **Dashboard** - View KPIs and recent activity
3. **Products** - Browse, search, and manage inventory
4. **Sales** - Create transactions and view history
5. **Customers** - Manage customer relationships

## 📱 Responsive Design

- **Desktop**: Full sidebar, multi-column layouts
- **Tablet**: Optimized grid system
- **Mobile**: Single column, touch-friendly buttons
- **Collapsible**: Sidebar toggles for smaller screens

## 🚀 Perfect For

- Learning React + TypeScript
- SPA (Single Page Application) projects
- Frontend prototyping
- Demo and presentation
- Educational purposes
- Starting point for full ERP system

## 🔗 Next Steps to Productionize

1. **Backend Setup**
   - Create API endpoints for products, sales, customers
   - Set up real authentication (JWT, OAuth, etc.)
   - Connect to database (PostgreSQL, MongoDB, etc.)

2. **Data Integration**
   - Replace mock data with API calls
   - Implement proper error handling
   - Add loading states and spinners

3. **Features**
   - Add edit/delete functionality backend support
   - Implement search with server-side filtering
   - Add pagination for large datasets

4. **Security**
   - Add password hashing
   - Implement rate limiting
   - Add CORS protection
   - Use secure tokens

## 💡 Tips for Development

- **TypeScript**: All components have full type safety
- **Routing**: React Router handles all navigation
- **Styling**: Tailwind CSS with CSS variables for theming
- **Icons**: Lucide React for consistent iconography
- **Structure**: Clear separation of concerns

## 📝 License

MIT - Use freely for personal and commercial projects

---

**Built with React 19 + TypeScript + Vite** ✨
**Version**: 1.0.0
**Last Updated**: July 6, 2026
