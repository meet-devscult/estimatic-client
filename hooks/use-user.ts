import { getPartByUserIdAndCompanyId } from "@/actions/part.action";
import { getAllUsersPermissions, getCompanyAdminUsersDetails, getUserById, getUserPermissions, getUsers, getUsersByCompanyId, mutateUser } from "@/actions/users.action";
import { TNewUserSchema } from "@/zod/user.zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function useUsers() {
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
    })

    return { data, isLoading }
}

export function useUserById(id: string) {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', id],
        enabled: !!id,
        queryFn: () => getUserById(id),
    })

    return { data, isLoading, refetch }
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

/**
 * Create a new transaction
 * @param {TNewUserSchema} data
 * @returns {Promise<TTransaction>}
 */
export function useUserMutation({queryClient, companyId}:{queryClient: QueryClient, companyId: string}) {
    
    const { mutate, isPending, error, isError } = useMutation({
        mutationFn: async ({data, method} :{data: TNewUserSchema, method: 'post' | 'put'}) => await mutateUser(data, method),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users","company", companyId] })
        }
    })

    return { mutate, isPending, error, isError }
}

export function useCompanyAdminUsers() {
    const { data, isLoading } = useQuery({
        queryKey: ['company-admin-users'],
        queryFn: () => getAllUsersPermissions(),
    })

    return { data, isLoading }
}

export function useCompanyAdminUsersDetails(user_id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['company-admin-users-details', user_id],
        enabled: !!user_id,
        queryFn: () => getCompanyAdminUsersDetails(user_id),
    })

    return { data, isLoading }
}

export function useUsersPermissions() {
    const { data, isLoading } = useQuery({
        queryKey: ['users-permissions'],
        queryFn: () => getUserPermissions(),
    })

    return { data, isLoading }
}