import { getTotalUserFolders } from "@/utils/app/folders";
import styles from "./AddItemForm.module.css";
import FormFolderItem from "./FolderItem/FolderItem";
import { useEffect, useState } from "react";
import { useUser } from "@/app/providers/UserProvider";
import { FolderSupabase, SearchAlbum, SearchTrack } from "@/lib/definitions";
// import { useAppContext } from "../appContext/AppContext";

export default function AddItemForm({
  item,
}: {
  item: SearchAlbum | SearchTrack;
}) {
  // const [folders, setFolders] = useState<FolderSupabase[] | null>([]);
  // const user = useUser();
  // useEffect(() => {
  //   if (!user) return;
  //   const getFolders = async () => {
  //     const folders = await getTotalUserFolders();
  //     setFolders(folders);
  //   };
  //   getFolders();
  // }, []);

  return (
    <div className={styles.add_album}>
      <div className="popup_block_inner">
        <div className={styles.add_album__info}>
          <img
            className={styles.add_album__info_img}
            src={
              item.type == "album"
                ? item.images[2].url
                : item.album.images[2].url
            }
            alt=""
          />
          <div className={styles.add_album__info_name}>{item.name}</div>
          <div className={styles.add_album__info_meta}>
            {item.type == "album"
              ? "Альбом"
              : item.type == "track"
                ? "Трек"
                : "Неизвестный тип"}
          </div>
        </div>
      </div>

      <div className="popup_block">
        <h4>Создать папку</h4>
        <div className="popup_block_inner">
          <div className={styles.add_album__tools}>
            {/* <label htmlFor="" className={styles.add_album__tools_search}>
          <input type="text" placeholder="Поиск" />
        </label> */}
            {/* <div className={styles.add_album__tools_add_folder}>
          <a href="" className={styles.add_album__tools_add_folder_btn}>
            Создать папку
          </a>
        </div> */}
          </div>
        </div>
      </div>

      <div className="popup_block">
        <h4>Добавить в папку</h4>
        <div className="popup_block_inner">
          <div className={styles.add_album__folders}>
            {/* {folders?.map((folder) => (
          // <FormFolderItem
          //   folder={folder}
          //   item={item}
          //   key={folder.id}
          // ></FormFolderItem>
          <div>{folder.name}</div>
        ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
