import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProductsPage } from './pages/ProductsPage'
import { SalesPage } from './pages/SalesPage'
import { CustomersPage } from './pages/CustomersPage'
import { useAuth } from './hooks/useAuth'

import { useAppDispatch } from './redux/hooks'
import { setUser, setAuthLoading, logout } from './redux/features/auth/authSlice'
import { useLazyGetMeQuery } from './redux/api/auth.api'

type TRole = 'admin' | 'manager' | 'employee'

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: TRole[] }) {
  const { isAuthenticated, isLoading, user } = useAuth()

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-background">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (roles && user && !roles.includes(user.role as TRole)) return <Navigate to="/dashboard" replace />

  return <Layout>{children}</Layout>
}


function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth()

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-background">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Product CRUD: admin + manager only. Employee gets view-only handled inside ProductsPage via role check on buttons */}
      <Route
        path="/products"
        element={
          <ProtectedRoute roles={['admin', 'manager', 'employee']}>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      {/* Sales: everyone except pure viewers can create — admin, manager, employee all allowed per spec */}
      <Route
        path="/sales"
        element={
          <ProtectedRoute roles={['admin', 'manager', 'employee']}>
            <SalesPage />
          </ProtectedRoute>
        }
      />
      {/* Customers module wasn't in the spec's role table — restrict to admin/manager to be safe */}
      <Route
        path="/customers"
        element={
          <ProtectedRoute roles={['admin', 'manager']}>
            <CustomersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  const dispatch = useAppDispatch()
  const [triggerGetMe] = useLazyGetMeQuery()

  useEffect(() => {
    (async () => {
      try {
        const result = await triggerGetMe().unwrap()
        dispatch(setUser(result.data))
      } catch {
        // Only clear user if nobody logged in manually while this request was in flight
        dispatch((_dispatch, getState) => {
          if (!getState().auth.user) {
            dispatch(logout())
          }
        })
      } finally {
        dispatch(setAuthLoading(false))
      }
    })()
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}