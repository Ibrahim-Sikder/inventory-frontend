export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'employee'
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  buyPrice: number
  sellPrice: number
  stock: number
  icon?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalSpent: number
  transactionCount: number
  lastPurchase: string
}

export interface SaleItem {
  productId: string
  productName: string
  price: number
  quantity: number
  total: number
}

export interface Sale {
  id: string
  customerId: string
  customerName: string
  items: SaleItem[]
  total: number
  date: string
  status: 'completed' | 'pending' | 'cancelled'
}
