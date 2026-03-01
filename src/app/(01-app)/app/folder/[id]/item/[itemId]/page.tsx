"use client";

import { useParams } from "next/navigation";
import ItemInfo from "./components/item-info/item-info";
import { useFolderItems } from "@/hooks/items/use-folder-items";
import { useFolders } from "@/hooks/folders/use-folders";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";

export default function Page() {
  const { id, itemId } = useParams();
  const { user } = useUserData();
  const { data: folders } = useFolders(user?.userId ?? "");
  const folderId = folders?.find((f) => f.public_id === id)?.id;
  const { data: items, isLoading } = useFolderItems(folderId ?? "");
  const item = items?.find((i) => i.item_id === itemId);

  if (isLoading) return <div>Загрузка...</div>
  if (!item) return null;
  return <ItemInfo item={item} />;
}
