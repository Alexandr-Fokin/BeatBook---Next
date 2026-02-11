"use client";

import styles from "./HeaderButtons.module.css";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUI } from "@/app/providers/UIProvider";
import ShareFolderForm from "../ShareFolderForm/ShareFolderForm";
import { useUser } from "@/app/providers/UserProvider";
import { getProfileByUserId } from "@/utils/app/profiles";
import FeatherIcon from "feather-icons-react";

export function HeaderDeleteBtn() {
  const { showModal, closeModal, showToast } = useUI();
  const router = useRouter();
  const params = useParams();

  const removeFolder = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("public_id", params.id);

    if (error) console.log("Ошибка удаления папки");

    router.replace("/app/added");
    router.refresh();
  };

  const handleDeleteClick = () => {
    showModal(
      <div className={styles.main_header_delete_form}>
        <div className="popup_block_inner">
          <div className={styles.main_header_delete_form_msg_title}>
            Вы точно хотите удалить папку?
          </div>
          <div className="buttons flex gap-2 flex-col w-full">
            <div
              className="button-cancel default_btn_secondary w-full"
              onClick={closeModal}
            >
              Отмена
            </div>
            <div
              className="button-remove default_btn_destructive w-full"
              onClick={async () => {
                await removeFolder();
                showToast(
                  "Папка удалена",
                  "Папка успешно удалена из вашей медиатеки",
                  "success",
                );
                closeModal();
              }}
            >
              Удалить
            </div>
          </div>
        </div>
      </div>,
    );
  };

  return (
    <a
      className={styles.main_header__delete_folder}
      onClick={handleDeleteClick}
    >
      <FeatherIcon icon="trash-2" />
    </a>
  );
}

export function HeaderThemeBtn() {
  const router = useRouter();
  const [theme, setTheme] = useState("");
  const user = useUser();

  useEffect(() => {
    const loadTheme = async () => {
      if (!user) {
        setTheme("light");
        return;
      }

      const getProfileByUserId = async (userId: string) => {
        const supabase = createClient();

        const { data: profile } = await supabase
          .from("profiles")
          .select()
          .eq("id", userId)
          .single();

        return profile;
      };
      const profile = await getProfileByUserId(user.id);

      const userTheme = profile?.theme || "light";
      setTheme(userTheme);
    };
    loadTheme();
  }, [user]);

  const toggleTheme = async () => {
    const supabase = createClient();

    if (!user) return;

    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    const { error } = await supabase
      .from("profiles")
      .update({ theme: newTheme })
      .eq("id", user.id);

    if (error) {
      console.error("Ошибка обновления темы:", error);
    }
    router.refresh();
  };

  return (
    <a onClick={toggleTheme} className={styles.main_header__theme_btn}>
      {theme == "dark" && <FeatherIcon icon="moon" />}
      {theme == "light" && <FeatherIcon icon="sun" />}
    </a>
  );
}

export function HeaderShareBtn() {
  const { showModal } = useUI();
  return (
    <a
      className={styles.main_header__share_btn}
      onClick={() => showModal(<ShareFolderForm />)}
    >
      <FeatherIcon icon="users" />
    </a>
  );
}
