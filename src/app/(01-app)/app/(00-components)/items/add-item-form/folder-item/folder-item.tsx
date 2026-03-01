import { SupabaseFolder } from "@/types/supabase";
import styles from "./folder-item.module.scss";
import { useTotalItemIds } from "@/hooks/items/use-total-item-ids";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
// import { getToken } from "../../spotifyApi";
// import { DataStore } from "../../dataStore";
// import { useAppContext } from "../appContext/AppContext";
import { useAddItem } from "@/hooks/items/use-add-item";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import FeatherIcon from "feather-icons-react";
import { useDeleteItem } from "@/hooks/items/use-delete-item";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import { useFolderItems } from "@/hooks/items/use-folder-items";
import { useProfileByUserId } from "@/hooks/profiles/use-profile-by-userid";

export default function FormFolderItem({
  folder,
  item,
}: {
  folder: SupabaseFolder;
  item: SupabaseAlbum | SupabaseTrack;
}) {
  console.log("FormFolderItem, item -", item);
  const { user } = useUserData();
  const { mutate: addItemToFolder, isPending: addPending } = useAddItem();
  const { mutate: deleteItem, isPending: deletePending } = useDeleteItem(
    user?.userId ?? "",
  );
  // const { data: totalItemIds } = useTotalItemIds(user?.userId ?? "");
  const { data: folderItems } = useFolderItems(folder.id);
  const { showToast } = useUI();

  const currentItem = folderItems?.find((i) => i.item_id === item.item_id);
  const isItemAdded = !!currentItem;
  const isAddedByAnotherUser =
    isItemAdded && currentItem.user_id !== user?.userId;
  const anotherUserId = isAddedByAnotherUser ? currentItem?.user_id : "";
  const { data: anotherUserData } = useProfileByUserId(anotherUserId ?? "");

  async function ToggleItemToFolder(
    item: SupabaseAlbum | SupabaseTrack,
    folderToAdd: SupabaseFolder,
  ) {
    console.log("ToggleItemToFolder, item - ", item);

    if (isItemAdded) {
      // если уже есть в этой папке → убираем (toggle)
      console.log("item added");
      deleteItem(
        { folderId: folderToAdd.id, item },
        {
          onSuccess: () => {
            showToast(
              "Айтем удален",
              "Айтем успешно удален из папки",
              "success",
            );
          },
        },
      );
    } else {
      // если элемент ещё не добавлен
      console.log("item not added");
      addItemToFolder(
        { folderId: folderToAdd.id, item, userId: user?.userId ?? "" },
        {
          onSuccess: () => {
            showToast(
              "Айтем добавлен",
              "Айтем успешно добавлен в папку",
              "success",
            );
          },
        },
      );
    }
  }


  // async function getAlbumsTracks(id) {
  //   const token = await getToken();
  //   const response = await fetch(
  //     `https://api.spotify.com/v1/albums/${id}/tracks`,
  //     {
  //       headers: { Authorization: "Bearer " + token },
  //     },
  //   );
  //   const data = await response.json();
  //   console.log("треки из альбома - ", data.items);
  //   return data.items; // массив треков
  // }
  // async function getTracksArray(tracks, albumId) {
  //   let tracksArray = [];
  //   let albumTracks = await tracks;

  //   albumTracks.map((track) => {
  //     tracksArray.push({
  //       id: track.id,
  //       albumId: albumId,
  //       name: track.name,
  //       artists: [...track.artists],
  //       duration: track.duration_ms,
  //       track_number: track.track_number,
  //       rating: 0,
  //       comment: "",
  //       addedAt: new Date(),
  //       explicit: track.explicit,
  //       external_url: track.external_urls.spotify,
  //     });
  //   });
  //   console.log("добавлены треки", tracksArray);
  //   return tracksArray;
  // }

  return (
    <div
      className={`${styles.folder__item}${addPending || deletePending ? ` ${styles.pending}` : ""}${isAddedByAnotherUser ? ` ${styles.another}` : ''}`}
      onClick={() => ToggleItemToFolder(item, folder)}
    >
      <div className={styles.folder__item_name}>{folder.name}</div>
      <div className={styles.folder__item_right}>
        {anotherUserData && (
          <img src={anotherUserData?.avatar_url ?? "/user.svg"} className={styles.folder__item_avatar} alt={anotherUserData.name} />
        )}
        <a>
          {addPending || deletePending ? (
            <div className={styles.folder__item_like}>
              <FeatherIcon icon="loader"></FeatherIcon>
            </div>
          ) : isItemAdded ? (
            <div className={`${styles.folder__item_like} ${styles.added}`}>
              <FeatherIcon icon="check"></FeatherIcon>
            </div>
          ) : (
            <div className={styles.folder__item_like}>
              <FeatherIcon icon="plus"></FeatherIcon>
            </div>
          )}
        </a>
      </div>
    </div>
  );
}
