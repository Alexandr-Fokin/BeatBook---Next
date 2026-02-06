import { SearchAlbum } from "@/lib/definitions";
import { createClient } from "../supabase/server";
import { getUserFolders } from "./folders";
import { getServerUser } from "./profiles";
import { release } from "os";

const supabase = await createClient();

const getUserAlbums = async (userId: string) => {
  const { data: albums } = await supabase
    .from("albums")
    .select()
    .eq("user_id", userId);

  return albums;
};

const getUserTracks = async (userId: string) => {
  const { data: tracks } = await supabase
    .from("tracks")
    .select()
    .eq("user_id", userId);

  return tracks;
};

export const getTotalItemIds = async () => {
  const user = await getServerUser();

  if (!user) return [];

  const folders = await getUserFolders(user.id);
  const folderIds = folders?.map((f) => f.id ?? []);

  if (!folderIds || folderIds.length === 0) return [];

  const [albumsRes, tracksRes] = await Promise.all([
    supabase.from("albums").select("id").in("folder_id", folderIds),
    supabase.from("tracks").select("id").in("folder_id", folderIds),
  ]);

  return [
    ...(albumsRes.data ?? []).map((a) => a.id),
    ...(tracksRes.data ?? []).map((t) => t.id),
  ];
};

export const addAlbumToFolder = async (folderId: string, album:SearchAlbum) => {
  const supabase = await createClient();
  const {error} = await supabase.from('albums').insert({
    folder_id: folderId,
    name: album.name,
    album_type: album.album_type,
    type: album.type,
    release_date: album.release_date,
    artists: album.artists,
    images: album.images,
    external_urls: album.external_urls,
  })
  if(error) return;
};
