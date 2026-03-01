import styles from "./item-info-meta.module.scss";
// import { findItemType } from "../../../hooks";
import { findItemType } from "@/hooks/items";
import AddItemForm from "@/app/(01-app)/app/(00-components)/items/add-item-form/add-item-form";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";

export default function ItemInfoMeta({
  item,
}: {
  item: SupabaseAlbum | SupabaseTrack;
}) {
  const { showModal } = useUI();
  const releaseYear = new Date(item.release_date).getFullYear();

  function openPopupAddAlbum(item: SupabaseAlbum | SupabaseTrack) {
    console.log("item", item);
    showModal(<AddItemForm item={item}></AddItemForm>);
  }

  return (
    <div className={styles.item_meta}>
      <div className="item_meta__top">
        <div className="rating">{item.rating} / 10</div>
        <div className="flex flex-col gap-1 justify-center items-baseline">
          <div className="item_name default_subtitle_lg">{item.name}</div>
          <div className="item_artists">
            {item.artists.map((artist, i) => {
              if (i < item.artists.length - 1) {
                return (
                  <a
                    className="default_subtitle_md"
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
                  className="default_subtitle_md"
                  href={artist.external_urls.spotify}
                  key={artist.id}
                >
                  {artist.name}
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <span>{findItemType(item)} </span>-<span> {releaseYear}</span>
        </div>
      </div>
      <div className={styles.item_meta__bottom}>
        <a
          className={styles.item_meta__add_btn}
          onClick={() => openPopupAddAlbum(item)}
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
          Добавить
        </a>
        <a
          className={styles.item_meta__spotify_btn}
          href={item.external_urls.spotify}
          target="_blank"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_189_1405)">
              <path
                d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.44 0 8 0ZM11.6807 11.56C11.5207 11.7993 11.2407 11.88 11 11.72C9.12 10.56 6.76 10.3193 3.95933 10.9593C3.68066 11.0407 3.44 10.84 3.36 10.6C3.28 10.3193 3.48 10.08 3.72 10C6.76 9.31933 9.4 9.6 11.48 10.88C11.76 11 11.7993 11.3193 11.6807 11.56ZM12.6407 9.36C12.44 9.64 12.08 9.76 11.7993 9.56C9.64002 8.24 6.36002 7.84 3.84002 8.64C3.52069 8.72 3.16002 8.56 3.08002 8.24C3.00002 7.92 3.16002 7.55933 3.48002 7.47933C6.40002 6.6 10 7.04066 12.48 8.56C12.7207 8.68067 12.84 9.08 12.6407 9.36ZM12.7207 7.12C10.16 5.6 5.88 5.44 3.44 6.20067C3.04 6.32 2.64 6.08 2.52 5.72C2.4 5.31933 2.64 4.92 3 4.79933C5.84 3.95933 10.52 4.11933 13.4807 5.88C13.84 6.08 13.96 6.56 13.76 6.92C13.5607 7.20067 13.08 7.31933 12.7207 7.12Z"
                fill="#252525"
              />
            </g>
            <defs>
              <clipPath id="clip0_189_1405">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Открыть в Spotify
        </a>
      </div>
    </div>
  );
}
