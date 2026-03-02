"use client";

import styles from "./header-delete-btn.module.scss";
import { createClient } from "@/actions/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import FeatherIcon from "feather-icons-react";
import useDeleteFolder from "@/hooks/folders/use-delete-folder";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";

export function HeaderDeleteBtn() {
  const { showModal, closeModal, showToast } = useUI();
  const router = useRouter();
  const params = useParams();
  const { user } = useUserData();

  const { mutate, isError, error } = useDeleteFolder(user?.userId ?? "");

  const publicId = params.id?.toString();
  if (!publicId) return;

  const deleteFolder = () =>
    mutate(
      { publicId: publicId },
      {
        onSuccess: ({data}) => {
          router.replace("/app/");
          showToast(
            `Папка ${data.name} удалена`,
            "Папка успешно удалена из вашей медиатеки",
            "success",
          );
          closeModal();
        },
        onError: () => {
          showToast(
            "Ошибка при удалении папки",
            "Возникла ошибка при удалении папки из вашей медиатеки. Попробуйте позже",
            "error",
          );
        },
      },
    );

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
              onClick={deleteFolder}
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
      <FeatherIcon icon="trash-2" />
    </a>
  );
}
