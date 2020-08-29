import axios from 'axios';
import AutorizationService from '@/services/AutorizationService';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    let originalRequest;
    if (token) {
      originalRequest = config;
      originalRequest.headers.Authorization = `Bearer ${token}`;
    }
    return originalRequest;
  },
  (err) => {
    Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use((response) => response, (err) => {
  const {
    config,
    response: { status },
  } = err;
  const originalRequest = config;
  // if (status === 401 && originalRequest.url === '/auth') { }
  if (status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return AutorizationService.getToken().then((res) => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return axiosInstance(originalRequest);
      }
    });
  }
  return Promise.reject(err);
});

export default axiosInstance;
