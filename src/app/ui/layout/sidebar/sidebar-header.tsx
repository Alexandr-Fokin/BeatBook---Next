"use client";
import AddFolderForm from "./AddFolderForm";
import styles from "./Sidebar.module.css";

import { useState } from "react";

export default function SidebarHeader() {
  const [folderForm, setFolderForm] = useState(false);

  function toggleFormAddFolder() {
    setFolderForm((prev) => !prev);
  }
  return (
    <>
      <div className={styles.sidebar__header}>
        <div className={styles.sidebar__header_title}>Медиатека</div>
        <a
          className={styles.sidebar__header_add_btn}
          onClick={toggleFormAddFolder}
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
      <div
        style={{ display: folderForm ? "block" : "none" }}
        className={styles.sidebar__form_add_folder}
      >
        <AddFolderForm setFolderForm={setFolderForm}></AddFolderForm>
      </div>
    </>
  );
}
