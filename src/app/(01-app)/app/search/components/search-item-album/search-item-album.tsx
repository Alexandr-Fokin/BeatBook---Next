"use client";

import styles from "./search-item-album.module.scss";
import { findItemType, itemIsAdded } from "@/hooks/items";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import AddItemForm from "@/app/(01-app)/app/(00-components)/items/add-item-form/add-item-form";
import FeatherIcon from "feather-icons-react";
import { useTotalItemIds } from "@/hooks/items/use-total-item-ids";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { SupabaseAlbum } from "@/types/items";

export default function SearchItemAlbum({ data }: { data: SupabaseAlbum }) {
  const { showModal } = useUI();
  const dataType = findItemType(data);

  const { user } = useUserData();
  const { data: totalItemIds } = useTotalItemIds(user?.userId ?? "");

  const isAddedToFolder = itemIsAdded(data, totalItemIds);

  return (
    <li
      className={styles.item + (isAddedToFolder ? ` ${styles.added}` : "")}
      onClick={() => {
        showModal(<AddItemForm item={data} />);
      }}
    >
      <div className={styles.item__top}>
        <img
          src={data.images[1].url}
          className={styles.item__img}
          alt="Обложка альбома"
        />
        <a className={styles.item__like}>
          {isAddedToFolder ? (
            <FeatherIcon icon="check" />
          ) : (
            <FeatherIcon icon="plus" />
          )}
        </a>
      </div>
      <div className={styles.item__bottom}>
        <div className={styles.item__name}>{data.name}</div>
        <div className={styles.item__meta}>
          <span>
            {data.artists.map((artist, i) => {
              if (i < data.artists.length - 1) {
                return (
                  <a
                    target="_blank"
                    href={artist.external_urls.spotify}
                    key={artist.id}
                  >
                    {artist.name},{" "}
                  </a>
                );
              }
              return (
                <a
                  target="_blank"
                  href={artist.external_urls.spotify}
                  key={artist.id}
                >
                  {artist.name}
                </a>
              );
            })}
          </span>{" "}
          - <span>{dataType}</span>
        </div>
      </div>
    </li>
  );
}
