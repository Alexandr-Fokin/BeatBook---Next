import { getUserFolderMembers } from "@/actions/app/folder-members";
import { useQuery } from "@tanstack/react-query";

export const useFolderMembers = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["folder-members", userId],
    queryFn: () => getUserFolderMembers(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
