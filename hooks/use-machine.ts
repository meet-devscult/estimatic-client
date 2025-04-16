import { getMachineById, getMachines, getMachinesByCompanyId, getMachineTypes } from "@/actions/machine.action";
import { useQuery } from "@tanstack/react-query";

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
        queryFn: () => getMachineTypes(),
    })

    return { data, isLoading, error, isError, refetch, isFetching }
}