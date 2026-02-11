export const dynamic = "force-dynamic";

import { searchAlbumsData } from "@/utils/spotify";
import styles from "./search.module.css";
import { getTotalItemIds } from "@/utils/app/items";
import SearchClient from "./_components/SearchClient/SearchClient";
import { SearchAlbum, SearchTrack } from "@/lib/definitions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  if (!query) {
    return <div className={styles.search}></div>;
  }

  const items = await searchAlbumsData(query);

  if (!items || "error" in items) {
    return (
      <div className={styles.search}>
        <div className="search__error_message">{items?.error.message}</div>
      </div>
    );
  }

  const addedIds = await getTotalItemIds();

  const updatedAlbums = items.albums.items.map((i: SearchAlbum) => ({
    ...i,
    isAdded: addedIds.includes(i.id),
  }));

  const updatedTracks = items.tracks.items.map((i: SearchTrack) => ({
    ...i,
    isAdded: addedIds.includes(i.id),
  }));

  const searchData = {
    ...items,
    albums: { ...items.albums, items: updatedAlbums },
    tracks: { ...items.tracks, items: updatedTracks },
  };

  if (
    searchData.albums.items.length == 0 &&
    searchData.tracks.items.length == 0
  ) {
    return (
      <div className="search">
        <div className="search__not_found_message">Ничего не найдено</div>
      </div>
    );
  }

  return <SearchClient initialData={searchData} />;
}
