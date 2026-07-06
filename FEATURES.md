# Mini ERP - Complete Features Guide

## Overview
A fully-functional ERP (Enterprise Resource Planning) system built entirely with **React 19 + TypeScript**. No backend required - all data is self-contained and static for immediate use.

---

## 🔐 Authentication & Access

### Demo Accounts
Three pre-configured user roles for testing:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@example.com | password123 | Full access to all modules |
| **Manager** | manager@example.com | password123 | Products, Sales, Customers |
| **Employee** | employee@example.com | password123 | View Products, Create Sales |

### Login Features
- Clean, modern login interface
- Pre-filled demo credentials
- Quick-access buttons for each role
- Form validation and error handling
- Redirect to dashboard on success

---

## 📊 Dashboard

### Key Metrics (Real-time)
- **Total Products**: 6 items in inventory
- **Total Customers**: 3 registered customers
- **Total Sales**: ৳113.5K cumulative revenue
- **Low Stock Items**: 2 products below threshold

### Dashboard Widgets

#### Low Stock Products Table
- Shows products with stock ≤ 5 units
- Displays product name and SKU
- Highlights stock levels in red
- Quick reference for restocking needs

#### Recent Sales Panel
- Shows last 5 transactions
- Customer name and date
- Transaction amounts
- Color-coded by status

### Visual Design
- 4-column grid on desktop
- Responsive to tablet/mobile
- Icons for each metric
- Color-coded indicators (blue, green, purple, red)

---

## 📦 Products Management

### Product Catalog
Complete inventory of 6 products with full details:

1. **Laptop Dell XPS**
   - SKU: DELL-XPS-001
   - Category: Electronics
   - Buy Price: ৳45,000
   - Sell Price: ৳55,000
   - Stock: 15 units
   - Status: ✅ Good stock (green)

2. **Mouse Logitech MX**
   - SKU: LOG-MX-002
   - Category: Accessories
   - Buy Price: ৳2,500
   - Sell Price: ৳3,500
   - Stock: 8 units
   - Status: ✅ Adequate stock

3. **Keyboard Mechanical**
   - SKU: KEY-MECH-003
   - Category: Accessories
   - Buy Price: ৳5,000
   - Sell Price: ৳7,500
   - Stock: 3 units
   - Status: ⚠️ Low stock (red)

4. **Monitor LG 27"**
   - SKU: LG-27-004
   - Category: Electronics
   - Buy Price: ৳18,000
   - Sell Price: ৳22,000
   - Stock: 12 units
   - Status: ✅ Good stock

5. **Desk Lamp LED**
   - SKU: LAMP-LED-005
   - Category: Furniture
   - Buy Price: ৳2,000
   - Sell Price: ৳3,200
   - Stock: 2 units
   - Status: 🔴 Critical (red)

6. **Office Chair Pro**
   - SKU: CHAIR-PRO-006
   - Category: Furniture
   - Buy Price: ৳8,000
   - Sell Price: ৳12,000
   - Stock: 6 units
   - Status: ⚠️ Low stock (yellow)

### Features
- **Search**: Find products by name or SKU
- **Card View**: Visual product display with icons
- **Stock Indicators**: Color-coded progress bars
- **Price Display**: Both buy and sell prices shown
- **Edit/Delete**: Buttons for modification (frontend only)
- **Add Product**: Form to add new items

### Stock Status Colors
- 🟢 **Green** (>10 units): Good stock
- 🟡 **Yellow** (6-10 units): Monitor level
- 🔴 **Red** (≤5 units): Critical - reorder needed

---

## 💳 Sales Management

### Sales Creation
Complete transaction workflow:

1. **Customer Selection**
   - Dropdown with 3 sample customers
   - Shows customer name and email
   - Required field

2. **Product Selection**
   - Search dropdown for products
   - Displays product name and price
   - Quantity input field

3. **Add Items**
   - Click "Add Item" button
   - Items appear in table
   - Multiple products per sale
   - Remove individual items

4. **Order Summary**
   - Line-by-line item breakdown
   - Price × Quantity = Line Total
   - Grand total calculation
   - "Confirm Sale" button

### Sample Sales Data
Three completed transactions available:

**Sale #1 - Rajesh Kumar**
- Date: 2024-07-04
- Item: Laptop Dell XPS (1 × ৳55,000)
- Total: ৳55,000
- Status: ✅ Completed

**Sale #2 - Priya Singh**
- Date: 2024-07-04
- Item: Monitor LG 27" (2 × ৳22,000)
- Total: ৳44,000
- Status: ✅ Completed

**Sale #3 - Amit Patel**
- Date: 2024-07-03
- Items: 
  - Mouse Logitech MX (2 × ৳3,500)
  - Keyboard Mechanical (1 × ৳7,500)
- Total: ৳14,500
- Status: ✅ Completed

### Features
- Real-time total calculation
- Stock validation (prevents overselling)
- Recent sales history sidebar
- Transaction date tracking
- Customer association
- Item quantity management

---

## 👥 Customers Management

### Customer Directory

**Customer 1 - Rajesh Kumar**
- Email: rajesh@company.com
- Phone: +91-9876543210
- Location: Mumbai, Maharashtra
- Transactions: 5
- Total Spent: ৳2,500
- Last Purchase: 2024-07-03

**Customer 2 - Priya Singh**
- Email: priya@business.com
- Phone: +91-9876543211
- Location: Delhi, India
- Transactions: 7
- Total Spent: ৳3,800
- Last Purchase: 2024-07-04

**Customer 3 - Amit Patel**
- Email: amit@startups.io
- Phone: +91-9876543212
- Location: Bangalore, Karnataka
- Transactions: 4
- Total Spent: ৳1,900
- Last Purchase: 2024-07-01

### Key Metrics
- **Total Customers**: 3
- **Total Transactions**: 16
- **Customer Lifetime Value**: ৳8,200 combined

### Features
- **Customer Table**: All details at a glance
- **Search**: Find by name or email
- **Sort**: Transaction and spending columns
- **Edit/Delete**: Manage customer records
- **Add Customer**: New customer form
- **Purchase History**: Transaction count per customer
- **Spending Tracking**: Total spent amount

---

## 🎨 User Interface

### Design System
- **Theme**: Dark blue/slate background
- **Primary Color**: Bright blue (#3B82F6)
- **Accent Colors**: 
  - Green for success/positive
  - Yellow/Orange for warnings
  - Red for critical/danger
  - Cyan for secondary actions

### Components
- **Sidebar Navigation**: Collapsible menu with icons
- **Cards**: Rounded corners, subtle borders
- **Tables**: Clean rows with hover effects
- **Forms**: Input validation, focus states
- **Buttons**: Primary (blue), secondary (gray), danger (red)
- **Icons**: Lucide React for consistency

### Responsive Design
- **Desktop**: Full sidebar, 3-4 column grids
- **Tablet**: Adjusted columns, touch-optimized
- **Mobile**: Single column, simplified layout
- **Sidebar**: Collapses to icon-only on smaller screens

---

## 🔧 Technical Implementation

### Data Structure
All data defined in `src/data/mockData.ts`:
```typescript
- Products: Array of 6 items
- Customers: Array of 3 people
- Sales: Array of 3 transactions
```

### Authentication
- React Context API for state management
- Simulated login validation
- Demo user database in auth context
- Session stored in component state

### Routing
- React Router v7 for navigation
- 5 main routes:
  - `/login` - Authentication
  - `/dashboard` - Overview
  - `/products` - Inventory
  - `/sales` - Transactions
  - `/customers` - Relationships

### State Management
- Context API for auth
- Local useState for component state
- No external state library needed

---

## 🚀 How to Extend

### Add New Product
1. Edit `src/data/mockData.ts`
2. Add object to `mockProducts` array
3. Reload page (hot reload may work)

### Add New Customer
1. Edit `src/data/mockData.ts`
2. Add object to `mockCustomers` array
3. Customer appears in Sales dropdown

### Add New Sale
1. Edit `src/data/mockData.ts`
2. Add transaction to `mockSales` array
3. Shows in dashboard and sales history

### Change Colors
1. Edit `src/index.css` CSS variables
2. Update Tailwind theme
3. Colors update throughout app

---

## 📊 Statistics Summary

| Metric | Value |
|--------|-------|
| Total Products | 6 |
| Total Customers | 3 |
| Total Transactions | 3 |
| Cumulative Sales | ৳113,500 |
| Average Sale | ৳37,833 |
| Low Stock Items | 2 |
| Customer Lifetime Value | ৳8,200 avg |

---

## ✨ Perfect For

- ✅ Learning React + TypeScript
- ✅ Frontend portfolio projects
- ✅ Demo and presentation
- ✅ Prototyping
- ✅ Educational use
- ✅ Starting point for production ERP

---

**All features work without any backend or database!**
Static data makes it perfect for testing, learning, and demonstrations.
