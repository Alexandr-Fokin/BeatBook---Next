import styles from "./layout.module.css";
import Header from "@/app/ui/layout/header/Header";
import Sidebar from "@/app/ui/layout/sidebar/Sidebar";
import MainHeader from "@/app/ui/main/MainHeader/MainHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div id="app" className={styles.app}>
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <MainHeader />
        <div className="main_box">{children}</div>
      </main>
    </div>
  );
}
