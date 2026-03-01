"use client";

import styles from "./main-header.module.scss";
// import { useAppContext } from "../components/appContext/AppContext";
// import FormRemoveFolder from "../components/formRemoveFolder/FormRemoveFolder";
// import MenuBox from "../components/menuBox/MenuBox";
// import { Outlet, useNavigation, useParams } from "react-router-dom";
// import Loading from "../components/loading/Loading";

import { useState, useEffect, useMemo } from "react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import { createClient } from "@/actions/supabase/client";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { HeaderDeleteBtn } from "./header-btns/header-delete-btn/header-delete-btn";
import { HeaderShareBtn } from "./header-btns/header-share-btn/header-share-btn";
import { HeaderThemeBtn } from "./header-btns/header-theme-btn/header-theme-btn";
import { getFolderIdByPublicId } from "@/actions/app/folders";
import { STATIC_TITLES } from "@/const/app";
import { useFolderMembers } from "@/hooks/folder-members/use-folder-members";
import { useFolders } from "@/hooks/folders/use-folders";

export default function MainHeader() {
  const { user } = useUserData();
  const { data: folderMembersData } = useFolderMembers({
    userId: user?.userId ?? "",
  });
  const { data: folders } = useFolders(user?.userId ?? "");

  const [title, setTitle] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const supabase = createClient();

  console.log("folderMembersData", folderMembersData);
  console.log("folders", folders);

  const folderRole = useMemo(() => {
    const publicId = params.id?.toString();
    if (!publicId || !folders || !folderMembersData) return null;

    const folder = folders.find((f) => f.public_id === publicId);
    if (!folder) return null;

    return (
      folderMembersData.find((f) => f.folder_id === folder.id)?.role ?? null
    );
  }, [params.id, folders, folderMembersData]);

  useEffect(() => {
    const loadTitle = async () => {
      if (STATIC_TITLES[pathname]) {
        setTitle(STATIC_TITLES[pathname]);
        return;
      }

      if (pathname.includes("/app/search")) {
        const query = searchParams.get("q") || "";
        setTitle(
          query ? `Результаты поиска по: ${query}` : "Результаты поиска",
        );
        return;
      }

      if (pathname.includes(`/app/folder/${params.id}/item/`)) {
        setTitle("Айтем");
        return;
      }

      if (pathname.includes("/app/folder/")) {
        const { data, error } = await supabase
          .from("folders")
          .select("name")
          .eq("public_id", params.id)
          .single();
        setTitle(error ? "Папка не найдена" : data.name);
        return;
      }

      setTitle("Неизвестная страница");
    };
    loadTitle();
  }, [pathname, searchParams, user, supabase, params]);

  return (
    <div className={styles.main_header}>
      <div className={styles.main_header__page_title}>{title}</div>
      <div className={styles.main_header__tools}>
        {folderRole === "owner" && (
          <>
            <HeaderShareBtn />
            <HeaderDeleteBtn />
          </>
        )}
        <HeaderThemeBtn />
      </div>
    </div>
  );
}
