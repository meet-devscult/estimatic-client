import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${process.env.NEXT_PUBLIC_TOKEN}`
  }
});

// ==============================

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
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
    machine_types: `${PRE_ROUTE}/machineTypes`,
    machine_categories: `${PRE_ROUTE}/machineCategories`,
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