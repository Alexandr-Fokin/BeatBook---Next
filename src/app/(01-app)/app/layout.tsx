// src/app/(01-app)/app/layout.tsx
import styles from "./layout.module.css";
import Header from "./(00-components)/header/header";
import Sidebar from "./(00-components)/sidebar/sidebar";
import MainHeader from "./(00-components)/main/main-header/main-header";
import { createClient } from "@/actions/supabase/server";
import { getProfileByUserId } from "@/actions/app/profiles";
import { UIProvider } from "@/app/(02-rest)/providers/UIProvider";
import { DataProvider } from "@/app/(02-rest)/providers/DataProvider";
import ThemedBody from "@/app/(02-rest)/components/themed-body/themed-body";
import ReactQueryProvider from "@/app/(02-rest)/providers/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { redirect } from "next/navigation";
import { SupabaseProfile } from "@/types/supabase";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const getProfileByUserId = async (
    userId: string,
  ): Promise<SupabaseProfile> => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return profile;
  };

  const defaultUserData = {
    userId: user.id,
    profile: await getProfileByUserId(user.id),
  };

  return (
    <ReactQueryProvider>
      <DataProvider defaultUserData={defaultUserData}>
        <ThemedBody>
          <ReactQueryDevtools initialIsOpen={false} />
          <UIProvider>
            <div id="app" className={styles.app}>
              <Header />
              <Sidebar />
              <main className={styles.main}>
                <MainHeader />
                <div className="main_box">{children}</div>
              </main>
            </div>
          </UIProvider>
        </ThemedBody>
      </DataProvider>
    </ReactQueryProvider>
  );
}
