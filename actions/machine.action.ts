import axiosInstance, { endpoints } from "@/lib/axios"

/**
 * Get all machines
 * @returns Machines
 */
export async function getMachines() {
    const URL = endpoints.machines.root
    const response = await axiosInstance.get(URL)
    return response.data
}

/**
 * Get machines by company id
 * @param companyId Company id
 * @returns Machines
 */
export async function getMachinesByCompanyId(companyId: string) {
    const URL = endpoints.machines.root + `?companyId=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}

/**
 * Get machine by id
 * @param id Machine id
 * @returns Machine
 */
export async function getMachineById(id: string) {
    const URL = endpoints.machines.root + `/${id}`
    const response = await axiosInstance.get(URL)
    return response.data
}

/**
 * Get all machine types
 * @returns Machine types
 */
export async function getMachineTypes() {
    const URL = endpoints.machines.machine_types
    const response = await axiosInstance.get(URL)
    return response.data
}