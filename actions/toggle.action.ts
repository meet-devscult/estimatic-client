import axiosInstance from "@/lib/axios"


/**
 * Toggle request
 * @param url URL
 * @param data Data
 * @returns Response
 */
export async function toggleRequest(url: string, data: any) {
    const response = await axiosInstance.put(url, data)
    return response
}