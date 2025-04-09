import axiosInstance, { endpoints } from "@/lib/axios"

export async function getParts() {
    const URL = endpoints.parts.root
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getPartsByCompanyId(companyId: string) {
    const URL = endpoints.parts.root + `?companyId=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getPartById(id: string) {
    const URL = endpoints.parts.root + `/${id}`
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getPartByUserIdAndCompanyId(userId: string, companyId: string) {
    const URL = endpoints.parts.root + `?userId=${userId}&companyId=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}