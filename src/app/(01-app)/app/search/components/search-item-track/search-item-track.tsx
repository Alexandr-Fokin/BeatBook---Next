import styles from "./search-item-track.module.scss";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import { findItemType, itemIsAdded } from "@/hooks/items";
import FeatherIcon from "feather-icons-react";
import { SupabaseTrack } from "@/types/items";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { useTotalItemIds } from "@/hooks/items/use-total-item-ids";
import AddItemForm from "../../../(00-components)/items/add-item-form/add-item-form";

export default function SearchItemTrack({ data }: { data: SupabaseTrack }) {
  const { user } = useUserData();
  const { data: totalItemIds } = useTotalItemIds(user?.userId ?? "");

  const { showModal } = useUI();
  const dataType = findItemType(data);

  const releaseYear = new Date(data.album.release_date).getFullYear();

  const isAddedToFolder = itemIsAdded(data, totalItemIds);

  return (
    <li
      className={styles.item + (isAddedToFolder ? ` ${styles.added}` : "")}
      onClick={() => {
        showModal(<AddItemForm item={data} />);
      }}
    >
      <div className={styles.item__left}>
        <img src={data.album.images[2].url} className={styles.item__left_img} />
        <div className={styles.item__left_right}>
          <span className={styles.item__left_name}>{data.name}</span>
          <div className={styles.item__left_meta}>
            <div className="item__left_meta_type" data-type={data.type}>
              {dataType}
            </div>
            <div className="item__left_meta_separator">/</div>
            <div
              className="item__left_meta_year"
              data-release={data.album.release_date}
            >
              {releaseYear}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.item__right_authors}>
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
      </div>
      <div className={styles.item__right}>
        <a className={styles.item__right_like}>
          {isAddedToFolder ? (
            <FeatherIcon icon="check" />
          ) : (
            <FeatherIcon icon="plus" />
          )}
        </a>
      </div>
    </li>
  );
}
