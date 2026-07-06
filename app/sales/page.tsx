'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import SalesPage from '@/pages/SalesPage';

const queryClient = new QueryClient();

export default function SalesRoute() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedRoute>
          <Layout>
            <SalesPage />
          </Layout>
        </ProtectedRoute>
      </AuthProvider>
    </QueryClientProvider>
  );
}
