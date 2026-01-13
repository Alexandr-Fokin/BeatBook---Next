// import { useAppContext } from "../components/appContext/AppContext";
// import Popup from "../components/popup/Popup";
// import FormRemoveFolder from "../components/formRemoveFolder/FormRemoveFolder";
// import MenuBox from "../components/menuBox/MenuBox";
// import { Outlet, useNavigation, useParams } from "react-router-dom";
// import Loading from "../components/loading/Loading";
// import { useState } from "react";

import styles from "./layout.module.css";
import Header from "@/app/ui/app/layout/header/Header";
import Sidebar from "@/app/ui/app/layout/sidebar/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { folderId } = useParams();
  // const { userData, setPopup } = useAppContext();
  // const navigation = useNavigation();

  // const [headerConfig, setHeaderConfig] = useState({
  //   title: "",
  //   tools: null,
  // });

  return (
    <div id="app" className={styles.app}>
      <Header />
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.main_header}>
          <div className={styles.main_header__page_title}>
            {/* {headerConfig.title} */}
            Заголовок
          </div>
          <div className={styles.main_header__tools}>
            {/* {headerConfig.tools?.includes("delete") && (
                <a
                  className={styles.main_header__delete_folder}
                  onClick={() =>
                    setPopup(
                      <FormRemoveFolder
                        folder={userData.folders.find((f) => f.id == folderId)}
                      ></FormRemoveFolder>
                    )
                  }
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="768"
                    height="768"
                    viewBox="0 0 768 768"
                  >
                    <g id="icomoon-ignore"></g>
                    <path d="M576 224v416c0 8.832-3.552 16.8-9.376 22.624s-13.792 9.376-22.624 9.376h-320c-8.832 0-16.8-3.552-22.624-9.376s-9.376-13.792-9.376-22.624v-416zM544 160v-32c0-26.496-10.784-50.56-28.128-67.872s-41.376-28.128-67.872-28.128h-128c-26.496 0-50.56 10.784-67.872 28.128s-28.128 41.376-28.128 67.872v32h-128c-17.664 0-32 14.336-32 32s14.336 32 32 32h32v416c0 26.496 10.784 50.56 28.128 67.872s41.376 28.128 67.872 28.128h320c26.496 0 50.56-10.784 67.872-28.128s28.128-41.376 28.128-67.872v-416h32c17.664 0 32-14.336 32-32s-14.336-32-32-32zM288 160v-32c0-8.832 3.552-16.8 9.376-22.624s13.792-9.376 22.624-9.376h128c8.832 0 16.8 3.552 22.624 9.376s9.376 13.792 9.376 22.624v32zM288 352v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32zM416 352v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32z"></path>
                  </svg>
                </a>
              )} */}
          </div>
        </div>
        <div className="main_box">
          {/* {navigation.state === "loading" && <Loading />}
            {navigation.state !== "loading" && (
              <Outlet context={{ setHeaderConfig }} />
            )} */}
          {children}
        </div>
      </main>
      {/* <MenuBox />
        <Popup></Popup> */}
    </div>
  );
}
