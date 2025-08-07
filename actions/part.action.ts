import axiosInstance, { endpoints } from "@/lib/axios"

export async function getParts() {
    const URL = endpoints.parts.root
    const response = await axiosInstance.get(URL)
    return response.data.data.list
}

export async function getPartsByCompanyId(companyId: string) {
    const URL = endpoints.parts.root + `?company_id=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getPartsByUserId(userId: string) {
    const URL = endpoints.parts.root + `?user_id=${userId}`
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getPartById(id: string) {
    const URL = endpoints.parts.detail(id)
    const response = await axiosInstance.get(URL)
    return response.data.data[0]
}

export async function getPartByUserIdAndCompanyId(userId: string, companyId: string) {
    const URL = endpoints.parts.root + `?user_id=${userId}&company_id=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getSignedUrl(file_id: string, file_type: "glb" | "step") {
	const URL = endpoints.parts.signed_url;
    const params = {
        ...(file_type === "glb" && { glb_key: file_id }),
        ...(file_type === "step" && { step_key: file_id }),
    }

	const response = await axiosInstance.post(URL, params);
	return response.data.data;
}
