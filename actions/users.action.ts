import axiosInstance, { endpoints } from "@/lib/axios"
import { PERMISSIONS } from "@/types/user.type"
import { TRoleCreationSchema } from "@/zod/role.zod"
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
    const response = await axiosInstance[method](URL, {...data, currency: 'INR'}) // TODO: availanle currency list USD, EUR and INR
    return response.data
}

export async function deleteUser(user_id: string) {
    const URL = endpoints.users.delete
    const response = await axiosInstance.put(URL, { user_id })
    return response.data
}

export async function changeUserPassword(data: { user_id: string | null, new_password: string }) {
    const URL = endpoints.users.update_password
    const response = await axiosInstance.put(URL, data)
    return response.data
}

export async function createCompanyAdminUser(data: TRoleCreationSchema) {
    const URL = endpoints.users.create_company_admin
    const response = await axiosInstance.post(URL, {...data})
    return response.data
}

export async function updateCompanyAdminUserPermissions(data: { user_id: string, permissions: PERMISSIONS}) {
    const URL = endpoints.users.create_company_admin
    const response = await axiosInstance.put(URL, {...data})
    return response.data
}

export async function getAllUsersPermissions () {
    const URL = endpoints.users.user_permissions
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getCompanyAdminUsersDetails(user_id: string) {
    const URL = endpoints.users.user_permissions + `/${user_id}`
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getUserPermissions() {
    const URL = endpoints.users.get_permissions
    const response = await axiosInstance.get(URL)
    return response.data
}