import { createMachine, getMachineById, getMachineCategories, getMachines, getMachinesByCompanyId, getMachineTypes } from "@/actions/machine.action";
import { TNewMachineSchema } from "@/zod/machine.zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useMachines() {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['machines'],
        queryFn: () => getMachines(),
    })

    return { data, isLoading, error, isError, refetch, isFetching }
}

export function useMachineByCompanyId(companyId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['machines', 'company', companyId],
        queryFn: () => getMachinesByCompanyId(companyId),
    })

    return { data, isLoading }
}

export function useMachineById(id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['machines', id],
        queryFn: () => getMachineById(id),
    })

    return { data, isLoading }
}


export function useMachineTypes() {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['machine-types'],
        queryFn: () => getMachineTypes(),
    })

    return { data, isLoading, error, isError, refetch, isFetching }
}

export function useMachineCategories() {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['machine-categories'],
        queryFn: () => getMachineCategories(),
    })

    return { data, isLoading, error, isError, refetch, isFetching }
}

/**
 * Create a new transaction
 * @param {TTransactionFormType} data
 * @returns {Promise<TTransaction>}
 */
export function useMachineMutation(queryClient: QueryClient, companyId: string) {
    const { mutate, isPending, error, isError } = useMutation({
        // onMutate: async ({data, method}:{data: any, method: 'post' | 'put'}) => {
        //     await queryClient.cancelQueries({ queryKey: ['machines', 'company', companyId] })
        //     const previousData = queryClient.getQueryData(['machines', 'company', companyId])

        //     queryClient.setQueryData(['machines', 'company', companyId], (old: any) => {
        //         console.log(data, method, old.data.data.list)
        //         if(method === 'put'){
        //             return {
        //                 ...old,
        //                 data: {
        //                     ...old.data,
        //                     data: {
        //                         ...old.data.data,
        //                         list: old.data.data.list.map((machine: any) => {
        //                             console.log(machine.machine_id, data.machine_id)
        //                             return machine.machine_id === data.machine_id ? {...machine, status: data.status} : machine
        //                         })
        //                     }
        //                 }
        //             }
        //         }
        //     })

        //     return { previousData }
        // },
        mutationFn: async ({data, method}: {data: TNewMachineSchema, method: 'post' | 'put'}) => await createMachine(data, companyId, method),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['machines', 'company', companyId] })
        }
    })

    return { mutate, isPending, error, isError }
}