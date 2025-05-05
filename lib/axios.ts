import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// ==============================

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
      const token = tokenCookie ? tokenCookie.split('=')[1] : null;
      
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (typeof window !== 'undefined') {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        // Handle unauthorized error
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/auth';
      }
    }

    return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

export default axiosInstance;

// ==============================

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ==============================

const PRE_ROUTE = '/api';

export const endpoints = {
  auth:{
    login: `${PRE_ROUTE}/auth/login`,
    logout: `${PRE_ROUTE}/auth/logout`,
  },
  companies: {
    root: `${PRE_ROUTE}/companies`,
    detail: (id: string) => `${PRE_ROUTE}/companies/${id}`,
  },
  users: {
    root: `${PRE_ROUTE}/users`,
    detail: (id: string) => `${PRE_ROUTE}/users/${id}`,
  },
  machines: {
    root: `${PRE_ROUTE}/machines`,
    detail: (id: string) => `${PRE_ROUTE}/machines/${id}`,
    machine_types: `${PRE_ROUTE}/machines/types`,
    machine_categories: `${PRE_ROUTE}/machines/categories`,
  },
  transactions: {
    root: `${PRE_ROUTE}/transactions`,
    detail: (id: string) => `${PRE_ROUTE}/transactions/${id}`,
  },
  parts: {
    root: `${PRE_ROUTE}/parts`,
    detail: (id: string) => `${PRE_ROUTE}/parts/${id}`,
  },
  plants: {
    root: `${PRE_ROUTE}/plants`,
    detail: (id: string) => `${PRE_ROUTE}/plants/${id}`,
  },
}