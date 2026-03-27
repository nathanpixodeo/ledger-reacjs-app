import { getApiClient } from './axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const authApi = {
  async login(email, password) {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.LOGIN, { email, password });
    return response.data;
  },

  async logout() {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  },

  async me() {
    const client = getApiClient();
    const response = await client.get(API_ENDPOINTS.ME);
    return response.data;
  },

  async forgotPassword(email) {
    const client = getApiClient();
    const response = await client.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    return response.data;
  },

  async getCsrfCookie() {
    const client = getApiClient();
    await client.get(API_ENDPOINTS.CSRF_COOKIE);
  },
};
