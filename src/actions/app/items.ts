import { createClient } from "../../actions/supabase/client";
import { getUserFolderMembers } from "./folder-members";
import { SupabaseAlbum, SupabaseTrack } from "@/types/items";

// const getUserAlbums = async (userId: string) => {
//   const supabase = createClient();
//   const { data: albums } = await supabase
//     .from("albums")
//     .select()
//     .eq("user_id", userId);

//   return albums;
// };

// const getUserTracks = async (userId: string) => {
//   const supabase = createClient();
//   const { data: tracks } = await supabase
//     .from("tracks")
//     .select()
//     .eq("user_id", userId);

//   return tracks;
// };

export const getTotalItemIds = async (
  userId: string,
): Promise<Map<string, boolean>> => {
  const supabase = createClient();

  const folders = await getUserFolderMembers(userId);
  const folderIds = folders?.map((f) => f.folder_id) ?? [];

  if (!folderIds.length) return new Map();

  const [albumsRes, tracksRes] = await Promise.all([
    supabase
      .from("albums")
      .select("item_id,folder_id")
      .in("folder_id", folderIds),
    supabase
      .from("tracks")
      .select("item_id,folder_id")
      .in("folder_id", folderIds),
  ]);
  console.log("albumsRes", albumsRes);
  return new Map<string, boolean>(
    [
      ...(albumsRes.data ?? []).map((a) => ({
        itemId: a.item_id,
        folderId: a.folder_id,
      })),
      ...(tracksRes.data ?? []).map((t) => ({
        itemId: t.item_id,
        folderId: t.folder_id,
      })),
    ].map((entry) => [`${entry.itemId}_${entry.folderId}`, true]),
  );
};

export const getUserItems = async (userId: string) => {
  const supabase = createClient();

  const folders = await getUserFolderMembers(userId);
  const folderIds = folders?.map((f) => f.id) ?? [];

  if (!folderIds.length) return [];

  const [albumsRes, tracksRes] = await Promise.all([
    supabase.from("albums").select("*").in("folder_id", folderIds),
    supabase.from("tracks").select("*").in("folder_id", folderIds),
  ]);

  if (albumsRes.error) console.log(albumsRes.error);
  if (tracksRes.error) console.log(tracksRes.error);

  const items = [...(albumsRes.data ?? []), ...(tracksRes.data ?? [])].sort(
    (a, b) => new Date(a.added_at).getTime() - new Date(b.added_at).getTime(),
  );

  return items;
};

export const getFolderItems = async (
  folderId: string,
): Promise<(SupabaseAlbum | SupabaseTrack)[]> => {
  const supabase = createClient();

  const [albumsRes, tracksRes] = await Promise.all([
    supabase.from("albums").select("*").eq("folder_id", folderId),
    supabase.from("tracks").select("*").eq("folder_id", folderId),
  ]);

  if (albumsRes.error) console.log(albumsRes.error);
  if (tracksRes.error) console.log(tracksRes.error);

  const items = [...(albumsRes.data ?? []), ...(tracksRes.data ?? [])].sort(
    (a, b) => new Date(a.added_at).getTime() - new Date(b.added_at).getTime(),
  );

  return items;
};

export const addItemToFolder = async ({
  folderId,
  item,
  userId,
}: {
  folderId: string;
  item: SupabaseAlbum | SupabaseTrack;
  userId: string;
}) => {
  const supabase = createClient();

  if (item.type === "album") {
    const { data, error } = await supabase
      .from("albums")
      .insert({
        item_id: item.item_id,
        folder_id: folderId,
        user_id: userId,
        name: item.name,
        album_type: item.album_type,
        type: item.type,
        release_date: item.release_date,
        artists: item.artists,
        images: item.images,
        external_urls: item.external_urls,
      })
      .select()
      .single();

    if (error) {
      console.log("Supabase error:", error);
      throw error;
    }
    return { data };
  }
  if (item.type === "track") {
    const { data, error } = await supabase
      .from("tracks")
      .insert({
        item_id: item.item_id,
        folder_id: folderId,
        user_id: userId,
        name: item.name,
        album: item.album,
        artists: item.artists,
        images: item.album.images,
        release_date: item.album.release_date,
        external_urls: item.external_urls,
        type: item.type,
      })
      .select()
      .single();

    if (error) {
      console.log("Supabase error:", error);
      throw error;
    }
    return { data };
  }
};

export const deleteItemFromFolder = async ({
  folderId,
  item,
}: {
  folderId: string;
  item: SupabaseAlbum | SupabaseTrack;
}) => {
  const supabase = createClient();
  if (item.type === "album") {
    const { data, error } = await supabase
      .from("albums")
      .delete()
      .eq("folder_id", folderId)
      .eq("item_id", item.item_id)
      .select()
      .single();
    if (error) {
      console.log("Supabase error:", error);
      throw error;
    }
    return { data };
  }
  if (item.type === "track") {
    const { data, error } = await supabase
      .from("tracks")
      .delete()
      .eq("folder_id", folderId)
      .eq("item_id", item.item_id)
      .select()
      .single();
    if (error) {
      console.log("Supabase error:", error);
      throw error;
    }
    return { data };
  }
};
