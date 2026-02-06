"use client";

import styles from "./HeaderButtons.module.css";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppIcon } from "@/app/ui/AppIcons";
import { useUI } from "@/app/providers/UIProvider";
import ShareFolderForm from "../ShareFolderForm/ShareFolderForm";
import { useUser } from "@/app/providers/UserProvider";
import { getProfileByUserId } from "@/utils/app/profiles";

export function HeaderDeleteBtn() {
  const { showModal, closeModal, showToast } = useUI();
  const router = useRouter();
  const params = useParams();

  const removeFolder = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("public_id", params.id);

    if (error) console.log("Ошибка удаления папки");

    router.replace("/app/added");
    router.refresh();
  };

  const handleDeleteClick = () => {
    showModal(
      <div className={styles.main_header_delete_form}>
        <div className="popup_block_inner">
          <div className={styles.main_header_delete_form_msg_title}>
            Вы точно хотите удалить папку?
          </div>
          <div className="buttons flex gap-2 flex-col w-full">
            <div
              className="button-cancel default_btn_secondary w-full"
              onClick={closeModal}
            >
              Отмена
            </div>
            <div
              className="button-remove default_btn_destructive w-full"
              onClick={async () => {
                await removeFolder();
                showToast(
                  "Папка удалена",
                  "Папка успешно удалена из вашей медиатеки",
                  "success",
                );
                closeModal();
              }}
            >
              Удалить
            </div>
          </div>
        </div>
      </div>,
    );
  };

  return (
    <a
      className={styles.main_header__delete_folder}
      onClick={handleDeleteClick}
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
  );
}

export function HeaderThemeBtn() {
  const router = useRouter();
  const [theme, setTheme] = useState("");
  const user = useUser();

  useEffect(() => {
    const loadTheme = async () => {
      if (!user) return;

      const profile = await getProfileByUserId(user.id);
      const userTheme = profile?.theme || "light";
      setTheme(userTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const supabase = createClient();

    if (!user) return;

    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    const { error } = await supabase
      .from("profiles")
      .update({ theme: newTheme })
      .eq("id", user.id);

    if (error) {
      console.error("Ошибка обновления темы:", error);
    }
    router.refresh();
  };

  return (
    <a onClick={toggleTheme} className={styles.main_header__theme_btn}>
      {theme == "dark" && <AppIcon id={2}></AppIcon>}
      {theme == "light" && <AppIcon id={1}></AppIcon>}
    </a>
  );
}

export function HeaderShareBtn() {
  const { showModal } = useUI();
  return (
    <a
      className={styles.main_header__share_btn}
      onClick={() => showModal(<ShareFolderForm />)}
    >
      <svg
        width="768"
        height="768"
        viewBox="0 0 768 768"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M576 672V608C576 563.84 558.048 523.776 529.152 494.848C500.256 465.92 460.16 448 416 448H160C115.84 448 75.776 465.952 46.848 494.848C17.92 523.744 0 563.84 0 608V672C0 689.664 14.336 704 32 704C49.664 704 64 689.664 64 672V608C64 581.472 74.72 557.536 92.128 540.128C109.536 522.72 133.472 512 160 512H416C442.528 512 466.464 522.72 483.872 540.128C501.28 557.536 512 581.472 512 608V672C512 689.664 526.336 704 544 704C561.664 704 576 689.664 576 672ZM448 224C448 179.84 430.048 139.776 401.152 110.848C372.256 81.92 332.16 64 288 64C243.84 64 203.776 81.952 174.848 110.848C145.92 139.744 128 179.84 128 224C128 268.16 145.952 308.224 174.848 337.152C203.744 366.08 243.84 384 288 384C332.16 384 372.224 366.048 401.152 337.152C430.08 308.256 448 268.16 448 224ZM384 224C384 250.528 373.28 274.464 355.872 291.872C338.464 309.28 314.528 320 288 320C261.472 320 237.536 309.28 220.128 291.872C202.72 274.464 192 250.528 192 224C192 197.472 202.72 173.536 220.128 156.128C237.536 138.72 261.472 128 288 128C314.528 128 338.464 138.72 355.872 156.128C373.28 173.536 384 197.472 384 224ZM768 672V608C767.968 568.16 753.376 531.68 729.12 503.648C708.256 479.552 680.224 461.696 648.192 453.216C631.104 448.704 613.6 458.88 609.088 475.968C604.576 493.056 614.752 510.56 631.84 515.072C651.264 520.224 668.192 531.008 680.736 545.536C695.264 562.368 703.968 584.128 704 608V672C704 689.664 718.336 704 736 704C753.664 704 768 689.664 768 672ZM504.064 131.168C529.76 137.76 550.304 154.048 562.848 175.232C575.392 196.416 579.84 222.272 573.248 247.968C567.616 269.984 554.848 288.16 537.888 300.832C527.84 308.352 516.288 313.92 503.872 317.184C486.784 321.664 476.544 339.168 481.056 356.256C485.568 373.344 503.04 383.584 520.128 379.072C540.512 373.728 559.552 364.512 576.192 352.064C604.48 330.944 625.856 300.448 635.232 263.808C646.176 221.024 638.752 177.76 617.888 142.592C597.024 107.424 562.688 80.096 519.904 69.12C502.784 64.736 485.344 75.072 480.96 92.192C476.576 109.312 486.912 126.752 504.032 131.136L504.064 131.168Z"
          fill="#252525"
        />
      </svg>
    </a>
  );
}
