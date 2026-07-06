import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Layout } from '../components/Layout'
import { TRole } from './index'

interface ProtectedRouteProps {
    children: React.ReactNode
    roles?: TRole[]
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (roles && user && !roles.includes(user.role as TRole)) {
        return <Navigate to="/dashboard" replace />
    }

    return <Layout>{children}</Layout>
}