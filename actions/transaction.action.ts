import axiosInstance, { endpoints } from "@/lib/axios"

export async function getTransactions() {
    const URL = endpoints.transactions.root
    const response = await axiosInstance.get(URL)
    return response.data
}

export async function getTransactionsByCompanyId(companyId: string) {
    const URL = endpoints.transactions.root + `?companyId=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}