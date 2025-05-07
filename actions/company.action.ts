import axiosInstance, { endpoints } from '@/lib/axios';

export async function getCompany() {
    const URL = endpoints.companies.root;
    const response = await axiosInstance.get(URL)
    return response.data.data.list
}

export async function getCompanyById(id: string) {
    const URL = endpoints.companies.root + `/${id}`;
    const response = await axiosInstance.get(URL)
    return response
}

export async function mutateCompany(data: any, method: 'post' | 'put') {
    const URL = endpoints.companies.root;
    const response = await axiosInstance[method](URL, data)
    return response
}
