"use client";

import FeatherIcon from "feather-icons-react";
import styles from "./SearchBar.module.scss";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Берем значение из URL если мы на странице поиска
  const currentQuery = pathname.startsWith("/app/search")
    ? searchParams.get("q") || ""
    : "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;

    if (query.trim()) {
      startTransition(() => {
        router.push(`/app/search?q=${encodeURIComponent(query)}&type=all`);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.header__search_box}>
        <input
          type="search"
          name="search"
          id="search"
          defaultValue={currentQuery}
          placeholder="Поиск..."
          className={styles.header__search_input}
        />
        <label htmlFor="search" className={styles.header__search_icon}>
          <FeatherIcon icon="search" />
        </label>
      </div>
    </form>
  );
}
