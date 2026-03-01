"use client";

import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import { useEffect } from "react";

export default function ThemedBody({ children }: { children: React.ReactNode }) {
  const { user } = useUserData();

  useEffect(() => {
    const theme = user?.profile.theme || "light";
    document.body.setAttribute("data-theme", theme);
    document.body.setAttribute("data-font", "md");
  }, [user?.profile.theme]);

  return <>{children}</>;
}