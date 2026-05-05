import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Standardize error message extraction from our backend response structure
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Pass the message and status code back down
    return Promise.reject({
      message,
      status: error.response?.status,
    });
  }
);

export default apiClient;
