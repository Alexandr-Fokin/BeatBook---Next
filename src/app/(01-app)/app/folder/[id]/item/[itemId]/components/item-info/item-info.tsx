"use client";

import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import styles from "./item-info.module.scss";
import ItemInfoMeta from "../item-info-meta/item-info-meta";
import { useState } from "react";
import FeatherIcon from "feather-icons-react";
export default function ItemInfo({
  item,
}: {
  item: SupabaseAlbum | SupabaseTrack;
}) {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className={styles.item}>
      <div className={styles.item__btns}>
        {!isEditable && (
          <div
            className={styles.item__btn_edit}
            onClick={() => setIsEditable(true)}
          >
            <p>Редактировать</p>
            <FeatherIcon icon="edit" />
          </div>
        )}
        {isEditable && (
          <>
            <div
              className={styles.item__btn_save}
              onClick={() => setIsEditable(false)}
            >
              <p>Сохранить</p>
              <FeatherIcon icon="save" />
            </div>
            <div
              className={styles.item__btn_cancel}
              onClick={() => setIsEditable(false)}
            >
              <p>Отменить</p>
              <FeatherIcon icon="x" />
            </div>
          </>
        )}
      </div>
      <div className={styles.item__head}>
        <img className={styles.item_img} src={item.images[1].url} alt="" />
        <ItemInfoMeta item={item} isEditable={isEditable}></ItemInfoMeta>
      </div>
      <div className="item__info">
        <div className="item__note"></div>
        {item.type == "album" && (
          <div className="item__tracks">
            {item.tracks?.map((track) => (
              <div className="item__track" key={track.id}>
                {track.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
