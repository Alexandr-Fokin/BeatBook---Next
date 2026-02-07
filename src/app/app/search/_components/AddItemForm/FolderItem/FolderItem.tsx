// import checkImg from "../../img/check-svg.svg";
// import plusImg from "../../img/plus-svg.svg";
import styles from "./FolderItem.module.css";
// import { getToken } from "../../spotifyApi";
// import { DataStore } from "../../dataStore";
// import { useAppContext } from "../appContext/AppContext";

// export default function FormFolderItem({ folder, item }) {
  export default function FormFolderItem({ }) {
  //   console.log("FormFolderItem, item -", item);
  //   const { userData, setUserData } = useAppContext();
  //   async function ToggleItemToFolder(item, folderToAdd) {
  //     console.log("ToggleItemToFolder, item - ", item);
  //     let updatedData = { ...userData };
  //     let addedItem = updatedData.added.find((i) => i.id === item.id);

  //     if (addedItem) {
  //       // если уже есть в этой папке → убираем (toggle)
  //       if (addedItem.folder.some((f) => f.id == folderToAdd.id)) {
  //         addedItem.folder = addedItem.folder.filter((f) => f.id !== folderToAdd.id);
  //         if (addedItem.folder.length == 0) removeItem(addedItem);
  //       } else {
  //         addedItem.folder.push({ id: folderToAdd.id, order: lengthItemsInFolder(folder) + 1 });
  //       }
  //       DataStore.saveUserData(updatedData);
  //       setUserData(updatedData);
  //     } else {
  //       // если элемент ещё не добавлен
  //       await addItem(item, folderToAdd);
  //     }
  //   }

  //   function lengthItemsInFolder(folder) {
  //     userData.added.reduce((acc, item) => {
  //       if (item.folder.some((f) => f.id == folder.id)) {
  //         return acc + 1;
  //       }
  //       return acc;
  //     }, 0);
  //   }

  //   async function getAlbumsTracks(id) {
  //     const token = await getToken();
  //     const response = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
  //       headers: { Authorization: "Bearer " + token },
  //     });
  //     const data = await response.json();
  //     console.log("треки из альбома - ", data.items);
  //     return data.items; // массив треков
  //   }
  //   async function getTracksArray(tracks, albumId) {
  //     let tracksArray = [];
  //     let albumTracks = await tracks;

  //     albumTracks.map((track) => {
  //       tracksArray.push({
  //         id: track.id,
  //         albumId: albumId,
  //         name: track.name,
  //         artists: [...track.artists],
  //         duration: track.duration_ms,
  //         track_number: track.track_number,
  //         rating: 0,
  //         comment: "",
  //         addedAt: new Date(),
  //         explicit: track.explicit,
  //         external_url: track.external_urls.spotify,
  //       });
  //     });
  //     console.log("добавлены треки", tracksArray);
  //     return tracksArray;
  //   }

  //   async function addItem(item, folder) {
  //     let updatedData = { ...userData };

  //     if (item.type === "album") {
  //       const albumTracks = await getTracksArray(getAlbumsTracks(item.id), item.id);
  //       updatedData.added.push({
  //         type: "album",
  //         album_type: item.album_type,
  //         id: item.id,
  //         external_urls: { ...item.external_urls },
  //         name: item.name,
  //         artists: [...item.artists],
  //         images: [...item.images],
  //         release_date: item.release_date,
  //         addedAt: new Date(),
  //         folder: [{ id: folder.id, order: lengthItemsInFolder(folder) + 1 }],
  //         tracks: albumTracks,
  //         rating: 0,
  //         comment: "",
  //       });
  //     }
  //     if (item.type === "track") {
  //       updatedData.added.push({
  //         type: "track",
  //         album: { ...item.album },
  //         id: item.id,
  //         external_urls: { ...item.external_urls },
  //         name: item.name,
  //         artists: [...item.artists],
  //         images: [...item.album.images],
  //         release_date: item.album.release_date,
  //         addedAt: new Date(),
  //         folder: [{ id: folder.id, order: lengthItemsInFolder(folder) + 1 }],
  //         rating: 0,
  //         comment: "",
  //       });
  //     }

  //     DataStore.saveUserData(updatedData);
  //     setUserData(updatedData);
  //     console.log("добавлен альбом в локалку", DataStore.getUserData());
  //   }
  //   function removeItem(item) {
  //     setUserData((prev) => {
  //       let updatedItems = prev.added.filter((i) => i.id !== item.id);
  //       let updatedData = {
  //         ...prev,
  //         added: updatedItems,
  //       };
  //       DataStore.saveUserData(updatedData);
  //       console.log("после удаления - ", updatedData);
  //       return updatedData;
  //     });
  //   }

  return (
    <div
      className={styles.folder__item}
    //   onClick={() => ToggleItemToFolder(item, folder)}
    >
      {/* <div>{folder.name}</div> */}
      {/* <a>
        {userData.added.find((addedItem) => addedItem.id == item.id)?.folder.some((f) => f.id == folder.id) ? (
          <div className={`${styles.folder__item_like} ${styles.added}`}>
            <img src={checkImg}></img>
          </div>
        ) : (
          <div className={styles.folder__item_like}>
            <img src={plusImg}></img>
          </div>
        )}
      </a> */}
    </div>
  );
}
