import { addItemToFolder } from "@/actions/app/items";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useAddItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      folderId,
      item,
      userId,
    }: {
      folderId: string;
      item: SupabaseAlbum | SupabaseTrack;
      userId: string,
    }) => addItemToFolder({ folderId, item, userId}),
    onSuccess: (_, variables) => {
      // обновляем айтемы конкретной папки
      queryClient.invalidateQueries({
        queryKey: ["folder-items", variables.folderId],
      });

      // обновляем все айтемы (твои вместе с добавленными другими людьми в твоих папках)
      queryClient.invalidateQueries({
        queryKey: ["total-item-ids", variables.userId],
      });

      // обновляем айтемы из медиатеки
      queryClient.invalidateQueries({ queryKey: ["user-items", variables.userId] });
    },
  });
};
