import axiosInstance, { endpoints } from "@/lib/axios"
import { TPlantSchema } from "@/zod/plant.zod"

export async function getPlants() {
    const URL = endpoints.plants.root
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getPlantByCompanyId(companyId: string) {
    const URL = endpoints.plants.root
    const response = await axiosInstance.get(URL, {
        params: {
            company_id: companyId
        }
    })
    return response.data.data.list
}

export async function deletePlant(plant_id: string) {
    const URL = endpoints.plants.delete
    const response = await axiosInstance.put(URL, {
        plant_id
    })
    return response.data
}

export async function mutatePlant(data: TPlantSchema, method: 'post' | 'put' = 'post') {
    const URL = endpoints.plants.root
    const response = await axiosInstance[method](URL, data)
    return response.data
}