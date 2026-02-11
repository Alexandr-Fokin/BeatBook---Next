import styles from "./MainHeader.module.css";
// import { useAppContext } from "../components/appContext/AppContext";
// import FormRemoveFolder from "../components/formRemoveFolder/FormRemoveFolder";
// import MenuBox from "../components/menuBox/MenuBox";
// import { Outlet, useNavigation, useParams } from "react-router-dom";
// import Loading from "../components/loading/Loading";

// import { useState, useEffect } from "react";
// import { usePathname, useSearchParams, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  HeaderDeleteBtn,
  HeaderThemeBtn,
  HeaderShareBtn,
} from "./_components/HeaderButtons/HeaderButtons";
import { getFolderIdByPublicId } from "@/utils/app/folders";
import { getServerUser } from "@/utils/app/profiles";

const STATIC_TITLES: Record<string, string> = {
  "/app/added": "Вся Медиатека",
  "/app": "Главная",
  "/app/account": "Профиль",
};


export default async function MainHeader({}) {
  const user = await getServerUser();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const params = useParams();
  const supabase = await createClient();


  const getFolderRole = async () => {
    // if (!pathname.includes("/app/folder/")) {
    //   return "";
    // }
    if (!user) return "";
    return "";

    // const publicId = params.id?.toString();
    // if (!publicId) return "";

    // const folderId = await getFolderIdByPublicId(publicId);

    // const { data } = await supabase
    //   .from("folder_members")
    //   .select("role")
    //   .eq("user_id", user.id)
    //   .eq("folder_id", folderId)
    //   .single();

    // if (data) return data.role;
  };
  const folderRole = await getFolderRole();

  const getTitle = async () => {
    // if (STATIC_TITLES[pathname]) {
    //   return STATIC_TITLES[pathname];
    // }

    // if (pathname.includes("/app/folder/")) {
    //   const { data, error } = await supabase
    //     .from("folders")
    //     .select("name")
    //     .eq("public_id", params.id)
    //     .single();
    //   return error ? "Папка не найдена" : data.name;
    // }

    // if (pathname.includes("/app/search")) {
    //   const query = searchParams.get("q") || "";
    //   return query ? `Результаты поиска по: ${query}` : "Результаты поиска";
    // }

    return "Неизвестная страница";
  };
  const title = await getTitle();

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
