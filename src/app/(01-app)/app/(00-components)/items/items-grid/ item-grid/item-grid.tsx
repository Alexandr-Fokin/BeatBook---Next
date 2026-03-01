"use client";

import FeatherIcon from "feather-icons-react";
import styles from "./item-grid.module.scss";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { useProfileByUserId } from "@/hooks/profiles/use-profile-by-userid";
import Link from "next/link";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import AddItemForm from "../../add-item-form/add-item-form";
import { findItemType } from "@/hooks/items";

export default function ItemGrid({
  item,
  publicId,
}: {
  item: SupabaseAlbum | SupabaseTrack;
  publicId: string;
}) {
  const { user } = useUserData();
  const { showModal } = useUI();
  const added = !!item;
  const isAddedByAnotherUser = added && item.user_id !== user?.userId;
  const anotherUserId = isAddedByAnotherUser ? item.user_id : "";
  const { data: anotherUserData } = useProfileByUserId(anotherUserId ?? "");

  function getArtistsList(item: SupabaseAlbum | SupabaseTrack) {
    if (!item.artists?.length) return "Не указано";
    const list = item.artists.map((artist) => artist.name).join(", ");
    return list;
  }
  function openPopupAddAlbum(item: SupabaseAlbum | SupabaseTrack) {
    showModal(<AddItemForm item={item}></AddItemForm>);
  }

  return (
    <Link
      key={item.id}
      className={styles.items_grid__item + (added ? ` ${styles.added}` : "")}
      href={`/app/folder/${publicId}/item/${item.item_id}/`}
    >
      <div className={styles.items_grid__item_top}>
        <div
          className={`${styles.item_grid__item_is_added} ${isAddedByAnotherUser ? ` ${styles.added_by_another}` : ""}`}
        >
          <div
            className={styles.item_grid__item_like}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // ← ключевой момент
              openPopupAddAlbum(item);
            }}
          >
            {added ? <FeatherIcon icon="check" /> : <FeatherIcon icon="plus" />}
          </div>
          {anotherUserData && (
            <img
              src={anotherUserData.avatar_url}
              alt={anotherUserData.name}
              className={styles.items_grid__item_another}
            />
          )}
        </div>
        <img
          src={item.images[1].url}
          className={styles.items_grid__item_img}
          alt=""
        />
      </div>
      <div className={styles.item_grid__item_bottom}>
        <div className={styles.item_grid__item_name}>{item.name}</div>
        <div className={styles.item_grid__item_meta}>
          <span>{getArtistsList(item)}</span> -{" "}
          <span>{findItemType(item)}</span>
        </div>
      </div>
    </Link>
  );
}
