import axiosInstance, { endpoints } from "@/lib/axios"
import { TNewMachineSchema } from "@/zod/machine.zod"

/**
 * Get all machines
 * @returns Machines
 */
export async function getMachines() {
    const URL = endpoints.machines.root
    const response = await axiosInstance.get(URL)
    return response.data.data.list
}

/**
 * Get machines by company id
 * @param companyId Company id
 * @returns Machines
 */
export async function getMachinesByCompanyId(companyId: string) {
    const URL = endpoints.machines.root
    const response = await axiosInstance.get(URL, {
        params: {
            company_id: companyId
        }
    })
    return response.data.data.list
}

/**
 * Get machine by id
 * @param id Machine id
 * @returns Machine
 */
export async function getMachineById(id: string) {
    const URL = endpoints.machines.detail(id)
    const response = await axiosInstance.get(URL)
    return response.data.data
}

/**
 * Get all machine types
 * @returns Machine types
 */
export async function getMachineTypes() {
    const URL = endpoints.machines.machine_types
    const response = await axiosInstance.get(URL)
    return response.data.data
}

/**
 * Get all machine categories
 * @returns Machine categories
 */
export async function getMachineCategories() {
    const URL = endpoints.machines.machine_categories
    const response = await axiosInstance.get(URL)
    return response.data.data
}

/**
 * Create a new machine
 * @param machine Machine
 * @returns Machine
 */
export async function createMachine(machine: TNewMachineSchema, companyId: string, method: 'post' | 'put') {
    const URL = endpoints.machines.root
    const response = await axiosInstance[method](URL, { ...machine, company_id: companyId })
    return response.data.data
}