import { getPartByUserIdAndCompanyId } from "@/actions/part.action";
import { getUserById, getUsers, getUsersByCompanyId } from "@/actions/users.action";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
    })

    return { data, isLoading }
}

export function useUserById(id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['users', id],
        queryFn: () => getUserById(id),
    })

    return { data, isLoading }
}

export function useUserByCompanyId(companyId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['users', 'company', companyId],
        queryFn: () => getUsersByCompanyId(companyId),
    })

    return { data, isLoading }
}

export function useUserPartsByCompanyId(id: string, companyId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['users', 'parts', companyId, id],
        queryFn: () => getPartByUserIdAndCompanyId(id, companyId),
    })

    return { data, isLoading }
}