import { ChevronLeft, ChevronRight, Home, LogOut, Menu, Package, ShoppingCart, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { user, logout } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  // Handle responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname.startsWith(path)

  const allNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'manager', 'employee'] },
    { path: '/products', label: 'Products', icon: Package, roles: ['admin', 'manager', 'employee'] },
    { path: '/sales', label: 'Sales', icon: ShoppingCart, roles: ['admin', 'manager', 'employee'] },
    { path: '/customers', label: 'Customers', icon: Users, roles: ['admin', 'manager'] },
  ]

  const navItems = allNavItems.filter((item) => {
    if (!user) return false
    return item.roles.includes(user.role)
  })

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-20'} 
          bg-card border-r border-border transition-all duration-300 
          flex flex-col fixed md:relative z-50 h-full
          ${sidebarOpen ? 'left-0' : '-left-64 md:left-0'}`}
      >
        {/* Brand/Logo with Toggle Button - Top Left */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
              E
            </div>
            {sidebarOpen && <span className="font-bold text-foreground">ERP</span>}
          </div>

          {/* Toggle Button - Top Right of Sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-background rounded-lg transition-colors md:flex hidden"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-muted" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              onClick={() => {
                navigate(path)
                // Close sidebar on mobile after navigation
                if (isMobile) setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(path)
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted hover:bg-background hover:text-foreground'
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm whitespace-nowrap">{label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-muted truncate capitalize">{user?.role || 'role'}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Toggle Button - Top Left */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg hover:bg-background transition-colors md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-64 md:ml-0' : 'ml-0'}`}>
        <div className="p-4 md:p-6 pt-16 md:pt-6">
          {children}
        </div>
      </div>
    </div>
  )
}