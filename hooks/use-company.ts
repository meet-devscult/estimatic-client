import { getCompany, getCompanyById } from "@/actions/company.action";
import { useQuery } from "@tanstack/react-query";


export function useCompany() {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompany(),
    })

    return { data, isLoading, error, isError, refetch, isFetching }
}

export function useCompanyById(id: string) {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['company', id],
        queryFn: () => getCompanyById(id),
    })

    return { data, isLoading, error, isError, refetch, isFetching }
}
