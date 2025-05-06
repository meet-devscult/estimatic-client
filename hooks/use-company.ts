import { createCompany, getCompany, getCompanyById } from "@/actions/company.action";
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

    return { data: data?.data, isLoading, error, isError, refetch, isFetching }
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
        onMutate: async ({data, method}:{data: any, method: 'post' | 'put'}) => {
            await queryClient.cancelQueries({ queryKey: ['company'] })
            const previousData = queryClient.getQueryData(['company'])

            queryClient.setQueryData(['company'], (old: any) => {
                console.log(data, method, old.data.data.list)
                if(method === 'put'){
                    return {
                        ...old,
                        data: {
                            ...old.data,
                            data: {
                                ...old.data.data,
                                list: old.data.data.list.map((company: any) => {
                                    console.log(company.company_id, data.company_id)
                                    return company.company_id === data.company_id ? {...company, status: data.status} : company
                                })
                            }
                        }
                    }
                }
            })

            return { previousData }
        },
        mutationFn: ({data, method}:{data: any, method: 'post' | 'put'}) => createCompany(data, method),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company'] })
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(['company'], context?.previousData)
        },
    })

    return { mutate, isPending, error, isError }
}