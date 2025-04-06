import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({ baseURL: 'http://localhost:9898' });

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

const PRE_ROUTE = '';

export const endpoints = {
    companies: {
        root: `${PRE_ROUTE}/companies`,
        detail: (id: string) => `${PRE_ROUTE}/companies/${id}`,
    },
}