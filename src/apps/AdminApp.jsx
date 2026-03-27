import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import theme from '../styles/theme';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AdminLayout from '../components/layout/AdminLayout';
import LoginPage from '../pages/auth/LoginPage';
import TenantListPage from '../pages/admin/TenantListPage';
import TenantDetailPage from '../pages/admin/TenantDetailPage';
import AuditLogPage from '../pages/audit/AuditLogPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function AdminApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme} locale={viVN}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TenantListPage />} />
              <Route path="tenants" element={<TenantListPage />} />
              <Route path="tenants/:id" element={<TenantDetailPage />} />
              <Route path="audit" element={<AuditLogPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
