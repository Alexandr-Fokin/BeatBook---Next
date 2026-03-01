"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./home-btn.module.scss";
import FeatherIcon from "feather-icons-react";

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
