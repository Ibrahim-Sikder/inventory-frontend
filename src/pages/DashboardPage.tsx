import {
  AlertTriangle,
  Package,
  ShoppingCart,
  Users
} from 'lucide-react'

import { useGetDashboardStatsQuery } from '../redux/api/dashboardApi'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function DashboardPage() {
  const { data, isLoading, error, refetch } = useGetDashboardStatsQuery({})
  console.log('Dashboard data:', data)


  if (isLoading) {
    return <LoadingSpinner />
  }


  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted mt-1">
            Welcome back! Here&apos;s your business overview.
          </p>
        </div>
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-danger">Error loading dashboard data. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }


  const dashboardData = data?.data || {}


  const stats = [
    {
      label: 'Total Products',
      value: dashboardData.totalProducts || 0,
      icon: Package,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      label: 'Total Customers',
      value: dashboardData.totalCustomers || 0,
      icon: Users,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      label: 'Total Sales',
      value: dashboardData.totalSales || 0,
      icon: ShoppingCart,
      color: 'bg-purple-500/10 text-purple-500',
      format: 'currency'
    },
    {
      label: 'Low Stock Items',
      value: dashboardData.lowStockProducts?.length || 0,
      icon: AlertTriangle,
      color: 'bg-red-500/10 text-red-500',
    },
  ]


  const formatValue = (value: number, format?: string) => {
    if (format === 'currency') {
      if (value >= 1000) {
        return `৳${(value / 1000).toFixed(1)}K`
      }
      return `৳${value.toFixed(0)}`
    }
    return value
  }


  const lowStockProducts = dashboardData.lowStockProducts || []


  const recentSales = dashboardData.recentSales || []

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">
          Welcome back! Here&apos;s your business overview.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const displayValue = formatValue(stat.value, stat.format)
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {displayValue}
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
            {lowStockProducts.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted">
                {lowStockProducts.length} items
              </span>
            )}
          </h2>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {lowStockProducts.map((product: any) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-background/70 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-warning">{product.stockQuantity} units</p>
                    <p className="text-xs text-muted">Stock Low</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted text-sm">All products are well stocked!</p>
            </div>
          )}
        </div>

        {/* Recent Sales */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Recent Sales
            {recentSales.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted">
                Last {recentSales.length} transactions
              </span>
            )}
          </h2>
          {recentSales.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {recentSales.map((sale: any) => (
                <div
                  key={sale._id}
                  className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-background/70 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {sale.customer?.name || 'Unknown Customer'}
                    </p>
                    <p className="text-xs text-muted">
                      {sale.createdAt ? new Date(sale.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">৳{sale.grandTotal?.toLocaleString() || 0}</p>
                    <p className="text-xs text-muted">{sale.items?.length || 0} items</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted text-sm">No recent sales</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage