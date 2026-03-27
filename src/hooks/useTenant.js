import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { tenantsApi } from '../api/tenants';

export function useTenants(params) {
  return useQuery({
    queryKey: ['tenants', params],
    queryFn: () => tenantsApi.getTenants(params),
    select: (data) => data.data,
  });
}

export function useTenant(id) {
  return useQuery({
    queryKey: ['tenant', id],
    queryFn: () => tenantsApi.getTenant(id),
    select: (data) => data.data,
    enabled: !!id,
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => tenantsApi.createTenant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      message.success('Tạo khách hàng thành công');
    },
    onError: () => {
      message.error('Tạo khách hàng thất bại');
    },
  });
}

export function useSuspendTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => tenantsApi.suspendTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      message.success('Đã tạm ngưng khách hàng');
    },
  });
}

export function useActivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => tenantsApi.activateTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      message.success('Đã kích hoạt khách hàng');
    },
  });
}
