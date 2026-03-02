export type UserItem = SupabaseAlbum | SupabaseTrack;

export type SupabaseAlbum = {
  type: "album";
  album_type: "single" | "album";
  id?: string;
  user_id?: string;
  folder_id?: string;
  item_id: string;
  external_urls: {
    [key: string]: string;
  };
  name: string;
  artists: ItemArtist[];
  images: ItemImage[];
  release_date: string;
  added_at?: string;
  tracks?: ItemTrack[];
  rating?: { user_id: string; score: number }[];
  comments?: { user_id: string; comment: string }[];
};
export type SupabaseTrack = {
  type: "track";
  album: ItemAlbum;
  id?: string;
  user_id?: string;
  folder_id?: string;
  item_id: string;
  external_urls: {
    [key: string]: string;
  };
  name: string;
  artists: ItemArtist[];
  images: ItemImage[];
  release_date: string;
  added_at?: string;
  rating?: { user_id: string; score: number }[];
  comments?: { user_id: string; comment: string }[];
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
  rating?: { user_id: string; score: number }[];
  comments?: { user_id: string; comment: string }[];
  added_at?: string;
  explicit: boolean;
  external_url: string;
};
export type ItemAlbum = {
  album_type: "album" | "single";
  artists: ItemArtist[];
  images: ItemImage[];
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
