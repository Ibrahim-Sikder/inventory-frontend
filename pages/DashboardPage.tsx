'use client';

import Layout from '@/components/Layout';
import { BarChart, Box, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  // Mock data
  const stats = [
    { label: 'Total Products', value: '1,248', icon: Box, color: 'bg-blue-500' },
    { label: 'Total Customers', value: '512', icon: ShoppingCart, color: 'bg-cyan-500' },
    { label: 'Total Sales', value: '$45,230', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'bg-yellow-500' },
  ];

  const lowStockProducts = [
    { id: 1, name: 'Office Chair', sku: 'CHAIR-001', stock: 3, threshold: 5 },
    { id: 2, name: 'Desk Lamp', sku: 'LAMP-002', stock: 2, threshold: 5 },
    { id: 3, name: 'USB Cable', sku: 'USB-003', stock: 4, threshold: 10 },
    { id: 4, name: 'Monitor Stand', sku: 'STAND-004', stock: 1, threshold: 5 },
    { id: 5, name: 'Keyboard', sku: 'KEY-005', stock: 3, threshold: 10 },
  ];

  const recentSales = [
    { id: 1, customer: 'John Doe', amount: '$1,250', date: 'Today', items: 5 },
    { id: 2, customer: 'Jane Smith', amount: '$890', date: 'Today', items: 3 },
    { id: 3, customer: 'Bob Wilson', amount: '$2,100', date: 'Yesterday', items: 8 },
    { id: 4, customer: 'Alice Brown', amount: '$650', date: 'Yesterday', items: 2 },
  ];

  return (
    <Layout title="Dashboard" subtitle="Welcome back! Here's your business overview.">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-text text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Low Stock Products */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">Low Stock Products</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-muted-text">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-text">SKU</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-text">Current Stock</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-text">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockProducts.map((product) => (
                      <tr key={product.id} className="border-b border-border/50 hover:bg-background transition-colors">
                        <td className="py-3 px-4 text-foreground">{product.name}</td>
                        <td className="py-3 px-4 text-muted-text">{product.sku}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
                            {product.stock} units
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {product.stock <= 3 ? (
                            <span className="text-red-400 text-xs font-medium">Critical</span>
                          ) : (
                            <span className="text-yellow-400 text-xs font-medium">Warning</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Sales */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="w-5 h-5 text-cyan-500" />
                <h2 className="text-lg font-semibold text-foreground">Recent Sales</h2>
              </div>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="p-4 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-foreground text-sm">{sale.customer}</p>
                      <span className="text-primary font-semibold text-sm">{sale.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-text">{sale.date}</p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {sale.items} items
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
