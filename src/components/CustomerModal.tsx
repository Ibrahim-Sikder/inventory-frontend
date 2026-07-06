import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import {
    useCreateCustomerMutation,
    useUpdateCustomerMutation
} from '../redux/api/customerApi'

interface CustomerModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    customer?: any
}

export function CustomerModal({ isOpen, onClose, onSuccess, customer }: CustomerModalProps) {
    const [createCustomer, { isLoading: isCreating }] = useCreateCustomerMutation()
    const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation()

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEditMode = !!customer


    useEffect(() => {
        if (customer) {
            setFormData({
                name: customer.name || '',
                phone: customer.phone || '',
                email: customer.email || '',
                address: customer.address || '',
            })
        } else {
            setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
            })
        }
    }, [customer, isOpen])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            if (!formData.name || !formData.phone) {
                setError('Name and phone number are required')
                setIsSubmitting(false)
                return
            }

            let result

            if (isEditMode) {

                result = await updateCustomer({
                    id: customer._id,
                    data: formData,
                }).unwrap()

                if (result.success) {
                    toast.success('Customer updated successfully! ')
                    onSuccess?.()
                    handleClose()
                }
            } else {
                result = await createCustomer(formData).unwrap()

                if (result.success) {
                    toast.success('Customer created successfully!')
                    onSuccess?.()
                    handleClose()
                }
            }
        } catch (err: any) {
            console.error('Error:', err)
            const errorMessage = err?.data?.message || 'Failed to save customer. Please try again.'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            address: '',
        })
        setError('')
        onClose()
    }

    if (!isOpen) return null

    const isLoading = isCreating || isUpdating || isSubmitting

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">

                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">
                        {isEditMode ? 'Edit Customer' : 'Add New Customer'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-muted" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Customer Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter customer name"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email address (optional)"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter address (optional)"
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 rounded-lg bg-background border border-border text-foreground hover:bg-card transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : isEditMode ? 'Update Customer' : 'Add Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}