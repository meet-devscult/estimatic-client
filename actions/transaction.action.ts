import axiosInstance, { endpoints } from "@/lib/axios"
import { TTransactionFormType } from "@/zod/transactions.zod"

/**
 * Get all transactions
 * @returns {Promise<TTransaction[]>}
 */
export async function getTransactions() {
    const URL = endpoints.transactions.root
    const response = await axiosInstance.get(URL)
    return response.data.data.list
}

/**
 * Get transactions by company id
 * @param {string} companyId
 * @returns {Promise<TTransaction[]>}
 */
export async function getTransactionsByCompanyId(companyId: string) {
    const URL = endpoints.transactions.root
    const response = await axiosInstance.get(URL, { params: { company_id: companyId } })
    return response.data.data.list
}

/**
 * Create a new transaction
 * @param {TTransactionFormType} data
 * @returns {Promise<TTransaction>}
 */
export async function mutateTransaction(data: TTransactionFormType, companyId: string, method: 'post' | 'put') {
    const URL = endpoints.transactions.root
    const response = await axiosInstance[method](URL, { ...data, reason: data.reason || 'TEMP REASON', company_id: companyId })
    return response.data.data
}