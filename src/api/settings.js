import { getApiClient } from './axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const settingsApi = {
  async getSettings() {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.SETTINGS);
    return response.data;
  },

  async updateSettings(data) {
    const client = getApiClient();
    const response = await client.put(API_ENDPOINTS.SETTINGS, data);
    return response.data;
  },

  async uploadLogo(file) {
    const client = getApiClient();
    const formData = new FormData();
    formData.append('logo', file);
    const response = await client.post(API_ENDPOINTS.UPLOAD_LOGO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
