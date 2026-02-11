"use client";
import FeatherIcon from "feather-icons-react";
import AddFolderForm from "./AddFolderForm";
import styles from "./Sidebar.module.scss";

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
          <FeatherIcon icon='plus' />
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
