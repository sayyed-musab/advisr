import apiClient from './client.js';

export const authApi = {
  signup: async (name, email, password) => {
    return await apiClient.post('/auth/signup', { name, email, password });
  },

  verifyEmail: async (token) => {
    return await apiClient.get(`/auth/verify-email?token=${token}`);
  },

  login: async (email, password) => {
    return await apiClient.post('/auth/login', { email, password });
  },

  logout: async () => {
    return await apiClient.post('/auth/logout');
  },

  getMe: async () => {
    return await apiClient.get('/auth/me');
  },
};
