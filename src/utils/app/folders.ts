import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getFolderIdByPublicId = async (publicId: string) => {
  const { data: folderId } = await supabase
    .from("folders")
    .select("id")
    .eq("public_id", publicId)
    .single();

  if (!folderId) return;
  return folderId.id;
};

export const getUserFolders = async (userId: string) => {
  const { data: folders } = await supabase
    .from("folder_members")
    .select()
    .eq("user_id", userId);
  return folders;
};

