import { createClient } from "@/utils/supabase/client";
import { getServerUser } from "./profiles";

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

export const getUserFolderMembers = async (userId: string) => {
  const { data: folders } = await supabase
    .from("folder_members")
    .select()
    .eq("user_id", userId);
  return folders;
};

export const getTotalUserFolders = async () => {
  const supabase = createClient();
  const user = await getServerUser();

  if (!user) return [];

  const folders = await getUserFolderMembers(user.id);
  const folderIds = folders?.map((f) => f.id ?? []);

  if (!folderIds || folderIds.length === 0) return [];

  const totalFolders = supabase
    .from("albums")
    .select()
    .in("folder_id", folderIds);

  return totalFolders;
};
