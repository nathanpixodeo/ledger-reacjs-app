import { getApiClient } from './axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const importApi = {
  async importExcel(data) {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.IMPORT_EXCEL, { records: data });
    return response.data;
  },
};
