"use client";

import styles from "./header-share-btn.module.scss";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import ShareFolderForm from "@/app/(01-app)/app/(00-components)/folders/share-folder-form/share-folder-form";
import FeatherIcon from "feather-icons-react";

export function HeaderShareBtn() {
  const { showModal } = useUI();
  return (
    <a
      className={styles.main_header__share_btn}
      onClick={() => showModal(<ShareFolderForm />)}
    >
      <FeatherIcon icon="users" />
    </a>
  );
}
