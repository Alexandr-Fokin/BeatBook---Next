"use client";

import { getUserFolders } from "@/actions/app/folders";
import styles from "./add-item-form.module.scss";
import FormFolderItem from "./folder-item/folder-item";
import { useEffect, useState } from "react";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { SupabaseFolder } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";
import { useFolders } from "@/hooks/folders/use-folders";
import AddFolderForm from "../../folders/add-folder-form/add-folder-form";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";

export default function AddItemForm({
  item,
}: {
  item: SupabaseAlbum | SupabaseTrack;
}) {
  const { user } = useUserData();
  const {
    data: folders,
    isLoading,
    isError,
    error,
  } = useFolders(user?.userId ?? "");

  return (
    <div className={styles.add_item}>
      <div className="popup_block_inner">
        <div className={styles.add_item__info}>
          <img
            className={styles.add_item__info_img}
            src={
              item.type == "album"
                ? item.images[2].url
                : item.album.images[2].url
            }
            alt=""
          />
          <div className={styles.add_item__info_name}>{item.name}</div>
          <div className={styles.add_item__info_meta}>
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
          <div className={styles.add_item__tools}>
            <AddFolderForm locate={false} />
          </div>
        </div>
      </div>

      <div className="popup_block">
        <h4>Добавить в папку</h4>
        <div className={`${styles.add_item__folders_box} popup_block_inner`}>
          <div className={styles.add_item__folders}>
            {folders?.map((folder) => (
              <FormFolderItem
                folder={folder}
                item={item}
                key={folder.id}
              ></FormFolderItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
