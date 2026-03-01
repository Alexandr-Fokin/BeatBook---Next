import { SupabaseAlbum, SupabaseTrack } from "@/types/items";

function isAlbum(item: SupabaseAlbum | SupabaseTrack): item is SupabaseAlbum {
  return item.type === "album";
}

export function findItemType(
  itemForFindType: SupabaseAlbum | SupabaseTrack,
): string {
  if (isAlbum(itemForFindType)) {
    return itemForFindType.album_type == "album"
      ? "Альбом"
      : itemForFindType.album_type == "single"
        ? "Сингл"
        : "Неизвестно что :(";
  }
  if (itemForFindType.type == "track") {
    return "Трек";
  } else {
    return "Неизвестно что :(";
  }
}

export function itemIsAdded(
  item: SupabaseAlbum | SupabaseTrack,
  totalItemIds: Map<string, boolean> | undefined,
) {
  const isItemAdded = totalItemIds
    ? [...totalItemIds].some((i) => i[0].startsWith(`${item.item_id}_`))
    : false;
  return isItemAdded;
}

export function itemIsAddedToFolder(
  totalItemIds: Map<string, boolean> | undefined,
  item_id: string | undefined,
  folder_id: string | undefined,
) {
  console.log('item_id', item_id)
  console.log('folder_id', folder_id)
  return totalItemIds ? totalItemIds.has(`${item_id}_${folder_id}`) : false;
}
