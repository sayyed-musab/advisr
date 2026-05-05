import { create } from 'zustand';
import { consultApi } from '../api/consult.api.js';

const initialFormData = {
  businessType: '',
  city: '',
  revenue: '',
  businessAge: '',
  problemArea: '',
  teamSize: '',
  urgency: '',
  detail: '',
};

export const useConsultStore = create((set, get) => ({
  step: 1, // 1: Profile, 2: Detail, 3: Report
  formData: initialFormData,
  report: null,
  sessions: [],
  currentSession: null,
  isLoading: false,
  error: null,

  setStep: (step) => set({ step }),
  
  setFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),

  analyze: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await consultApi.analyze(get().formData);
      set({ 
        report: response.data,
        step: 3, 
        isLoading: false 
      });
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  sendFollowup: async (sessionId, question) => {
    set({ isLoading: true, error: null });
    try {
      const response = await consultApi.sendFollowup(sessionId, question);
      // Update the current session with the new followup
      const currentSession = get().currentSession;
      if (currentSession && currentSession.id === sessionId) {
        set({
          currentSession: {
            ...currentSession,
            followups: [
              ...currentSession.followups,
              { question, answer: response.data.answer, createdAt: new Date().toISOString() }
            ]
          },
          isLoading: false
        });
      } else {
        set({ isLoading: false });
      }
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  fetchSessions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await consultApi.getSessions();
      set({ sessions: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchSession: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await consultApi.getSession(id);
      set({ currentSession: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteSession: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await consultApi.deleteSession(id);
      set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  reset: () => set({
    step: 1,
    formData: initialFormData,
    report: null,
    error: null,
  }),
}));
