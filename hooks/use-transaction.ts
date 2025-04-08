import { getTransactions, getTransactionsByCompanyId } from "@/actions/transaction.action";
import { useQuery } from "@tanstack/react-query";

export function useTransactions() {
    const { data, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactions(),
    })

    return { data, isLoading }
}
export function useTransactionByCompanyId(companyId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['transactions', 'company', companyId],
        queryFn: () => getTransactionsByCompanyId(companyId),
    })

    return { data, isLoading }
}
