import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  },
);
