"use client";

import styles from "./header-theme-btn.module.scss";
import { createClient } from "@/actions/supabase/client";
import { useRouter } from "next/navigation";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import FeatherIcon from "feather-icons-react";

export function HeaderThemeBtn() {
  const router = useRouter();
  const { user, setUser } = useUserData();

  if (!user) return <div className="">Пользователь не найден</div>;

  const toggleTheme = async () => {
    const supabase = createClient();

    const oldTheme = user.profile.theme;
    const newTheme = oldTheme === "light" ? "dark" : "light";

    setUser({ ...user, profile: { ...user.profile, theme: newTheme } });

    const { error } = await supabase
      .from("profiles")
      .update({ theme: newTheme })
      .eq("id", user.userId);

    if (error) {
      console.error("Ошибка обновления темы:", error);
      setUser({ ...user, profile: { ...user.profile, theme: oldTheme } });
    }
    router.refresh();
  };

  return (
    <a onClick={toggleTheme} className={styles.main_header__theme_btn}>
      {user.profile.theme == "dark" && <FeatherIcon icon="moon" />}
      {user.profile.theme == "light" && <FeatherIcon icon="sun" />}
    </a>
  );
}
