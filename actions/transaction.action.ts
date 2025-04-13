import axiosInstance, { endpoints } from "@/lib/axios"
import { TCreateTransaction } from "@/types/transaction.type"

/**
 * Get all transactions
 * @returns {Promise<TTransaction[]>}
 */
export async function getTransactions() {
    const URL = endpoints.transactions.root
    const response = await axiosInstance.get(URL)
    return response.data
}

/**
 * Get transactions by company id
 * @param {string} companyId
 * @returns {Promise<TTransaction[]>}
 */
export async function getTransactionsByCompanyId(companyId: string) {
    const URL = endpoints.transactions.root + `?companyId=${companyId}`
    const response = await axiosInstance.get(URL)
    return response.data
}

/**
 * Create a new transaction
 * @param {TTransactionFormType} data
 * @returns {Promise<TTransaction>}
 */
export async function createTransaction(data: TCreateTransaction) {
    const URL = endpoints.transactions.root
    const response = await axiosInstance.post(URL, data)
    return response.data
}