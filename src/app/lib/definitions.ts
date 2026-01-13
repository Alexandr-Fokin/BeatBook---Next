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
