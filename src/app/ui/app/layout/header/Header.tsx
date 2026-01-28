import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { HomeButton } from "../buttons/Buttons";
import { createClient } from "@/utils/supabase/server";
import Account from "./Account";

// import { NavLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

export default async function Header() {
  //   const [searchValue, setSearchValue] = useState("");
  //   const navigate = useNavigate();

  //   const startSearch = (e) => {
  //     e.preventDefault();
  //     navigate(`/search?q=${encodeURIComponent(searchValue)}&type=all`);
  //   };

  //   useEffect(() => {
  //     if (!location.pathname.startsWith("/search")) {
  //       setSearchValue("");
  //     }
  //   }, [location.pathname]);

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
          <form
          //   onSubmit={(e) => startSearch(e)}
          >
            <label htmlFor="">
              <input
                type="text"
                className={styles.header__search_input}
                // value={searchValue}
                placeholder="Поиск"
                // onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div className="">
          <Account user={user}></Account>
        </div>
      </div>
    </div>
  );
}
