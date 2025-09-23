import { toggleRequest } from "@/actions/toggle.action"
import { useMutation } from "@tanstack/react-query"

import { QueryClient } from "@tanstack/react-query"

export function useToggleMutation({queryClient, queryKey}:{queryClient: QueryClient, queryKey: string[]}) {

    const { mutate, isPending, error, isError } = useMutation({
        onMutate: async ({data, url}:{data: any, url: string}) => {
            await queryClient.cancelQueries({ queryKey: queryKey })
            const previousData = queryClient.getQueryData(queryKey)

            queryClient.setQueryData(queryKey, (old: any) => {
                if(data.user_id){
                    return old.map((company: any) => {
                        return company.user_id === data.user_id ? {...company, status: data.status} : company
                    })
                }
                if(data.machine_id){
                    return old.map((company: any) => {
                        return company.machine_id === data.machine_id ? {...company, status: data.status} : company
                    })
                }
                if(data.company_id){
                    return old.map((company: any) => {
                        return company.company_id === data.company_id ? {...company, status: data.status} : company
                    })
                }
            })
            return { previousData }
        },
        mutationFn: ({data, url}:{data: any, url: string}) => toggleRequest(url, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKey })
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousData)
        },
    })

    return { mutate, isPending, error, isError }
}