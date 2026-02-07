import { getUserFolders } from "@/utils/app/folders";
import styles from "./AddItemForm.module.css";
import FormFolderItem from "./FolderItem/FolderItem";
import { useEffect, useState } from "react";
import { useUser } from "@/app/providers/UserProvider";
// import { useAppContext } from "../appContext/AppContext";

// export default function AddItemForm(item) {
export default function AddItemForm() {
  // const { userData, setUserData } = useAppContext();
  // const [folders,setFolders] = useState([])
  // const user = useUser();
  // useEffect(() => {
  //   if (!user) return;
  //   const getFolders = async () => {
  //     const folders = await getUserFolders(user.id);
  //     setFolders(folders)
  //   };
  //   getFolders();
  // }, []);

  return (
    <div className="add_album">
      <div className={styles.add_album__info}>
        <img
          className={styles.add_album__info_left}
          src={
            item.type == "album" ? item.images[2].url : item.album.images[2].url
          }
          alt=""
        />
        <div className={styles.add_album__info_right}>
          <div className={styles.add_album__info_name}>{item.name}</div>
        </div>
      </div>
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
      <div className={styles.add_album__folders}>
        {/* {folders?.map((folder) => (
          <FormFolderItem
            folder={folder}
            item={item}
            key={folder.id}
          ></FormFolderItem>
        ))} */}
      </div>
    </div>
  );
}
