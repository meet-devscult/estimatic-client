import axiosInstance, { endpoints } from '@/lib/axios';

export async function getCompany(filters: {search?: string, status?: string, type?: string}) {
    const finalFilters = {
        status: filters.status ? filters.status.toLowerCase() : undefined,
        type: filters.type ? filters.type.toLowerCase() : undefined,
        search: filters.search ? filters.search : undefined,
    }
    const URL = endpoints.companies.root;
    const response = await axiosInstance.get(URL, { params: finalFilters })
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
