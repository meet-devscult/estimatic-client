import { getCompany, getCompanyById, mutateCompany } from "@/actions/company.action";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

/**
 * Get all companies
 * @returns {Promise<TCompany[]>}
 */
export function useCompany() {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompany(),
    })

    return { data: data, isLoading, error, isError, refetch, isFetching }
}

/**
 * Get company by id
 * @param {string} id
 * @returns {Promise<TCompany>}
 */
export function useCompanyById(id: string) {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['company', id],
        queryFn: () => getCompanyById(id),
    })

    return { data: data?.data, isLoading, error, isError, refetch, isFetching }
}

export function useCompanyMutation({queryClient}:{queryClient: QueryClient}) {

    const { mutate, isPending, error, isError } = useMutation({
        mutationFn: ({data, method}:{data: any, method: 'post' | 'put'}) => mutateCompany(data, method),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company'] })
        },
    })

    return { mutate, isPending, error, isError }
}