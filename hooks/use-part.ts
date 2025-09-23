import { getPartById, getParts, getPartsByCompanyId, getPartsByUserId } from "@/actions/part.action";
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

export function usePartByUserId(userId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['parts', 'user', userId],
        queryFn: () => getPartsByUserId(userId),
    })

    return { data, isLoading }
}

export function usePartById(id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['parts', id],
        enabled: !!id,
        queryFn: () => getPartById(id),
    })

    return { data, isLoading }
}