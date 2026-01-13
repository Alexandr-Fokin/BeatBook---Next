import { FolderButton } from "../buttons/Buttons";
import styles from "./Sidebar.module.css";

// import { useAppContext } from "../appContext/AppContext";
// import FormAddFolder from "../formAddFolder/FormAddFolder";
// import { useState } from "react";
// import { Icons } from "../../icons/icons";
// import { NavLink } from "react-router-dom";

export default function Sidebar() {
  //   let { userData } = useAppContext();
  //   const IconAll = Icons[99];
  //   const [folderForm, setFolderForm] = useState(false);

  //   function toggleFormAddFolder() {
  //     setFolderForm((prev) => !prev);
  //   }
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <div className={styles.sidebar__header_title}>Медиатека</div>
        <a
          className={styles.sidebar__header_add_btn}
          //   onClick={toggleFormAddFolder}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="768"
            height="768"
            viewBox="0 0 768 768"
          >
            <g id="icomoon-ignore"></g>
            <path d="M160 416h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192h192c17.664 0 32-14.336 32-32s-14.336-32-32-32h-192v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32v192h-192c-17.664 0-32 14.336-32 32s14.336 32 32 32z"></path>
          </svg>
          Создать
        </a>
      </div>
      {/* <div
        style={{ display: folderForm ? "block" : "none" }}
        className={styles.sidebar__form_add_folder}
      >
        <FormAddFolder
          folderForm={folderForm}
          setFolderForm={setFolderForm}
        ></FormAddFolder>
      </div> */}
      <div className={styles.sidebar__folders}>
        <FolderButton link="/app/added" id={99}>
          Вся Медиатека
        </FolderButton>
        <FolderButton link="/app/item/2" id={1}>
          Айтем
        </FolderButton>
        {/* {userData.folders.map((folder) => {
          const IconFolder = Icons[folder.icon];
          return (
            <Link
              href={`/folder/${folder.id}`}
              key={folder.id}
              className={`${styles.sidebar__folder}`}
            >
              <IconFolder />
              {folder.name}
            </Link>
          );
        })} */}
      </div>
    </div>
  );
}
