import { getApiClient } from './axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const exportApi = {
  async downloadExcel(year) {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.EXPORT_EXCEL, {
      params: { year },
      responseType: 'blob',
    });
    return response.data;
  },

  async downloadPdf(year) {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.EXPORT_PDF, {
      params: { year },
      responseType: 'blob',
    });
    return response.data;
  },
};
