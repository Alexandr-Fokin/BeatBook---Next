"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import styles from "./Buttons.module.scss";
import FeatherIcon from "feather-icons-react";

interface FolderButtonProps {
  link: string;
  icon: string;
  shared?: boolean;
  children: ReactNode;
}

export function FolderButton({
  link,
  icon,
  children,
  shared = false,
}: FolderButtonProps) {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={`${styles.button__folder}${
        pathname === link ? " active" : ""
      }`}
    >
      {shared && (
        <div className={styles.button_folder_shared}>
          <FeatherIcon icon="users" />
        </div>
      )}
      <FeatherIcon icon={icon} />
      {children}
    </Link>
  );
}

export function HomeButton() {
  const pathname = usePathname();
  return (
    <Link
      href="/app"
      className={`${styles.button__home}${pathname == "/app" ? " active" : ""}`}
    >
      <FeatherIcon icon="home" />
    </Link>
  );
}
