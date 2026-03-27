import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import theme from '../styles/theme';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/auth/LoginPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import RevenueListPage from '../pages/revenue/RevenueListPage';
import ExportPage from '../pages/export/ExportPage';
import ImportPage from '../pages/import/ImportPage';
import CompanySettingsPage from '../pages/settings/CompanySettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function TenantApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme} locale={viVN}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="revenue" element={<RevenueListPage />} />
              <Route path="export" element={<ExportPage />} />
              <Route path="import" element={<ImportPage />} />
              <Route path="settings" element={<CompanySettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
