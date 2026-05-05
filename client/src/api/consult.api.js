import apiClient from './client.js';

export const consultApi = {
  analyze: async (formData) => {
    return await apiClient.post('/consult/analyze', formData);
  },

  sendFollowup: async (sessionId, question) => {
    return await apiClient.post(`/consult/followup/${sessionId}`, { question });
  },

  getSessions: async () => {
    return await apiClient.get('/consult/sessions');
  },

  getSession: async (id) => {
    return await apiClient.get(`/consult/sessions/${id}`);
  },

  deleteSession: async (id) => {
    return await apiClient.delete(`/consult/sessions/${id}`);
  },
};
