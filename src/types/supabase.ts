import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { ThemeType } from "./config";
import { FolderIconsType } from "./folders";

export type SupabaseFolderMember = {
  id: string;
  folder_id: string;
  user_id: string;
  role: "owner" | "editor";
  added_at: Timestamp;
};
export type SupabaseFolder = {
  id: string;
  owner_id: string;
  public_id: string;
  name: string;
  parent_id: string;
  icon: FolderIconsType;
};
export type SupabaseProfile = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  username: string;
  theme: ThemeType;
  created_at: Timestamp;
};
