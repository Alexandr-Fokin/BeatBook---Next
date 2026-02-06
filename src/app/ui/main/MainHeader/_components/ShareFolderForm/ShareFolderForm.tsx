"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./ShareFolderForm.module.css";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useUI } from "@/app/providers/UIProvider";
import { getFolderIdByPublicId } from "@/utils/app/folders";
import Image from "next/image";
import { getProfileByUsername } from "@/utils/app/profiles";

type FolderUserData = {
  role: string;
  profiles: {
    name: string;
    username: string;
    avatar_url: string;
  };
};

export default function ShareFolderForm() {
  const { showToast } = useUI();
  const supabase = createClient();
  const params = useParams();
  const [folderUsersWithData, setFolderUsersWithData] = useState<
    FolderUserData[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  const publicId = params.id?.toString();

  const fetchFolderUsers = async () => {
    if (!publicId) return;

    setLoading(true);

    const folderId = await getFolderIdByPublicId(publicId);
    if (!folderId) {
      setLoading(false);
      return;
    }

    const { data: members } = await supabase
      .from("folder_members")
      .select(
        `
    role,
    profiles (
      name,
      username,
      avatar_url
    )
  `,
      )
      .eq("folder_id", folderId);
    if (members) {
      const normalized = members.map((m: any) => ({
        role: m.role,
        profiles: Array.isArray(m.profiles) ? m.profiles[0] : m.profiles,
      }));
      setFolderUsersWithData(normalized);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFolderUsers();
  }, [publicId]);

  const addUserToFolder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString().trim();

    const { data: userValid, error: userInvalid } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (!publicId) return;
    const folderId = await getFolderIdByPublicId(publicId);
    if (!folderId) return;

    if (userInvalid) {
      showToast(
        "Пользователь не найден",
        `Пользователь с юзернеймом '${username}' не найден`,
        "error",
      );
      return;
    }

    if (userValid) {
      console.log("userValid", userValid);
      const { data: existing } = await supabase
        .from("folder_members")
        .select()
        .eq("user_id", userValid.id)
        .eq("folder_id", folderId)
        .maybeSingle();
      console.log("userValid.id,params.id", userValid.id, params.id);
      console.log("existing", existing);
      if (existing) {
        showToast(
          "Пользователь уже добавлен",
          `Пользователь '${username}' уже добавлен к этой папке`,
          "info",
        );
        return;
      }
      const { error } = await supabase.from("folder_members").insert({
        folder_id: folderId,
        user_id: userValid.id,
        role: "editor",
      });
      if (!error) {
        showToast(
          "Пользователь добавлен",
          `Пользователь '${username}' добавлен редактором`,
          "success",
        );
        await fetchFolderUsers();
      }
    }
  };
  const deleteUserFromFolder = async (username: string) => {
    const id = await getProfileByUsername(username).then((res) => res.id);
    if (id) {
      const { error } = await supabase
        .from("folder_members")
        .delete()
        .eq("user_id", id)
        .eq("folder_id", await getFolderIdByPublicId(publicId || ""))
        .neq("role", "owner");

      if (!error) {
        showToast(
          "Пользователь удален",
          `Пользователь '${username}' удален из папки`,
          "success",
        );
        await fetchFolderUsers();
      }
    }
  };

  return (
    <div className={styles.share_folder_form}>
      <div className={styles.share_folder_form_header}>
        <div className={styles.share_folder_form_header_icon}>
          <Image
            src="/icons/shared.svg"
            width={24}
            height={24}
            alt="Иконка общего доступа"
          />
        </div>
        <h3>Общий доступ</h3>
        <p>Управляйте доступом для других пользователей этой папки</p>
      </div>
      <div className='popup_block'>
        <h4>Добавить пользователя</h4>
        <div className='popup_block_inner'>
          <form
            className={styles.share_folder_form_form}
            onSubmit={(e) => addUserToFolder(e)}
          >
            <input type="text" name="username" placeholder="Юзернейм" />
          </form>
        </div>
      </div>
      <div className='popup_block'>
        <h4>Текущие пользователи</h4>
        <div className='popup_block_inner'>
          {loading ? (
            <LoadingUsers />
          ) : (
            <div className={styles.users}>
              {folderUsersWithData?.map((user) => (
                <div className={styles.user} key={user.profiles?.username}>
                  <div className={styles.user_left}>
                    <img
                      src={user.profiles?.avatar_url}
                      alt="Изображение пользователя"
                      className={styles.user_img}
                    />
                    <div className={styles.user_profile}>
                      <div className={styles.user_name}>
                        {user.profiles?.name}
                      </div>
                      <div className={styles.user_username}>
                        {user.profiles?.username}
                      </div>
                    </div>
                  </div>
                  <div className={styles.user_role}>
                    {user.role === "owner"
                      ? "Владелец"
                      : user.role === "editor"
                        ? "Редактор"
                        : "Неизвестно"}
                  </div>
                  {user.role !== "owner" && (
                    <div
                      className={styles.user_right}
                      onClick={() =>
                        deleteUserFromFolder(user.profiles?.username)
                      }
                    >
                      <div className={styles.user_delete}>✕</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingUsers() {
  return (
    <div className={styles.user_sceleton}>
      <div className={styles.user_left_sceleton}>
        <div className={`${styles.user_img_sceleton} sceleton`}></div>
        <div className={styles.user_profile_sceleton}>
          <div className={`${styles.user_name_sceleton} sceleton`}></div>
          <div className={`${styles.user_username_sceleton} sceleton`}></div>
        </div>
      </div>
      <div className={`${styles.user_role_sceleton} sceleton`}></div>
      <div className={`${styles.user_right_sceleton} sceleton`}></div>
    </div>
  );
}
