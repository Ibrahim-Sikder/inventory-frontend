'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/auth-context';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import DashboardPage from '@/pages/DashboardPage';

const queryClient = new QueryClient();

export default function DashboardRoute() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProtectedRoute>
          <Layout>
            <DashboardPage />
          </Layout>
        </ProtectedRoute>
      </AuthProvider>
    </QueryClientProvider>
  );
}
