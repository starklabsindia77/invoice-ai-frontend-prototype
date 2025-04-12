
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base API configuration
const apiConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com', // Fallback to a default URL
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create a base API instance
const apiClient: AxiosInstance = axios.create(apiConfig);

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // You can modify the request here, for example to add auth tokens
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (e.g., token expiration)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Implement token refresh or logout logic here
      // For example:
      // await refreshToken();
      // return apiClient(originalRequest);
      
      // Or just redirect to login:
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
