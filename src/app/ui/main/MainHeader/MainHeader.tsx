'use client';

import styles from "./MainHeader.module.css";
// import { useAppContext } from "../components/appContext/AppContext";
// import FormRemoveFolder from "../components/formRemoveFolder/FormRemoveFolder";
// import MenuBox from "../components/menuBox/MenuBox";
// import { Outlet, useNavigation, useParams } from "react-router-dom";
// import Loading from "../components/loading/Loading";



import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/app/providers/UserProvider";
import {
  HeaderDeleteBtn,
  HeaderThemeBtn,
  HeaderShareBtn,
} from "./_components/HeaderButtons/HeaderButtons";
import { getFolderIdByPublicId } from "@/utils/app/folders";
import { STATIC_TITLES } from "@/lib/constants";

export default function MainHeader() {
  const user = useUser();
  const [title, setTitle] = useState("");
  const [folderRole, setFolderRole] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const getFolderRole = async () => {
      if (!pathname.includes("/app/folder/")) {
        setFolderRole("");
        return;
      }
      if (!user) return;

      const publicId = params.id?.toString();
      if (!publicId) return;

      const folderId = await getFolderIdByPublicId(publicId);

      const { data } = await supabase
        .from("folder_members")
        .select("role")
        .eq("user_id", user.id)
        .eq("folder_id", folderId)
        .single();

      if (!data) return;
      setFolderRole(data.role);
    };
    getFolderRole();
  }, [params, pathname, user, supabase]);

  useEffect(() => {
    const loadTitle = async () => {
      if (STATIC_TITLES[pathname]) {
        setTitle(STATIC_TITLES[pathname]);
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

      if (pathname.includes("/app/search")) {
        const query = searchParams.get("q") || "";
        setTitle(
          query ? `Результаты поиска по: ${query}` : "Результаты поиска",
        );
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
