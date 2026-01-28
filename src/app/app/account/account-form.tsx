"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import styles from "./account-form.module.css";
import { redirect } from "next/navigation";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  // 🔹 Загрузка профиля
  const getProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        console.log("data есть -", data);
        setName(data.name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user]); // ❗ supabase убрали из зависимостей

  useEffect(() => {
    if (user) getProfile();
  }, [user, getProfile]);

  // 🔹 Обновление профиля
  async function updateProfile({
    name,
    avatar_url,
  }: {
    name: string | null;
    avatar_url: string | null;
  }) {
    if (!user) return;
    console.log("user есть -", user);

    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          name: name,
          avatar_url: avatar_url,
        },
        { onConflict: "id" }, // ❗ защита от дублей
      );

      if (error) throw error;

      alert("Профиль обновлен!");
    } catch (error) {
      alert("Ошибка обновления профиля. Повторите попытку позже");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.account_form}>
      <div className={styles.account_inputs}>
        <div className={styles.account_input_box}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" value={user?.email ?? ""} disabled />
        </div>

        <div className={styles.account_input_box}>
          <label htmlFor="avatar_url">Ссылка на аватар:</label>
          <input
            id="avatar_url"
            type="text"
            value={avatar_url ?? ""}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <div className={styles.account_input_box}>
          <label htmlFor="name">Имя пользователя:</label>
          <input
            id="name"
            type="text"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          className={styles.account_save_btn}
          onClick={() => updateProfile({ name, avatar_url })}
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
