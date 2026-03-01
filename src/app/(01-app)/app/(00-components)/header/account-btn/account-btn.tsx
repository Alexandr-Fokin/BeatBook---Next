"use client";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/actions/supabase/client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AccountMenuBtn from "./account-menu-btn/AccountMenuBtn";
import styles from "./account-btn.module.scss";
import FeatherIcon from "feather-icons-react";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";

export default function Account() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const { user } = useUserData();

  const accountBtns = [
    { href: "/app/account", icon: "user", text: "Мой аккаунт" },
    { href: "/app/#", icon: "download", text: "Экспорт" },
    { href: "/app/#", icon: "upload", text: "Импорт" },
  ];

  if (!user) return <div>Профиль не найден</div>;

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

  return (
    <div className={styles.account} ref={menuRef}>
      <div
        className={styles.account_icon}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <img
          src={user.profile.avatar_url}
          alt="Изображение пользователя"
          className={styles.account_user_img}
        ></img>
      </div>
      {open && (
        <div className={styles.account_menu}>
          {accountBtns.map((btn) => (
            <AccountMenuBtn
              href={btn.href}
              setOpen={setOpen}
              icon={btn.icon}
              key={btn.text}
            >
              {btn.text}
            </AccountMenuBtn>
          ))}
          <form action="/auth/signout" method="post" className="w-full">
            <button
              className={styles.account_menu_link + " w-full cursor-pointer"}
              type="submit"
            >
              <FeatherIcon icon="log-out" />
              Выйти
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
