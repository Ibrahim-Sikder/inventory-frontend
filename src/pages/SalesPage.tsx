import { useState } from 'react'
import { mockProducts, mockCustomers, mockSales } from '../data/mockData'
import { Plus, X } from 'lucide-react'

export function SalesPage() {
  const [saleItems, setSaleItems] = useState<
    Array<{ productId: string; quantity: number }>
  >([])
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)

  const addItem = () => {
    if (!selectedProduct || quantity <= 0) return

    const existingItem = saleItems.find((item) => item.productId === selectedProduct)
    if (existingItem) {
      setSaleItems(
        saleItems.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      )
    } else {
      setSaleItems([...saleItems, { productId: selectedProduct, quantity }])
    }

    setSelectedProduct('')
    setQuantity(1)
  }

  const removeItem = (productId: string) => {
    setSaleItems(saleItems.filter((item) => item.productId !== productId))
  }

  const calculateTotal = () => {
    return saleItems.reduce((total, item) => {
      const product = mockProducts.find((p) => p.id === item.productId)
      return total + (product?.sellPrice || 0) * item.quantity
    }, 0)
  }

  const createSale = () => {
    if (!selectedCustomer || saleItems.length === 0) return
    // Sale creation logic here
    setSaleItems([])
    setSelectedCustomer('')
    alert('Sale created successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales</h1>
        <p className="text-muted mt-1">Create and manage sales transactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Sale Form */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">
            Create New Sale
          </h2>

          {/* Customer Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Customer
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Choose a customer...</option>
              {mockCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
          </div>

          {/* Product Selection */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-foreground">Add Products</h3>

            <div className="grid grid-cols-3 gap-3">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="col-span-2 px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a product...</option>
                {mockProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (₹{product.sellPrice})
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={addItem}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          {/* Sale Items Table */}
          {saleItems.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr className="text-muted text-xs uppercase">
                    <th className="text-left py-3">Product</th>
                    <th className="text-center py-3">Price</th>
                    <th className="text-center py-3">Qty</th>
                    <th className="text-right py-3">Total</th>
                    <th className="text-center py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {saleItems.map((item) => {
                    const product = mockProducts.find((p) => p.id === item.productId)
                    return (
                      <tr key={item.productId} className="text-foreground">
                        <td className="py-3">{product?.name}</td>
                        <td className="text-center">₹{product?.sellPrice}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right font-medium">
                          ₹{((product?.sellPrice || 0) * item.quantity).toLocaleString()}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-1 hover:bg-background rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-danger" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-foreground">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{calculateTotal().toLocaleString()}
                </span>
              </div>

              <button
                onClick={createSale}
                disabled={!selectedCustomer || saleItems.length === 0}
                className="w-full mt-4 bg-success hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                Confirm Sale
              </button>
            </div>
          )}
        </div>

        {/* Recent Sales */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Sales</h2>
          <div className="space-y-3">
            {mockSales.slice(0, 6).map((sale) => (
              <div key={sale.id} className="p-3 bg-background rounded-lg">
                <p className="font-medium text-foreground text-sm">
                  {sale.customerName}
                </p>
                <p className="text-xs text-muted mt-1">{sale.date}</p>
                <p className="text-primary font-bold text-sm mt-2">
                  ₹{sale.total.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
