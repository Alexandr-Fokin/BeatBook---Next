"use client";
import { useFolderItems } from "@/hooks/items/use-folder-items";
import ItemsGrid from "../../../(00-components)/items/items-grid/items-grid";
import { createArrayPlaceholder } from "@/hooks/app";
import styles from "./folder-items.module.scss";

export default function FolderItems({
  folderId,
  publicId,
}: {
  folderId: string;
  publicId: string;
}) {
  const { data: items, isLoading } = useFolderItems(folderId);
  const skeletons = createArrayPlaceholder(100);
  if (items?.length == 0) return <div>Нет айтемов</div>;
  if (isLoading) {
    return (
      <div className={styles.sceletons__grid}>
        {skeletons.map((i) => (
          <div className={styles.sceletons__grid_item} key={i}>
            <div className={`${styles.sceletons__grid_item_top}`}>
              <div
                className={`${styles.sceletons__grid_item_img} sceleton`}
              ></div>
            </div>
            <div className={`${styles.sceletons__grid_item_bottom}`}>
              <div
                className={`${styles.sceletons__grid_item_name} sceleton`}
              ></div>
              <div
                className={`${styles.sceletons__grid_item_meta} sceleton`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div>{items && <ItemsGrid items={items} publicId={publicId} />}</div>;
}
