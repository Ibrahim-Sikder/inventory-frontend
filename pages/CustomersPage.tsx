'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { Users, Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      totalPurchases: 5,
      totalSpent: 2500,
      lastPurchase: '2026-07-05',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 87654 32109',
      totalPurchases: 8,
      totalSpent: 4200,
      lastPurchase: '2026-07-04',
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+91 76543 21098',
      totalPurchases: 3,
      totalSpent: 1500,
      lastPurchase: '2026-07-03',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all fields');
      return;
    }

    const newCustomer: Customer = {
      id: Math.max(...customers.map((c) => c.id), 0) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      totalPurchases: 0,
      totalSpent: 0,
      lastPurchase: 'N/A',
    };

    setCustomers([newCustomer, ...customers]);
    setFormData({ name: '', email: '', phone: '' });
    setShowForm(false);
  };

  const deleteCustomer = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const totalCustomerValue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalTransactions = customers.reduce((sum, c) => sum + c.totalPurchases, 0);

  return (
    <Layout
      title="Customers"
      subtitle="Manage customer information and purchase history"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-text text-sm font-medium">Total Customers</p>
            <p className="text-3xl font-bold text-foreground mt-2">{customers.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-text text-sm font-medium">Total Transactions</p>
            <p className="text-3xl font-bold text-foreground mt-2">{totalTransactions}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-text text-sm font-medium">Customer Lifetime Value</p>
            <p className="text-3xl font-bold text-primary mt-2">৳{totalCustomerValue.toFixed(0)}</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-text" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Customer
          </button>
        </div>

        {/* Add Customer Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Add New Customer</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="E.g., John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="md:col-span-3 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  Add Customer
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-background border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Customers Table */}
        <div className="bg-card border border-border rounded-xl p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-muted-text">Name</th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-text">Contact</th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-text">Purchases</th>
                  <th className="text-right py-4 px-4 font-semibold text-muted-text">Total Spent</th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-text">Last Purchase</th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border/50 hover:bg-background transition-colors"
                  >
                    <td className="py-4 px-4 text-foreground font-medium">{customer.name}</td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-text text-xs">
                          <Mail className="w-4 h-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-text text-xs">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-foreground font-medium">
                      {customer.totalPurchases}
                    </td>
                    <td className="text-right py-4 px-4 text-primary font-semibold">
                      ৳{customer.totalSpent.toFixed(0)}
                    </td>
                    <td className="py-4 px-4 text-muted-text text-xs">{customer.lastPurchase}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCustomer(customer.id)}
                          className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-text mx-auto mb-4 opacity-50" />
              <p className="text-muted-text">No customers found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
