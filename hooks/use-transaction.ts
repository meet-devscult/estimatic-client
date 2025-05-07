import { getTransactions, getTransactionsByCompanyId, mutateTransaction } from "@/actions/transaction.action";
import { TTransactionFormType } from "@/zod/transactions.zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

/**
 * Get all transactions
 * @returns {Promise<TTransaction[]>}
 */
export function useTransactions() {
    const { data, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactions(),
    })

    return { data, isLoading, refetch, isRefetching }
}

/**
 * Get transactions by company id
 * @param {string} companyId
 * @returns {Promise<TTransaction[]>}
 */
export function useTransactionByCompanyId(companyId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['transactions', 'company', companyId],
        queryFn: () => getTransactionsByCompanyId(companyId),
    })

    return { data, isLoading }
}

/**
 * Create a new transaction
 * @param {TTransactionFormType} data
 * @returns {Promise<TTransaction>}
 */
export function useMutateTransaction(queryClient: QueryClient, companyId: string) {
    const { mutate, isPending, error, isError } = useMutation({
        mutationFn: async ({data, method}: {data: TTransactionFormType, method: 'post' | 'put'}) => await mutateTransaction(data, companyId, method),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions', 'company', companyId] })
        }
    })

    return { mutate, isPending, error, isError }
}