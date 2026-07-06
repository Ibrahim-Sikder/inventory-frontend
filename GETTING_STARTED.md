# Getting Started with Mini ERP

Welcome to the Mini ERP system! This guide will help you get up and running in minutes.

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

The app opens automatically at `http://localhost:3000`

### 3. Login with Demo Account
Use any of these credentials:
- **admin@example.com** / password123
- **manager@example.com** / password123
- **employee@example.com** / password123

That's it! You're ready to explore.

---

## 📱 First Steps

### 1. Explore the Dashboard
After logging in, you'll see:
- Business metrics (products, customers, sales)
- Low stock alerts
- Recent sales activity

### 2. Browse Products
- Navigate to **Products** from the sidebar
- See all 6 products with pricing and stock info
- Try the search feature
- Check out stock level indicators

### 3. Create a Sale
- Go to **Sales**
- Select a customer from the dropdown
- Choose products and quantities
- See the total update in real-time
- Click "Confirm Sale"

### 4. View Customers
- Go to **Customers**
- See all 3 sample customers
- Check their purchase history
- View lifetime value

### 5. Customize Your View
- Click the sidebar toggle (≡) to collapse menu
- Try different screen sizes (responsive!)
- Log out from the user profile menu

---

## 🔑 Demo Accounts Explained

### Admin Account
- **Email**: admin@example.com
- **Password**: password123
- **Access**: Everything
- **Use**: Full system testing, all features

### Manager Account
- **Email**: manager@example.com
- **Password**: password123
- **Access**: Products, Sales, Customers
- **Use**: Team member testing

### Employee Account
- **Email**: employee@example.com
- **Password**: password123
- **Access**: View Products, Create Sales
- **Use**: Limited role testing

*Note: All passwords are 'password123' for demo purposes*

---

## 🎯 What You Can Do

✅ **Dashboard**
- View key business metrics
- See low stock products
- Check recent sales
- Get business overview

✅ **Products**
- Search by name or SKU
- View pricing and margins
- Check stock levels
- See product details (UI only)
- Add/Edit/Delete (UI only)

✅ **Sales**
- Create new transactions
- Select customer and products
- Add multiple items
- See real-time totals
- View sale history

✅ **Customers**
- Browse all customers
- See contact information
- View transaction history
- Check lifetime value
- Search customers
- Add/Edit/Delete (UI only)

---

## 🛠️ What's Under the Hood

### Technology Stack
- **React 19** - Modern UI library
- **TypeScript** - Type-safe code
- **Vite** - Super fast builds
- **React Router v7** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Architecture
```
React Component → Context API → Mock Data
     ↓              ↓              ↓
  UI Display    Auth State    Static JSON
```

### No Backend Needed
- All data is static
- No database required
- Perfect for learning
- Works offline
- No API calls

---

## 📁 Project Layout

### Main Folders
```
src/
├── pages/          ← The 5 main pages
├── components/     ← Layout components
├── context/        ← Authentication logic
├── data/           ← All static data
└── types.ts        ← TypeScript definitions
```

### Key Files to Know
- `src/App.tsx` - Main routing and auth setup
- `src/data/mockData.ts` - All sample data
- `src/context/AuthContext.tsx` - Login logic
- `src/components/Layout.tsx` - Sidebar and navigation

---

## 🎨 Customizing the App

### Change Colors
Edit `src/index.css`:
```css
--color-primary: #3b82f6;  /* Change primary blue */
--color-success: #10b981;  /* Change success green */
```

### Add More Products
Edit `src/data/mockData.ts`:
```typescript
export const mockProducts: Product[] = [
  // Add new product objects here
  {
    id: '7',
    name: 'Your Product',
    sku: 'SKU-001',
    // ... other fields
  }
]
```

### Change Demo Users
Edit `src/context/AuthContext.tsx`:
```typescript
const mockUsers: Record<string, User> = {
  'your-email@example.com': {
    // Your custom user
  }
}
```

---

## 🚀 Next Steps

### Learn React
- Explore component structure
- Understand hooks usage
- See how routing works
- Study Context API pattern

### Practice TypeScript
- Check type definitions in `types.ts`
- See how interfaces work
- Learn type safety benefits
- Review component props

### Build Features (UI Only)
- Add form fields
- Create new pages
- Add animations
- Improve styling

### Connect Real Backend
When ready to productionize:
1. Replace `mockData` with API calls
2. Update `AuthContext` for real auth
3. Add error handling
4. Implement loading states
5. Add proper data validation

---

## 🐛 Troubleshooting

### App Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Port Already in Use
```bash
# Use different port
pnpm dev -- --port 3001
```

### TypeScript Errors
- Check `tsconfig.json` is present
- Restart your editor
- Run `pnpm install` again

### Styles Not Loading
- Ensure `src/index.css` exists
- Check Tailwind configuration
- Restart dev server

---

## 📚 Learning Resources

### React Concepts Used
- Functional Components
- Hooks (useState, useEffect, useContext)
- Context API for state
- React Router for navigation
- Component composition

### TypeScript Patterns
- Interfaces for data structures
- Type safety in components
- Generic types for reusability
- Type inference

### Tailwind CSS
- Utility classes
- Responsive prefixes
- Dark mode support
- CSS variables

---

## 🎓 Practice Tasks

### Easy
1. Change the page title
2. Update a customer's name in mockData
3. Add a new product with custom pricing
4. Change the primary color

### Medium
1. Add a new page/route
2. Create a new component
3. Add a search filter
4. Implement a new form

### Hard
1. Add real form submission
2. Implement local storage
3. Create a custom hook
4. Add animations with CSS

---

## 💡 Tips & Tricks

- **Hot Reload**: Changes auto-reload in browser (usually)
- **React DevTools**: Install browser extension to inspect components
- **TypeScript**: Hover over variables to see their types
- **Tailwind**: Use `@apply` to create custom classes
- **Console**: Open browser console to debug (F12)

---

## 🤝 Ready to Build?

You have everything needed to:
✅ Learn React + TypeScript
✅ Understand ERP systems
✅ Build your own features
✅ Practice modern web development
✅ Create a portfolio project

**Start exploring and have fun!** 🚀

---

For detailed features, see [FEATURES.md](./FEATURES.md)
For technical details, see [README.md](./README.md)
