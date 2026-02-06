"use client";

import Link from "next/link";
import styles from "./account.module.css";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type AccountMenuBtnType = {
  children: ReactNode;
  href: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export default function AccountMenuBtn({ children, href, setOpen }: AccountMenuBtnType) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`${styles.account_menu_link}${pathname === href ? " active" : ""}`}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );
}
