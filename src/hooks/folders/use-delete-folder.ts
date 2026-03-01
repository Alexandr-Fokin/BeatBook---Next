import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteFolder } from "@/actions/app/folders";

export default function useDeleteFolder(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ publicId }: { publicId: string }) =>
      deleteFolder({ publicId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", userId] });
    },
  });
}
