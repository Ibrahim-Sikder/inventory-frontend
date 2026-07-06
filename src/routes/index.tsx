import { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ProductsPage } from '../pages/ProductsPage'
import { SalesPage } from '../pages/SalesPage'
import { CustomersPage } from '../pages/CustomersPage'
import { ProtectedRoute } from './ProtectedRoute'

export type TRole = 'admin' | 'manager' | 'employee'

export interface RouteConfig {
  path: string
  element: React.ReactNode
  roles?: TRole[]
  isPublic?: boolean
  children?: RouteConfig[]
}

export const routeConfigs: RouteConfig[] = [
  {
    path: '/login',
    element: <LoginPage />,
    isPublic: true,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    roles: ['admin', 'manager', 'employee'],
  },
  {
    path: '/products',
    element: <ProductsPage />,
    roles: ['admin', 'manager', 'employee'],
  },
  {
    path: '/sales',
    element: <SalesPage />,
    roles: ['admin', 'manager', 'employee'],
  },
  {
    path: '/customers',
    element: <CustomersPage />,
    roles: ['admin', 'manager'],
  },
]


export const generateRoutes = (isAuthenticated: boolean) => {
  const routes: RouteObject[] = []

  routeConfigs.forEach((route) => {
    if (route.isPublic) {
      routes.push({
        path: route.path,
        element: isAuthenticated ? <Navigate to="/dashboard" replace /> : route.element,
      })
    } else {
      routes.push({
        path: route.path,
        element: <ProtectedRoute roles={route.roles}>{route.element}</ProtectedRoute>,
      })
    }
  })

  routes.push({
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  })

  return routes
}