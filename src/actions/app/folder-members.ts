import { createClient } from "../supabase/client";

export const getUserFolderMembers = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("folder_members")
    .select()
    .eq("user_id", userId);
    
  if (error) throw error;
  return data ?? [];
};
