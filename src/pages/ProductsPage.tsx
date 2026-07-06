import { useState, useMemo } from 'react'
import { mockProducts } from '../data/mockData'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'

export function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredProducts = useMemo(
    () =>
      mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Add New Product
          </h2>
          <form className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="col-span-2 px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="SKU"
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Category"
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Buy Price"
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Sell Price"
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Stock"
              className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
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
                Add Product
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
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{product.icon}</div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-background rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4 text-muted hover:text-foreground" />
                </button>
                <button className="p-2 hover:bg-background rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-danger" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
            <p className="text-xs text-muted mb-4">{product.sku}</p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Category:</span>
                <span className="text-foreground font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Buy Price:</span>
                <span className="text-foreground font-medium">₹{product.buyPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Sell Price:</span>
                <span className="text-primary font-medium">₹{product.sellPrice}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">Stock Level</span>
                <span className={`text-sm font-bold ${
                  product.stock > 10 ? 'text-success' : product.stock > 5 ? 'text-warning' : 'text-danger'
                }`}>
                  {product.stock} units
                </span>
              </div>
              <div className="w-full bg-card rounded-full h-2">
                <div
                  className={`h-full rounded-full ${
                    product.stock > 10
                      ? 'bg-success'
                      : product.stock > 5
                      ? 'bg-warning'
                      : 'bg-danger'
                  }`}
                  style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No products found</p>
        </div>
      )}
    </div>
  )
}
