"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { FolderIcon } from "@/app/ui/FolderIcons";
import styles from "./Buttons.module.css";

interface FolderButtonProps {
  link: string;
  id: number;
  children: ReactNode;
}

export function FolderButton({ link, id, children }: FolderButtonProps) {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={`${styles.button__folder}${
        pathname === link ? " active" : ""
      }`}
    >
      <FolderIcon id={id} />
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
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.78359 9.5795C2.50825 9.79417 2.33325 10.1267 2.33325 10.5V23.3333C2.33325 24.2993 2.72642 25.1767 3.35875 25.8078C3.99109 26.439 4.86725 26.8333 5.83325 26.8333H22.1666C23.1326 26.8333 24.0099 26.4402 24.6411 25.8078C25.2723 25.1755 25.6666 24.2993 25.6666 23.3333V10.5C25.6654 10.15 25.5103 9.80817 25.2163 9.5795L14.7163 1.41284C14.2986 1.092 13.7118 1.08034 13.2836 1.41284L2.78359 9.5795ZM18.6666 24.5V14C18.6666 13.356 18.1439 12.8333 17.4999 12.8333H10.4999C9.85592 12.8333 9.33325 13.356 9.33325 14V24.5H5.83325C5.51125 24.5 5.22075 24.3705 5.00842 24.1582C4.79609 23.9458 4.66659 23.6553 4.66659 23.3333V11.0705L13.9999 3.8115L23.3333 11.0705V23.3333C23.3333 23.6553 23.2038 23.9458 22.9914 24.1582C22.7791 24.3705 22.4886 24.5 22.1666 24.5H18.6666ZM11.6666 24.5V15.1667H16.3333V24.5H11.6666Z"
          fill="#252525"
          fillOpacity="0.5"
        />
      </svg>
    </Link>
  );
}
