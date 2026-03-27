import { getApiClient } from './axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const revenueApi = {
  async getRevenues(params = {}) {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.REVENUES, { params });
    return response.data;
  },

  async getRevenue(id) {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.REVENUE(id));
    return response.data;
  },

  async createRevenue(data) {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.REVENUES, data);
    return response.data;
  },

  async updateRevenue(id, data) {
    const client = getApiClient();
    const response = await client.put(API_ENDPOINTS.REVENUE(id), data);
    return response.data;
  },

  async deleteRevenue(id) {
    const client = getApiClient();
    const response = await client.delete(API_ENDPOINTS.REVENUE(id));
    return response.data;
  },
};
