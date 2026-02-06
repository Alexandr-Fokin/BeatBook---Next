"use client";
import { searchAlbumsData } from "@/utils/spotify";
import { useState, useEffect, useRef } from "react";
import styles from "./SearchClient.module.css";
import SearchItemAlbum from "../SearchItemAlbum/SearchItemAlbum";
import SearchItemTrack from "../SearchItemTrack/SearchItemTrack";
import { useSearchParams } from "next/navigation";

type SearchClientProps = {
  initialData: typeof searchAlbumsData extends Promise<infer R> ? R : any;
};

type TypeOfSearchType = "all" | "albums" | "tracks";

export default function SearchClient({ initialData }: SearchClientProps) {
  const searchParams = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  useEffect(() => {
    const updateVisible = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const albumWidth = 200; // ширина одной карточки
      setVisibleCount(Math.floor(containerWidth / albumWidth));
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const [searchType, setSearchType] = useState<TypeOfSearchType>(
    (searchParams.get("type") as TypeOfSearchType) || "all",
  );

  const changeSearchType = (type: TypeOfSearchType) => {
    setSearchType(type);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("type", type);

    window.history.replaceState(
      null,
      "",
      `/app/search?${newParams.toString()}`,
    );
  };

  const searchData = initialData;

  if (
    searchData.albums.items.length === 0 &&
    searchData.tracks.items.length === 0
  ) {
    return (
      <div className="search">
        <div className="search__not_found_message">Ничего не найдено</div>
      </div>
    );
  }

  return (
    <div className={styles.search}>
      {/* Вкладки */}
      <div className={styles.search__types}>
        {(["all", "albums", "tracks"] as const).map((type) => (
          <button
            key={type}
            className={`${styles.search__type} ${
              searchType === type ? styles.active : ""
            }`}
            onClick={() => changeSearchType(type)}
          >
            {type === "all" ? "Все" : type === "albums" ? "Альбомы" : "Треки"}
          </button>
        ))}
      </div>

      {/* Контент */}
      {searchType === "all" && (
        <div className={styles.search__type_all}>
          <div className="albums flex flex-col">
            <a
              onClick={() => changeSearchType("albums")}
              className={styles.search__title_link}
            >
              Альбомы
            </a>
            <div
              ref={containerRef}
              className={`${styles.search__albums_items} flex flex-col`}
            >
              {searchData.albums.items.slice(0, visibleCount).map((album) => (
                <SearchItemAlbum key={album.id} data={album} />
              ))}
            </div>
          </div>

          <div className="albums flex flex-col">
            <a
              onClick={() => changeSearchType("tracks")}
              className={styles.search__title_link}
            >
              Треки
            </a>
            {searchData.tracks.items.slice(0, 5).map((track) => (
              <SearchItemTrack key={track.id} data={track} />
            ))}
          </div>
        </div>
      )}

      {searchType === "albums" && (
        <div className="albums flex flex-col">
          <h3 className={styles.search__title}>Все альбомы</h3>
          <div className={`${styles.search__albums_items} flex flex-col`}>
            {searchData.albums.items.map((album) => (
              <SearchItemAlbum key={album.id} data={album} />
            ))}
          </div>
        </div>
      )}

      {searchType === "tracks" && (
        <div className="albums flex flex-col">
          <h3 className={styles.search__title}>Все треки</h3>
          {searchData.tracks.items.map((track) => (
            <SearchItemTrack key={track.id} data={track} />
          ))}
        </div>
      )}
    </div>
  );
}
