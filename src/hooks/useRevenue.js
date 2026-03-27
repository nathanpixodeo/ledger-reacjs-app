import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { revenueApi } from '../api/revenue';

export function useRevenues(year) {
  return useQuery({
    queryKey: ['revenues', year],
    queryFn: () => revenueApi.getRevenues({ year }),
    select: (data) => data.data,
  });
}

export function useCreateRevenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => revenueApi.createRevenue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revenues'] });
      message.success('Thêm doanh thu thành công');
    },
    onError: () => {
      message.error('Thêm doanh thu thất bại');
    },
  });
}

export function useUpdateRevenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => revenueApi.updateRevenue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revenues'] });
      message.success('Cập nhật doanh thu thành công');
    },
    onError: () => {
      message.error('Cập nhật doanh thu thất bại');
    },
  });
}

export function useDeleteRevenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => revenueApi.deleteRevenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revenues'] });
      message.success('Xóa doanh thu thành công');
    },
    onError: () => {
      message.error('Xóa doanh thu thất bại');
    },
  });
}
