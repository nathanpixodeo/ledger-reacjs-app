import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => authApi.login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate('/');
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      navigate('/login');
    },
    onError: () => {
      // Even if logout API fails, clear local state
      clearAuth();
      queryClient.clear();
      navigate('/login');
    },
  });
}

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const data = await authApi.me();
      setAuth(data.user, token);
      return data.user;
    },
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000,
  });
}
