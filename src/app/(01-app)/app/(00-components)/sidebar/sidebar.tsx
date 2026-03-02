"use client";

import { FolderButton } from "./folder-button/folder-button";
import styles from "./sidebar.module.scss";
import SidebarHeader from "./sidebar-header/sidebar-header";
import { useQuery } from "@tanstack/react-query";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { getUserFolders } from "@/actions/app/folders";
import { useFolders } from "@/hooks/folders/use-folders";
import { createArrayPlaceholder } from "@/hooks/app";

export default function Sidebar() {
  const { user } = useUserData();
  const {
    data: folders,
    isLoading,
    isError,
    error,
  } = useFolders(user?.userId ?? "");

  const skeletons = createArrayPlaceholder(22);

  return (
    <div className={styles.sidebar}>
      <SidebarHeader />

      <div
        className={`${styles.sidebar__folders} ${isLoading ? styles.loading : ""}`}
      >
        {isLoading &&
          skeletons.map((i) => (
            <div className="flex flex-col w-full gap-0" key={i}>
              <div className={`${styles.sceleton_folder}`}>
                <div
                  className={`${styles.sceleton_folder_icon} sceleton`}
                ></div>
                <div
                  className={`${styles.sceleton_folder_text} sceleton`}
                ></div>
              </div>
            </div>
          ))}
        {isError && <div>Ошибка: {error.message}</div>}
        {folders &&
          folders?.map((folder) => (
            <FolderButton
              key={folder.id}
              link={`/app/folder/${folder.public_id}`}
              icon={folder.icon}
              shared={folder.folder_members?.length > 1 ? true : false}
            >
              {folder.name}
            </FolderButton>
          ))}
      </div>
    </div>
  );
}
