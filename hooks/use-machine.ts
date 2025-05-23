import { getMachineById, getMachines, getMachinesByCompanyId } from "@/actions/machine.action";
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
