import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import styles from "./item-info.module.scss";
import ItemInfoMeta from "../item-info-meta/item-info-meta";
export default function ItemInfo({
  item,
}: {
  item: SupabaseAlbum | SupabaseTrack;
}) {
  return (
    <div className={styles.item}>
      <div className={styles.item__head}>
        <img className={styles.item_img} src={item.images[1].url} alt="" />
        <ItemInfoMeta item={item}></ItemInfoMeta>
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
