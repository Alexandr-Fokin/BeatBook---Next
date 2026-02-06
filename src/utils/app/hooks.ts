import { SearchAlbum, SearchTrack } from "@/lib/definitions";

function isAlbum(item: SearchAlbum | SearchTrack): item is SearchAlbum {
  return item.type === "album";
}

export function findItemType(
  itemForFindType: SearchAlbum | SearchTrack,
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
