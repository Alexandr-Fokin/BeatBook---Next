import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { HomeButton } from "../buttons/Buttons";
import { createClient } from "@/utils/supabase/server";
import Account from "./Account";
import SearchBar from "./_components/SearchBar";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          <Account user={user}></Account>
        </div>
      </div>
    </div>
  );
}
