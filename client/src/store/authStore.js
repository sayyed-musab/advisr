import { create } from 'zustand';
import { authApi } from '../api/auth.api.js';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true, // Start true so we can check session on load
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(email, password);
      set({ user: response.data, isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.signup(name, email, password);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.getMe();
      set({ user: response.data, isLoading: false });
    } catch (error) {
      // It's okay if this fails (e.g., user not logged in)
      set({ user: null, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
