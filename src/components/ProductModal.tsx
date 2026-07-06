import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import {
    useCreateProductMutation,
    useUpdateProductMutation
} from '../redux/api/productApi'
import { ProductModalProps } from '../types/product'



export function ProductModal({ isOpen, onClose, onSuccess, product }: ProductModalProps) {
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        purchasePrice: '',
        sellingPrice: '',
        stockQuantity: '',
    })
    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEditMode = !!product

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                sku: product.sku || '',
                category: product.category || '',
                purchasePrice: product.purchasePrice?.toString() || '',
                sellingPrice: product.sellingPrice?.toString() || '',
                stockQuantity: product.stockQuantity?.toString() || '',
            })
            if (product.images && product.images.length > 0) {
                setImagePreviews(product.images)
            }
        }
    }, [product])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            setImages((prev) => [...prev, ...files])


            const newPreviews = files.map((file) => URL.createObjectURL(file))
            setImagePreviews((prev) => [...prev, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            // Validate required fields
            if (!formData.name || !formData.sku || !formData.category ||
                !formData.purchasePrice || !formData.sellingPrice || !formData.stockQuantity) {
                setError('All fields are required')
                setIsSubmitting(false)
                return
            }

            // Validate images for create mode
            if (!isEditMode && images.length === 0) {
                setError('At least one product image is required')
                setIsSubmitting(false)
                return
            }

            let result

            if (isEditMode) {
                const updateData = new FormData()
                updateData.append('name', formData.name)
                updateData.append('sku', formData.sku)
                updateData.append('category', formData.category)
                updateData.append('purchasePrice', formData.purchasePrice)
                updateData.append('sellingPrice', formData.sellingPrice)
                updateData.append('stockQuantity', formData.stockQuantity)

                images.forEach((image) => {
                    updateData.append('images', image)
                })

                result = await updateProduct({
                    id: product._id,
                    data: updateData,
                }).unwrap()

                if (result.success) {
                    toast.success('Product updated successfully! ')
                    onSuccess?.()
                    handleClose()
                }
            } else {
                // Create Mode
                const submitData = new FormData()
                submitData.append('name', formData.name)
                submitData.append('sku', formData.sku)
                submitData.append('category', formData.category)
                submitData.append('purchasePrice', formData.purchasePrice)
                submitData.append('sellingPrice', formData.sellingPrice)
                submitData.append('stockQuantity', formData.stockQuantity)

                // Append images
                images.forEach((image) => {
                    submitData.append('images', image)
                })

                result = await createProduct(submitData).unwrap()

                if (result.success) {
                    toast.success('Product created successfully! ')
                    onSuccess?.()
                    handleClose()
                }
            }
        } catch (err: any) {
            console.error('Error:', err)
            const errorMessage = err?.data?.message || 'Failed to save product. Please try again.'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setFormData({
            name: '',
            sku: '',
            category: '',
            purchasePrice: '',
            sellingPrice: '',
            stockQuantity: '',
        })
        setImages([])
        setImagePreviews([])
        setError('')
        onClose()
    }

    if (!isOpen) return null

    const isLoading = isCreating || isUpdating || isSubmitting

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">
                        {isEditMode ? 'Edit Product' : 'Add New Product'}
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                SKU *
                            </label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                placeholder="Enter SKU"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Category *
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Enter category"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Purchase Price *
                            </label>
                            <input
                                type="number"
                                name="purchasePrice"
                                value={formData.purchasePrice}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Selling Price *
                            </label>
                            <input
                                type="number"
                                name="sellingPrice"
                                value={formData.sellingPrice}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Stock Quantity *
                            </label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleInputChange}
                                placeholder="0"
                                min="0"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Product Images {!isEditMode && '*'}
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="w-full flex flex-col items-center px-4 py-6 bg-background border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-background/50 transition-colors">
                                    <Upload className="w-8 h-8 text-muted mb-2" />
                                    <span className="text-sm text-muted">
                                        Click to upload or drag and drop
                                    </span>
                                    <span className="text-xs text-muted mt-1">
                                        PNG, JPG, JPEG (Max 5MB each)
                                    </span>
                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-4 gap-3 mt-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg border border-border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                            {isLoading ? 'Saving...' : isEditMode ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}