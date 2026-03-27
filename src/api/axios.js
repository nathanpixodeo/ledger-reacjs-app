import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export function createApiClient(tenantSlug) {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(tenantSlug && { 'X-Tenant': tenantSlug }),
    },
  });

  instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// Default client (no tenant slug — used in admin portal or before tenant is resolved)
let defaultClient = null;

export function getApiClient() {
  if (!defaultClient) {
    defaultClient = createApiClient();
  }
  return defaultClient;
}
