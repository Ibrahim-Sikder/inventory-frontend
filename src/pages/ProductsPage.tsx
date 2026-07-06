import { useState, useMemo } from 'react'
import { Search, Plus, Edit2, Trash2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import {
  useDeleteProductMutation,
  useGetAllProductsQuery
} from '../redux/api/productApi'
import { ProductModal } from './ProductModal'

export function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Fetch products from API
  const { data, isLoading, error, refetch } = useGetAllProductsQuery({
    page: 1,
    limit: 100,
    searchTerm: searchTerm,
  })

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const products = data?.data || []

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    return products.filter(
      (product: any) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  const handleDelete = async (product: any) => {
    // Show SweetAlert confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${product.name}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      try {
        await deleteProduct(product._id).unwrap()

        // Show success toast
        toast.success(`Product "${product.name}" deleted successfully! 🗑️`)

        // Refresh the product list
        refetch()
      } catch (error: any) {
        console.error('Error deleting product:', error)
        const errorMessage = error?.data?.message || 'Failed to delete product'
        toast.error(errorMessage)
      }
    }
  }

  const handleEdit = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleModalSuccess = () => {
    refetch()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-danger">Error loading products. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted mt-1">
            Manage your product inventory ({products.length} products)
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null)
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

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
        <div className="text-sm text-muted">
          {filteredProducts.length} results
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: any) => (
          <div
            key={product._id}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-2">
                {product.images && product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                  title="Edit product"
                >
                  <Edit2 className="w-4 h-4 text-muted hover:text-foreground" />
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  disabled={isDeleting}
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4 text-danger" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
            <p className="text-xs text-muted mb-4">SKU: {product.sku}</p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Category:</span>
                <span className="text-foreground font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Buy Price:</span>
                <span className="text-foreground font-medium">₹{product.purchasePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Sell Price:</span>
                <span className="text-primary font-medium">₹{product.sellingPrice}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">Stock Level</span>
                <span className={`text-sm font-bold ${product.stockQuantity > 10 ? 'text-success' :
                  product.stockQuantity > 5 ? 'text-warning' : 'text-danger'
                  }`}>
                  {product.stockQuantity} units
                </span>
              </div>
              <div className="w-full bg-card rounded-full h-2">
                <div
                  className={`h-full rounded-full ${product.stockQuantity > 10 ? 'bg-success' :
                    product.stockQuantity > 5 ? 'bg-warning' : 'bg-danger'
                    }`}
                  style={{ width: `${Math.min((product.stockQuantity / 20) * 100, 100)}` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">
            {searchTerm ? 'No products found matching your search' : 'No products available'}
          </p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        product={selectedProduct}
      />
    </div>
  )
}