import { useState, useMemo } from 'react'
import { Plus, Edit2, Trash2, Search, Loader2, Phone, Mail, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import {
  useDeleteCustomerMutation,
  useGetAllCustomersQuery
} from '../redux/api/customerApi'
import { CustomerModal } from '../components/CustomerModal'
import { CustomerStats } from '../components/CustomerStats'
import Loading from '../components/Loading'

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const { data, isLoading, error, refetch } = useGetAllCustomersQuery({
    page: 1,
    limit: 100,
    searchTerm: searchTerm,
  })

  const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation()

  const customers = data?.data || []

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers
    return customers.filter(
      (customer: any) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        customer.phone.includes(searchTerm)
    )
  }, [customers, searchTerm])

  // Calculate stats
  const totalCustomers = customers.length
  const totalTransactions = customers.reduce(
    (sum: number, c: any) => sum + (c.transactionCount || 0),
    0
  )
  const totalLifetimeValue = customers.reduce(
    (sum: number, c: any) => sum + (c.totalSpent || 0),
    0
  )

  const handleDelete = async (customer: any) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${customer.name}". This action cannot be undone!`,
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
        await deleteCustomer(customer._id).unwrap()
        toast.success(`Customer "${customer.name}" deleted successfully! 🗑️`)
        refetch()
      } catch (error: any) {
        console.error('Error deleting customer:', error)
        const errorMessage = error?.data?.message || 'Failed to delete customer'
        toast.error(errorMessage)
      }
    }
  }

  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCustomer(null)
  }

  const handleModalSuccess = () => {
    refetch()
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-danger">Error loading customers. Please try again.</p>
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
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted mt-1">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => {
            setSelectedCustomer(null)
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <CustomerStats
        totalCustomers={totalCustomers}
        totalTransactions={totalTransactions}
        totalLifetimeValue={totalLifetimeValue}
      />

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="text-sm text-muted">
          {filteredCustomers.length} results
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-background">
              <tr className="text-muted text-xs uppercase">
                <th className="text-left py-4 px-6">Customer</th>
                <th className="text-left py-4 px-6">Contact</th>
                <th className="text-center py-4 px-6">Transactions</th>
                <th className="text-right py-4 px-6">Total Spent</th>
                <th className="text-left py-4 px-6">Last Purchase</th>
                <th className="text-center py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map((customer: any) => (
                <tr key={customer._id} className="hover:bg-background/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        <p className="text-xs text-muted">ID: {customer._id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-muted">
                        <Phone className="w-3 h-3" />
                        <span className="text-foreground">{customer.phone}</span>
                      </div>
                      {customer.email && (
                        <div className="flex items-center gap-2 text-muted">
                          <Mail className="w-3 h-3" />
                          <span className="text-foreground">{customer.email}</span>
                        </div>
                      )}
                      {customer.address && (
                        <div className="flex items-center gap-2 text-muted">
                          <MapPin className="w-3 h-3" />
                          <span className="text-foreground text-xs">{customer.address}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center font-medium text-foreground">
                    {customer.transactionCount || 0}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-primary">
                    ৳{(customer.totalSpent || 0).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-muted">
                    {customer.lastPurchase || 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Edit customer"
                      >
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button
                        onClick={() => handleDelete(customer)}
                        disabled={isDeleting}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                        title="Delete customer"
                      >
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
          <p className="text-muted">
            {searchTerm ? 'No customers found matching your search' : 'No customers available'}
          </p>
        </div>
      )}

      {/* Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        customer={selectedCustomer}
      />
    </div>
  )
}