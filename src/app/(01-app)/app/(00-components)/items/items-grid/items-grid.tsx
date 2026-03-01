"use client";

import styles from "./items-grid.module.scss";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";
import ItemGrid from "./ item-grid/item-grid";

export default function ItemsGrid({
  items,
  publicId,
}: {
  items: (SupabaseAlbum | SupabaseTrack)[];
  publicId: string;
}) {
  return (
    <div className={styles.items_grid}>
      {items.map((item) => (
        <ItemGrid publicId={publicId} key={item.id} item={item} />
      ))}
    </div>
  );
}
