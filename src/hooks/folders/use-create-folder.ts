import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createFolder } from "@/actions/app/folders";

export default function useCreateFolder(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, icon }: { name: string; icon: string }) =>
      createFolder({ name, icon }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", userId] });
    },
  });
}
