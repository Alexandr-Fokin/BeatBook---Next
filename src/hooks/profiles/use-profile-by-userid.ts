import { getProfileByUserId } from "@/actions/app/profiles"
import { useQuery } from "@tanstack/react-query"

export const useProfileByUserId = (userId:string) => {
    return useQuery({
        queryKey: ['profile-by-id', userId],
        queryFn: () => getProfileByUserId(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    })
}