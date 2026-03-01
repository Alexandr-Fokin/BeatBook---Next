"use client";
import { useUserItems } from "@/hooks/items/use-user-items";
import ItemsGrid from "../(00-components)/items/items-grid/items-grid";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";

export default function Page() {
  const { user } = useUserData();
  const { data: items, isLoading } = useUserItems(user?.userId ?? "");
  if (items?.length == 0) return <div>Нет айтемов</div>;

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  return <div>{items && <ItemsGrid items={items} />}</div>;
}
