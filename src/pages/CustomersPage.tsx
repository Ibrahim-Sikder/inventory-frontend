import { useState } from 'react'
import { mockCustomers } from '../data/mockData'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCustomers = mockCustomers.length
  const totalTransactions = mockCustomers.reduce(
    (sum, c) => sum + c.transactionCount,
    0
  )
  const totalLifetimeValue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted mt-1">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted text-sm font-medium">Total Customers</p>
          <p className="text-3xl font-bold text-foreground mt-2">{totalCustomers}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted text-sm font-medium">Total Transactions</p>
          <p className="text-3xl font-bold text-foreground mt-2">{totalTransactions}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-muted text-sm font-medium">Customer Lifetime Value</p>
          <p className="text-3xl font-bold text-primary mt-2">
            ₹{(totalLifetimeValue / 1000).toFixed(1)}K
          </p>
        </div>
      </div>

      {/* Add Customer Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Add New Customer</h2>
          <form className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              className="col-span-2 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Address"
              className="col-span-2 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="col-span-2 flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground hover:bg-card transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-background">
              <tr className="text-muted text-xs uppercase">
                <th className="text-left py-4 px-6">Name</th>
                <th className="text-left py-4 px-6">Email</th>
                <th className="text-left py-4 px-6">Phone</th>
                <th className="text-center py-4 px-6">Transactions</th>
                <th className="text-right py-4 px-6">Total Spent</th>
                <th className="text-left py-4 px-6">Last Purchase</th>
                <th className="text-center py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-background/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">
                    {customer.name}
                  </td>
                  <td className="py-4 px-6 text-muted">{customer.email}</td>
                  <td className="py-4 px-6 text-muted">{customer.phone}</td>
                  <td className="py-4 px-6 text-center font-medium text-foreground">
                    {customer.transactionCount}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-primary">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-muted">{customer.lastPurchase}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-card rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-card rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No customers found</p>
        </div>
      )}
    </div>
  )
}
