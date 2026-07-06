import { mockProducts, mockCustomers, mockSales } from '../data/mockData'
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
} from 'lucide-react'

export function DashboardPage() {
  const lowStockProducts = mockProducts.filter((p) => p.stock <= 5)
  const totalSales = mockSales.reduce((sum, sale) => sum + sale.total, 0)

  const stats = [
    {
      label: 'Total Products',
      value: mockProducts.length,
      icon: Package,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      label: 'Total Customers',
      value: mockCustomers.length,
      icon: Users,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      label: 'Total Sales',
      value: `₹${(totalSales / 1000).toFixed(1)}K`,
      icon: ShoppingCart,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      label: 'Low Stock Items',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      color: 'bg-red-500/10 text-red-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">
          Welcome back! Here&apos;s your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Products */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Low Stock Products
          </h2>
          <div className="space-y-2">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted">{product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-warning">{product.stock} units</p>
                  <p className="text-xs text-muted">Stock Low</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Recent Sales
          </h2>
          <div className="space-y-2">
            {mockSales.slice(0, 5).map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {sale.customerName}
                  </p>
                  <p className="text-xs text-muted">{sale.date}</p>
                </div>
                <p className="font-bold text-primary">₹{sale.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
