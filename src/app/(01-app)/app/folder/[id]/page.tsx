"use client";

import { useFolders } from "@/hooks/folders/use-folders";
import FolderItems from "./components/folder-items";
import { useParams } from "next/navigation";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";

export default function FolderPage() {
  const { id } = useParams();
  const { user } = useUserData();
  const { data: folders } = useFolders(user?.userId ?? "");
  const currentFolder = folders?.find((f) => f.public_id === id);

  return (
    <FolderItems
      folderId={currentFolder?.id ?? ""}
      publicId={id?.toString() ?? ""}
    />
  );
}
