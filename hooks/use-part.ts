import { getParts, getPartsByCompanyId } from "@/actions/part.action";
import { useQuery } from "@tanstack/react-query";

export function useParts() {
    const { data, isLoading } = useQuery({
        queryKey: ['parts'],
        queryFn: () => getParts(),
    })

    return { data, isLoading }
}
export function usePartByCompanyId(companyId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['parts', 'company', companyId],
        queryFn: () => getPartsByCompanyId(companyId),
    })

    return { data, isLoading }
}
