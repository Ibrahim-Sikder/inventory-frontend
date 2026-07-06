'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  image: string;
}

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Office Chair',
      sku: 'CHAIR-001',
      category: 'Furniture',
      purchasePrice: 150,
      sellingPrice: 299,
      stock: 15,
      image: '🪑',
    },
    {
      id: 2,
      name: 'Desk Lamp',
      sku: 'LAMP-002',
      category: 'Lighting',
      purchasePrice: 25,
      sellingPrice: 49,
      stock: 8,
      image: '💡',
    },
    {
      id: 3,
      name: 'Monitor Stand',
      sku: 'STAND-003',
      category: 'Accessories',
      purchasePrice: 40,
      sellingPrice: 79,
      stock: 20,
      image: '🖥️',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    purchasePrice: '',
    sellingPrice: '',
    stock: '',
    image: '',
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.sku ||
      !formData.category ||
      !formData.purchasePrice ||
      !formData.sellingPrice ||
      !formData.stock
    ) {
      alert('Please fill all fields');
      return;
    }

    const newProduct: Product = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      purchasePrice: parseFloat(formData.purchasePrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      stock: parseInt(formData.stock),
      image: formData.image || '📦',
    };

    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      sku: '',
      category: '',
      purchasePrice: '',
      sellingPrice: '',
      stock: '',
      image: '',
    });
    setShowForm(false);
  };

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <Layout
      title="Products"
      subtitle="Manage your product inventory with ease"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-text" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="E.g., Office Chair"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">SKU *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="E.g., CHAIR-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="E.g., Furniture"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Purchase Price (৳) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Selling Price (৳) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="299"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image / Icon
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="📦 or image URL"
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  Add Product
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group"
            >
              {/* Product Image Area */}
              <div className="h-32 bg-gradient-to-br from-background to-card flex items-center justify-center text-4xl">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-semibold text-foreground text-sm line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-text">{product.sku}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-muted-text">
                    <span className="font-medium">Category:</span> {product.category}
                  </p>
                  <p className="text-muted-text">
                    <span className="font-medium">Buy Price:</span> ৳{product.purchasePrice}
                  </p>
                  <p className="text-primary font-medium">
                    <span className="text-muted-text">Sell Price:</span> ৳{product.sellingPrice}
                  </p>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-text mb-2">Stock: {product.stock} units</p>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all ${product.stock > 10
                          ? 'bg-green-500'
                          : product.stock > 5
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs bg-background hover:bg-primary/10 text-foreground rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs bg-background hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-card border border-border rounded-lg text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:bg-background'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-card border border-border rounded-lg text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
