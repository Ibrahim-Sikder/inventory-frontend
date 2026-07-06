import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useGetAllSalesQuery } from '../redux/api/saleApi'
import { useGetAllCustomersQuery } from '../redux/api/customerApi'
import { useGetAllProductsQuery } from '../redux/api/productApi'
import { useCreateSaleMutation } from '../redux/api/saleApi'
import Loading from '../components/Loading'
import { RecentSales } from '../components/RecentSales'
import { SalesStats } from '../components/SalesStats'

export function SalesPage() {
  const [saleItems, setSaleItems] = useState<
    Array<{ productId: string; quantity: number; productName?: string; sellPrice?: number }>
  >([])
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // API Hooks
  const { data: customersData, isLoading: isLoadingCustomers } = useGetAllCustomersQuery({
    page: 1,
    limit: 100,
  })

  const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery({
    page: 1,
    limit: 100,
  })

  const {
    data: salesData,
    isLoading: isLoadingSales,
    error,
    refetch
  } = useGetAllSalesQuery({
    page: 1,
    limit: 100,
    sort: '-createdAt',
  })

  const [createSale] = useCreateSaleMutation()

  const customers = customersData?.data || []
  const products = productsData?.data || []
  const sales = salesData?.data || []

  // Calculate stats
  const totalSales = sales.length
  const totalRevenue = sales.reduce((sum: number, sale: any) => sum + sale.grandTotal, 0)
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0

  // Add item to sale
  const addItem = () => {
    if (!selectedProduct || quantity <= 0) {
      toast.error('Please select a product and enter quantity')
      return
    }

    const product = products.find((p: any) => p._id === selectedProduct)
    if (!product) {
      toast.error('Product not found')
      return
    }

    // Check stock
    if (product.stockQuantity < quantity) {
      toast.error(`Insufficient stock. Available: ${product.stockQuantity}`)
      return
    }

    const existingItem = saleItems.find((item) => item.productId === selectedProduct)
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      if (product.stockQuantity < newQuantity) {
        toast.error(`Insufficient stock. Available: ${product.stockQuantity}`)
        return
      }
      setSaleItems(
        saleItems.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    } else {
      setSaleItems([
        ...saleItems,
        {
          productId: selectedProduct,
          quantity,
          productName: product.name,
          sellPrice: product.sellingPrice,
        },
      ])
    }

    setSelectedProduct('')
    setQuantity(1)
    toast.success('Product added to sale')
  }

  const removeItem = (productId: string) => {
    setSaleItems(saleItems.filter((item) => item.productId !== productId))
  }

  const calculateTotal = () => {
    return saleItems.reduce((total, item) => {
      const product = products.find((p: any) => p._id === item.productId)
      return total + (product?.sellingPrice || item.sellPrice || 0) * item.quantity
    }, 0)
  }

  const createSaleHandler = async () => {
    if (!selectedCustomer) {
      toast.error('Please select a customer')
      return
    }

    if (saleItems.length === 0) {
      toast.error('Please add at least one product')
      return
    }

    setIsSubmitting(true)

    try {
      const saleData = {
        customer: selectedCustomer,
        items: saleItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      }

      const result = await createSale(saleData).unwrap()

      if (result.success) {
        toast.success('Sale created successfully! 🎉')
        // Reset form
        setSaleItems([])
        setSelectedCustomer('')
        refetch()
      }
    } catch (err: any) {
      console.error('Error creating sale:', err)
      const errorMessage = err?.data?.message || 'Failed to create sale'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingSales) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-danger">Error loading sales. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    )
  }

  const totalAmount = calculateTotal()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales</h1>
        <p className="text-muted mt-1">Create and manage sales transactions</p>
      </div>

      {/* Stats Cards */}
      <SalesStats
        totalSales={totalSales}
        totalRevenue={totalRevenue}
        averageOrderValue={averageOrderValue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Sale Form */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">
            Create New Sale
          </h2>

          {/* Customer Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Customer *
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoadingCustomers}
            >
              <option value="">Choose a customer...</option>
              {customers.map((customer: any) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name} ({customer.phone})
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
                disabled={isLoadingProducts}
              >
                <option value="">Select a product...</option>
                {products
                  .filter((p: any) => p.stockQuantity > 0)
                  .map((product: any) => (
                    <option key={product._id} value={product._id}>
                      {product.name} - ৳{product.sellingPrice} (Stock: {product.stockQuantity})
                    </option>
                  ))}
              </select>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={addItem}
              disabled={isLoadingProducts}
              className=" cursor-pointer w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
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
                    const product = products.find((p: any) => p._id === item.productId)
                    const price = product?.sellingPrice || item.sellPrice || 0
                    const name = product?.name || item.productName || 'Unknown'
                    return (
                      <tr key={item.productId} className="text-foreground">
                        <td className="py-3">{name}</td>
                        <td className="text-center">৳{price}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right font-medium">
                          ৳{(price * item.quantity).toLocaleString()}
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
                  ৳{totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={createSaleHandler}
                disabled={!selectedCustomer || saleItems.length === 0 || isSubmitting}
                className="w-full mt-4 bg-success hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                {isSubmitting ? 'Creating Sale...' : 'Confirm Sale'}
              </button>
            </div>
          )}
        </div>

        {/* Recent Sales */}
        <RecentSales
          sales={sales}
          totalSales={totalSales}
          totalRevenue={totalRevenue}
          averageOrderValue={averageOrderValue}
          isLoading={isLoadingSales}
        />
      </div>
    </div>
  )
}