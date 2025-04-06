import axiosInstance, { endpoints } from '@/lib/axios';

export async function getCompany() {
    const URL = endpoints.companies.root;
    const response = await axiosInstance.get(URL)
    return response
}