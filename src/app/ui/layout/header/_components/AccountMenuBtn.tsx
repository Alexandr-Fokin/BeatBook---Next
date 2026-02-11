"use client";

import Link from "next/link";
import styles from "./Account.module.scss";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import FeatherIcon from "feather-icons-react";

type AccountMenuBtnType = {
  children: ReactNode;
  href: string;
  icon: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountMenuBtn({
  children,
  href,
  icon,
  setOpen,
}: AccountMenuBtnType) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`${styles.account_menu_link}${pathname === href ? " active" : ""}`}
      onClick={() => setOpen(false)}
    >
      <FeatherIcon icon={icon} />
      {children}
    </Link>
  );
}
