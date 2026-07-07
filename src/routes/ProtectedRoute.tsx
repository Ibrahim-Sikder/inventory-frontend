import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Layout } from '../components/Layout'
import { TRole } from './index'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ProtectedRouteProps {
    children: React.ReactNode
    roles?: TRole[]
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth()

    if (isLoading) return <LoadingSpinner />

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (roles && user && !roles.includes(user.role as TRole)) {
        return <Navigate to="/dashboard" replace />
    }

    return <Layout>{children}</Layout>
}