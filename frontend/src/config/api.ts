export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  ENDPOINTS: {
    LOGIN: '/api/token/',
    REFRESH_TOKEN: '/api/token/refresh/',
  }
};