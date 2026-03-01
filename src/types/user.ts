import { UserItem } from "./items";
import { SupabaseProfile } from "./supabase";

export type DefaultUserDataType = {
  profile: SupabaseProfile;
  userId: string;
};

export type UserType = {
  added: UserItem[];
  folders: UserFolder[];
};

export type UserFolder = {
  id: string;
  name: string;
  parentId: string | null;
  icon: number;
};
