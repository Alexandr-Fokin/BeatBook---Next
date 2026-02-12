import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

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
  album_type: string;
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

export type UserType = {
  added: UserItem[];
  folders: UserFolder[];
};

export type UserItem = Album | Track;

export type UserFolder = {
  id: string;
  name: string;
  parentId: string | null;
  icon: number;
};

export type Album = {
  type: "album";
  album_type: "single" | "album";
  id: string;
  external_urls: {
    [key: string]: string;
  };
  name: string;
  artists: ItemArtist[];
  images: ItemImage[];
  release_date: string;
  addedAt: string;
  folder: ItemFolder[];
  tracks: ItemTrack[];
  rating: number;
  comment: string;
};
export type Track = {
  type: "track";
  album: ItemAlbum;
  id: string;
  external_urls: {
    [key: string]: string;
  };
  name: string;
  artists: ItemArtist[];
  images: ItemImage[];
  release_date: string;
  addedAt: string;
  folder: ItemFolder[];
  rating: number;
  comment: string;
};

export type ItemArtist = {
  external_urls: {
    [key: string]: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
};
export type ItemImage = {
  height: number;
  width: number;
  url: string;
};
export type ItemFolder = {
  id: string;
  order: number | null;
};
export type ItemTrack = {
  id: string;
  albumId: string;
  name: string;
  artists: ItemArtist[];
  duration: number;
  track_number: number;
  rating: number;
  comment: string;
  addedAt: string;
  explicit: boolean;
  external_url: string;
};
export type ItemAlbum = {
  album_type: "album" | "single";
  artists: ItemArtist[];
  external_urls: {
    [key: string]: string;
  };
  href: string;
  id: string;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
};

export type FolderMemberSupabase = {
  id: string;
  folder_id: string;
  user_id: string;
  role: "owner" | "editor";
  added_at: Timestamp;
};
export type FolderSupabase = {
  id: string;
  owner_id: string;
  public_id: string;
  name: string;
  parent_id: string,
  icon: Timestamp;
};

export type FolderIconsType = [
  "folder",
  "heart",
  "coffee",
  "star",
  "zap",
  "thumbs-up",
  "thumbs-down",
  "smile",
  "meh",
  "frown",
  "headphones",
  "moon",
];