"use client";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AccountMenuBtn from "./AccountMenuBtn";
import styles from "./account.module.css";

export default function Account({ user }: { user: User | null }) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const supabase = createClient();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    id: string;
    avatar_url: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select(`name, email, id, avatar_url`)
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          console.log(error);
          throw error;
        }

        if (data) setProfile(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, supabase]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className={styles.account} ref={menuRef}>
      <div
        className={styles.account_icon}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <img
          src={profile.avatar_url}
          alt="Изображение пользователя"
          className={styles.account_user_img}
        ></img>
      </div>
      {open && (
        <div className={styles.account_menu}>
          <AccountMenuBtn href="/app/account" setOpen={setOpen}>
            Мой аккаунт
          </AccountMenuBtn>
          <AccountMenuBtn href="/app/#" setOpen={setOpen}>
            Экспорт
          </AccountMenuBtn>
          <AccountMenuBtn href="/app/#" setOpen={setOpen}>
            Импорт
          </AccountMenuBtn>
          <form action="/auth/signout" method="post" className="w-full">
            <button
              className={styles.account_menu_link + " w-full cursor-pointer"}
              type="submit"
            >
              Выйти
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
