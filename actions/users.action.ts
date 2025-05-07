import axiosInstance, { endpoints } from "@/lib/axios"
import { TNewUserSchema } from "@/zod/user.zod"

export async function getUsers() {
    const URL = endpoints.users.root
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getUsersByCompanyId(companyId: string) {
    const URL = endpoints.users.root
    const response = await axiosInstance.get(URL, {
        params: {
            company_id: companyId
        }
    })
    return response.data.data.list
}

export async function getUserById(id: string) {
    const URL = endpoints.users.root + `/${id}`
    const response = await axiosInstance.get(URL)
    return response.data.data
}

export async function mutateUser(data: TNewUserSchema, method: 'post' | 'put') {
    const URL = endpoints.users.root
    const response = await axiosInstance[method](URL, data)
    return response.data
}