export type SearchError = {
  error: {
    message: string;
    status: number;
  };
};
export type SearchAlbumsData = {
  albums: {
    href: string;
    items: SearchAlbum[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  tracks: {
    href: string;
    items: SearchTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
};

export type SearchAlbum = {
  album_type: "single" | "album";
  artists: {
    name: string;
    external_urls: { spotify: string };
    id: string;
    href: string;
    type: string;
    uri: string;
  }[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { height: number; width: number; url: string }[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
  isAdded?: boolean;
};
export type SearchTrack = {
  album: SearchAlbum;
  artists: {
    name: string;
    external_urls: { spotify: string };
    id: string;
    href: string;
    type: string;
    uri: string;
  }[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  isAdded?: boolean;
};
