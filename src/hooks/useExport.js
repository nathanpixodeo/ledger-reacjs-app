import { useMutation } from '@tanstack/react-query';
import { saveAs } from 'file-saver';
import { message } from 'antd';
import { exportApi } from '../api/export';

export function useExportExcel() {
  return useMutation({
    mutationFn: (year) => exportApi.downloadExcel(year),
    onSuccess: (blob, year) => {
      saveAs(blob, `doanh-thu-${year}.xlsx`);
      message.success('Xuất Excel thành công');
    },
    onError: () => {
      message.error('Xuất Excel thất bại');
    },
  });
}

export function useExportPdf() {
  return useMutation({
    mutationFn: (year) => exportApi.downloadPdf(year),
    onSuccess: (blob, year) => {
      saveAs(blob, `bao-cao-${year}.pdf`);
      message.success('Xuất PDF thành công');
    },
    onError: () => {
      message.error('Xuất PDF thất bại');
    },
  });
}
