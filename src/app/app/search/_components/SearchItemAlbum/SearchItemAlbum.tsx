"use client";

import styles from "./SearchItemAlbum.module.css";
// import { DataStore } from "../../../dataStore";
// import { useAppContext } from "../../appContext/AppContext";
// import FormAddItem from "../../formAddItem/FormAddItem";
import { findItemType } from "@/utils/app/hooks";
import { SearchAlbum, SearchTrack } from "@/lib/definitions";
import { useUser } from "@/app/providers/UserProvider";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useUI } from "@/app/providers/UIProvider";
import { useEffect, useState } from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import FeatherIcon from "feather-icons-react";

export default function SearchItemAlbum({ data }: { data: SearchAlbum }) {
  const { showModal } = useUI();
  const dataType = findItemType(data);

  return (
    <li
      className={styles.item + (data.isAdded ? ` ${styles.added}` : "")}
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
          {data.isAdded ? (
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
