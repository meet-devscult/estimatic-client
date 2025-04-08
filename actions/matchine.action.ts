import axiosInstance, { endpoints } from "@/lib/axios"

export async function getMachines() {
    const URL = endpoints.machines.root
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getMachinesByCompanyId(companyId: string) {
    const URL = endpoints.machines.root + `?companyId=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}