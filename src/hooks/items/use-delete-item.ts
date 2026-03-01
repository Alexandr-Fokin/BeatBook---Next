import { addItemToFolder, deleteItemFromFolder } from "@/actions/app/items";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useDeleteItem = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      folderId,
      item,
    }: {
      folderId: string;
      item: SupabaseAlbum | SupabaseTrack;
    }) => deleteItemFromFolder({ folderId, item }),
    onSuccess: (_, variables) => {
      // обновляем айтемы конкретной папки
      queryClient.invalidateQueries({
        queryKey: ["folder-items", variables.folderId],
      });

      // обновляем все айтемы (твои вместе с добавленными другими людьми в твоих папках)
      queryClient.invalidateQueries({
        queryKey: ["total-item-ids", userId],
      });

      // обновляем айтемы из медиатеки
      queryClient.invalidateQueries({
        queryKey: ["user-items", userId],
      });
    },
  });
};
