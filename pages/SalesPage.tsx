'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { ShoppingCart, Plus, Trash2, Calculator } from 'lucide-react';

interface SaleItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Sale {
  id: number;
  customer: string;
  date: string;
  items: SaleItem[];
  total: number;
  status: 'completed' | 'pending';
}

export default function SalesPage() {
  const [showForm, setShowForm] = useState(false);
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      customer: 'John Doe',
      date: '2026-07-05',
      items: [
        { productId: 1, productName: 'Office Chair', quantity: 2, unitPrice: 299 },
      ],
      total: 598,
      status: 'completed',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: '2026-07-04',
      items: [
        { productId: 2, productName: 'Desk Lamp', quantity: 3, unitPrice: 49 },
        { productId: 3, productName: 'Monitor Stand', quantity: 1, unitPrice: 79 },
      ],
      total: 226,
      status: 'completed',
    },
  ]);

  const [formData, setFormData] = useState({
    customer: '',
    productId: '1',
    quantity: '',
  });

  const products = [
    { id: 1, name: 'Office Chair', price: 299, stock: 15 },
    { id: 2, name: 'Desk Lamp', price: 49, stock: 8 },
    { id: 3, name: 'Monitor Stand', price: 79, stock: 20 },
  ];

  const grandTotal = saleItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.quantity || !formData.customer) {
      alert('Please select a product and enter quantity');
      return;
    }

    const product = products.find((p) => p.id === parseInt(formData.productId));
    if (!product) return;

    const quantity = parseInt(formData.quantity);
    if (quantity > product.stock) {
      alert(`Only ${product.stock} units available`);
      return;
    }

    const existingItem = saleItems.find((item) => item.productId === product.id);
    if (existingItem) {
      setSaleItems(
        saleItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setSaleItems([
        ...saleItems,
        {
          productId: product.id,
          productName: product.name,
          quantity,
          unitPrice: product.price,
        },
      ]);
    }

    setFormData({ ...formData, quantity: '', productId: '1' });
  };

  const removeItem = (productId: number) => {
    setSaleItems(saleItems.filter((item) => item.productId !== productId));
  };

  const completeSale = () => {
    if (!formData.customer || saleItems.length === 0) {
      alert('Please add items and enter customer name');
      return;
    }

    const newSale: Sale = {
      id: Math.max(...sales.map((s) => s.id), 0) + 1,
      customer: formData.customer,
      date: new Date().toISOString().split('T')[0],
      items: saleItems,
      total: grandTotal,
      status: 'completed',
    };

    setSales([newSale, ...sales]);
    setSaleItems([]);
    setFormData({ customer: '', productId: '1', quantity: '' });
    setShowForm(false);
  };

  return (
    <Layout
      title="Sales"
      subtitle="Create and manage sales transactions"
    >
      <div className="space-y-6">
        {/* Create Sale Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="w-5 h-5 text-cyan-500" />
            <h2 className="text-lg font-semibold text-foreground">Create New Sale</h2>
          </div>

          <div className="space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                placeholder="Enter customer name"
              />
            </div>

            {/* Add Item Form */}
            <div className="bg-background rounded-lg p-4 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-4">Add Products to Sale</p>
              <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-text mb-2">
                    Product
                  </label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-text mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-medium transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
              </form>
            </div>

            {/* Sale Items Table */}
            {saleItems.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-muted-text">
                        Product
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-text">
                        Unit Price
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-text">
                        Quantity
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-text">
                        Total
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-muted-text">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleItems.map((item) => (
                      <tr
                        key={item.productId}
                        className="border-b border-border/50 hover:bg-background transition-colors"
                      >
                        <td className="py-3 px-4 text-foreground">{item.productName}</td>
                        <td className="text-right py-3 px-4 text-foreground">₹{item.unitPrice}</td>
                        <td className="text-right py-3 px-4 text-foreground">{item.quantity}</td>
                        <td className="text-right py-3 px-4 text-primary font-semibold">
                          ₹{(item.quantity * item.unitPrice).toFixed(2)}
                        </td>
                        <td className="text-center py-3 px-4">
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="inline-flex items-center justify-center p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Grand Total */}
                <div className="mt-4 flex items-center justify-end gap-4 p-4 bg-background rounded-lg border border-border/50">
                  <span className="text-sm font-medium text-muted-text">Grand Total:</span>
                  <span className="text-2xl font-bold text-primary">₹{grandTotal.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={completeSale}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Calculator className="w-5 h-5" />
                    Complete Sale
                  </button>
                  <button
                    onClick={() => {
                      setSaleItems([]);
                      setFormData({ customer: '', productId: '1', quantity: '' });
                    }}
                    className="flex-1 py-3 px-4 bg-background border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sales History */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Recent Sales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-text">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-text">Customer</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-text">Items</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-text">Total</th>
                  <th className="text-center py-3 px-4 font-semibold text-muted-text">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-border/50 hover:bg-background transition-colors"
                  >
                    <td className="py-3 px-4 text-foreground">{sale.date}</td>
                    <td className="py-3 px-4 text-foreground">{sale.customer}</td>
                    <td className="text-center py-3 px-4 text-muted-text">{sale.items.length}</td>
                    <td className="text-right py-3 px-4 text-primary font-semibold">
                      ₹{sale.total.toFixed(2)}
                    </td>
                    <td className="text-center py-3 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          sale.status === 'completed'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
