import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { HomeButton } from "@/app/(01-app)/app/(00-components)/header/home-btn/home-btn";
import Account from "./account-btn/account-btn";
import SearchBar from "./searchbar/searchbar";

export default async function Header() {
  return (
    <div className={styles.header}>
      <Link href="/app" className={styles.header__logo_box}>
        <Image
          className={styles.header__logo}
          src="/logo.svg"
          height={28}
          width={274}
          alt="Логотип"
        />
      </Link>
      <div className={styles.header__content}>
        <div className={styles.header__content_left}>
          <HomeButton />
          <SearchBar />
        </div>
        <div className="">
          <Account />
        </div>
      </div>
    </div>
  );
}
