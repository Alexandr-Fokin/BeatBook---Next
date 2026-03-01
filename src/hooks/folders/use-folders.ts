import { useQuery } from "@tanstack/react-query";
import { getUserFolders } from "../../actions/app/folders";

export function useFolders(userId: string) {
  return useQuery({
    queryKey: ["folders", userId],
    queryFn: () => getUserFolders(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}