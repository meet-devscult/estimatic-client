import { getCompany } from "@/actions/company.action";
import { useQuery } from "@tanstack/react-query";


export function useCompany() {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompany(),
    })

    return { data, isLoading, error, isError, refetch, isFetching }
}