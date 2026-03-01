import { getUserItems } from "@/actions/app/items"
import { useQuery } from "@tanstack/react-query"

export const useUserItems = (userId:string) => {
    return useQuery({
        queryKey: ['user-items', userId],
        queryFn: () => getUserItems(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    })
}