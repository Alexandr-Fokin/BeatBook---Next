"use client";

import {  useState } from "react";
import { createClient } from "@/actions/supabase/client";
import styles from "./account-form.module.css";
import { useRouter } from "next/navigation";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";

export default function AccountForm() {
  const { user, setUser } = useUserData();
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();

  if (!user) return;

  const usernameRegex = /^[a-z0-9.]+$/;
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); // автоматически в нижний регистр
    if (value === "" || usernameRegex.test(value)) {
      setUser({ ...user, profile: { ...user.profile, username: value } });
    } else {
      alert("Допустимы только: маленькие буквы, цифры, и знак '.'");
    }
  };

  // 🔹 Обновление профиля
  async function updateProfile() {
    if (!user) return;
    console.log("user есть -", user);

    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.userId,
          name: user.profile.name,
          avatar_url: user.profile.avatar_url,
          username: user.profile.username,
        },
        { onConflict: "id" }, // защита от дублей
      );

      if (error) throw error;

      showToast("Профиль обновлен!", "Ваш профиль успешно обновлен", "success");
      router.refresh();
    } catch (error) {
      showToast(
        "Ошибка при обновлении",
        "Ошибка обновления профиля. Повторите попытку позже",
        "error",
      );
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.account_form}>
      <div className={styles.account_inputs}>
        <div className={styles.account_input_box}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={user?.profile.email ?? ""}
            disabled
          />
        </div>

        <div className={styles.account_input_box}>
          <label htmlFor="name">Имя пользователя:</label>
          <input
            id="name"
            type="text"
            value={user.profile.name ?? ""}
            onChange={(e) =>
              setUser({
                ...user,
                profile: { ...user.profile, name: e.target.value },
              })
            }
          />
        </div>

        <div className={styles.account_input_box}>
          <label htmlFor="username">Юзернейм:</label>
          <input
            id="username"
            type="text"
            value={user.profile.username ?? ""}
            onChange={(e) => handleUsernameChange(e)}
          />
        </div>

        <div className={styles.account_input_box}>
          <label htmlFor="avatar_url">Ссылка на аватар:</label>
          <input
            id="avatar_url"
            type="text"
            value={user.profile.avatar_url ?? ""}
            onChange={(e) =>
              setUser({
                ...user,
                profile: { ...user.profile, avatar_url: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div>
        <button
          className={styles.account_save_btn}
          onClick={updateProfile}
          disabled={loading}
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className={styles.account_signout_btn} type="submit">
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </div>
  );
}
