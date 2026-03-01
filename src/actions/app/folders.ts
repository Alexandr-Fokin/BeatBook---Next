import { createClient } from "@/actions/supabase/client";
import { nanoid } from "nanoid";
import { FolderIconsType } from "@/types/folders";

const supabase = createClient();

// на перепроверку, мож сделать через tanstack query
export const getFolderIdByPublicId = async (publicId: string) => {
  const supabase = createClient();
  const { data: folderId } = await supabase
    .from("folders")
    .select("id")
    .eq("public_id", publicId)
    .single();

  if (!folderId) return;
  return folderId.id;
};

type FolderType = {
  id: string;
  owner_id: string;
  public_id: string;
  name: string;
  icon: FolderIconsType;
  parent_id: string;
  folder_members: {
    user_id: string;
  }[];
};

export const getUserFolders = async (userId: string): Promise<FolderType[]> => {
  const { data } = await supabase
    .from("folder_members")
    .select(
      `
        folders (
          id,
          public_id,
          name,
          icon,
          folder_members ( user_id )
        )
      `,
    )
    .eq("user_id", userId);

  const folders =
    data
      ?.map((f) => f.folders)
      .flat()
      .filter(Boolean) ?? [];

  return folders as FolderType[];
};

export const createFolder = async ({
  name,
  icon,
}: {
  name: string;
  icon: string;
}) => {
  const folderId = nanoid(22);

  const { data, error } = await supabase
    .from("folders")
    .insert({
      name,
      icon,
      public_id: folderId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  const { error: membersError } = await supabase.from("folder_members").insert({
    folder_id: data.id,
    role: "owner",
  });

  if (membersError) throw membersError;

  return { data, folderId };
};

export const deleteFolder = async ({ publicId }: { publicId: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("folders")
    .delete()
    .eq("public_id", publicId)
    .select()
    .single();

  if (error) throw error;
  return { data };
};
