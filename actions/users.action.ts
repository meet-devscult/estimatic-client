import axiosInstance, { endpoints } from "@/lib/axios"

export async function getUsers() {
    const URL = endpoints.users.root
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getUsersByCompanyId(companyId: string) {
    const URL = endpoints.users.root + `?companyId=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getUserById(id: string) {
    const URL = endpoints.users.root + `/${id}`
    const response = await axiosInstance.get(URL)
    return response.data
}
