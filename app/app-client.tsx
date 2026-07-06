'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ProductsPage from '@/pages/ProductsPage';
import SalesPage from '@/pages/SalesPage';
import CustomersPage from '@/pages/CustomersPage';

const queryClient = new QueryClient();

function AppContent() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Login page is accessible without auth
  if (pathname === '/login') {
    return <LoginPage />;
  }

  // Protect all other routes
  if (!isAuthenticated) {
    if (mounted) {
      router.push('/login');
    }
    return null;
  }

  // Route rendering
  switch (pathname) {
    case '/dashboard':
      return <DashboardPage />;
    case '/products':
      return <ProductsPage />;
    case '/sales':
      return <SalesPage />;
    case '/customers':
      return <CustomersPage />;
    default:
      return <DashboardPage />;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
