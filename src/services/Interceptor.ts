import axios from 'axios';
import { getAuthToken } from './Storage';

const axiosInterceptorInstance = axios.create();

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAuthToken()?.token;

    if (accessToken) {
      if (config.headers) config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;