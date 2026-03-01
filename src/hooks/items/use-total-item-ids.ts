import { getTotalItemIds } from "@/actions/app/items";
import { useQuery } from "@tanstack/react-query";

export const useTotalItemIds = (userId: string) => {
  return useQuery({
    queryKey: ["total-item-ids", userId],
    queryFn: () => getTotalItemIds(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
