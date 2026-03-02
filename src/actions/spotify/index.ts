import { SupabaseTrack, SupabaseAlbum } from "@/types/items";
import { SearchAlbum, SearchTrack } from "@/types/search";

export async function getToken() {
  const clientId = "123cf0a0417247469d4fcbb8b7ec89c1";
  const clientSecret = "5301e8e323874ec3a88bfae30b253c7c";

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token; // вот его потом используем в других запросах
}
export async function searchAlbumsData(searchValue: string) {
  const token = await getToken();
  const response = await fetch(
    `
        https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchValue,
        )}&type=album%2Ctrack&market=ES&limit=30&include_external=audio&locale=en-US`,
    {
      headers: { Authorization: "Bearer " + token },
    },
  );
  const data = await response.json();
  console.log(data);
  if(data.error) return data
  const albums = data.albums.items.map((i: SearchAlbum): SupabaseAlbum => {
    return {
      item_id: i.id,
      name: i.name,
      album_type: i.album_type,
      release_date: i.release_date,
      artists: i.artists,
      images: i.images,
      external_urls: i.external_urls,
      type: i.type,
    };
  });
  const tracks = data.tracks.items.map((i: SearchTrack): SupabaseTrack => {
    return {
      item_id: i.id,
      name: i.name,
      release_date: i.album.release_date,
      artists: i.artists,
      images: i.album.images,
      external_urls: i.external_urls,
      type: i.type,
      album: i.album,
    };
  });
  const newData = {
    ...data,
    albums: { ...data.albums, items: albums },
    tracks: { ...data.tracks, items: tracks },
  };
  console.log("newData", newData);
  return newData;
}
