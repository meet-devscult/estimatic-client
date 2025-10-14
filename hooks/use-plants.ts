import { getPlantByCompanyId, mutatePlant } from "@/actions/plants.action";
import { TPlantSchema } from "@/zod/plant.zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export function usePlantsByCompanyId(companyId: string) {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['plants', 'company', companyId],
        queryFn: () => getPlantByCompanyId(companyId),
        enabled: !!companyId
    })
    return { data, isLoading, refetch }
}

export function usePlantMutation({queryClient, companyId}:{queryClient: QueryClient, companyId: string}) {
    
    const { mutate, isPending, error, isError } = useMutation({
        mutationFn: async ({data, method} :{data: TPlantSchema, method: 'post' | 'put'}) => await mutatePlant(data, method),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["plants","company", companyId] })
        }
    })

    return { mutate, isPending, error, isError }
}