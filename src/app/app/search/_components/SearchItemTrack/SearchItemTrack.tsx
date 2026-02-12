import styles from "./SearchItemTrack.module.css";
import { SearchTrack } from "@/lib/definitions";
import { useUI } from "@/app/providers/UIProvider";
import { findItemType } from "@/utils/app/hooks";
import FeatherIcon from "feather-icons-react";

// import { DataStore } from "../../../dataStore";
// import { useAppContext } from "../../appContext/AppContext";
// import FormAddItem from "../../formAddItem/FormAddItem";

export default function SearchItemTrack({ data }: { data: SearchTrack }) {
  //   const { showModal } = useUI();
  const dataType = findItemType(data);

  //   const { setPopup } = useAppContext();
  //   let dataType =
  //     props.data.type == "album"
  //       ? "Альбом"
  //       : props.data.type == "single"
  //         ? "Сингл"
  //         : props.data.type == "track"
  //           ? "Трек"
  //           : "Что-то другое";
  const releaseYear = new Date(data.album.release_date).getFullYear();

  //   function openPopupAddAlbum(item) {
  //     setPopup(<FormAddItem item={item}></FormAddItem>);
  //   }

  return (
    <li
      className={styles.item + (data.isAdded ? ` ${styles.added}` : "")}
      //   onClick={() => {
      //     openPopupAddAlbum(data);
      //   }}
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
          {data.isAdded ? (
            <FeatherIcon icon="check" />
          ) : (
            <FeatherIcon icon="plus" />
          )}
        </a>
      </div>
    </li>
  );
}
