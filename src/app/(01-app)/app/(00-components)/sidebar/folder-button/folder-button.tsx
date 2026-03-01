"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import styles from "./folder-button.module.scss";

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
  