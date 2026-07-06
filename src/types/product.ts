export interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    product?: any
}