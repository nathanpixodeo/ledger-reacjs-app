import { getApiClient } from './axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const tenantsApi = {
  async getTenants(params = {}) {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.TENANTS, { params });
    return response.data;
  },

  async getTenant(id) {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.TENANT(id));
    return response.data;
  },

  async createTenant(data) {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.TENANTS, data);
    return response.data;
  },

  async updateTenant(id, data) {
    const client = getApiClient();
    const response = await client.put(API_ENDPOINTS.TENANT(id), data);
    return response.data;
  },

  async suspendTenant(id) {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.TENANT_SUSPEND(id));
    return response.data;
  },

  async activateTenant(id) {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.TENANT_ACTIVATE(id));
    return response.data;
  },
};
