import { getUsers, getUsersByCompanyId } from "@/actions/users.action";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
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
