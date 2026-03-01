"use client";
import { FormEvent, useState } from "react";
import styles from "./add-folder-form.module.scss";

import { useRouter } from "next/navigation";
import { useUI } from "@/app/(02-rest)/providers/UIProvider";
import FeatherIcon from "feather-icons-react";
import { FOLDER_ICONS } from "@/const/app";
import { useUserData } from "@/app/(02-rest)/providers/DataProvider";
import useCreateFolder from "@/hooks/folders/use-create-folder";

type AddFolderFormProps = {
  setFolderForm?: React.Dispatch<React.SetStateAction<boolean>>;
  locate?: boolean;
};

export default function AddFolderForm({
  setFolderForm,
  locate = true,
}: AddFolderFormProps) {
  const [folderName, setFolderName] = useState("");
  const [folderIcon, setFolderIcon] = useState("folder");
  const [folderIconMenu, setFolderIconMenu] = useState(false);
  const { showToast } = useUI();
  const { user } = useUserData();
  const router = useRouter();

  const { mutate: createFolder, isPending } = useCreateFolder(
    user?.userId ?? "",
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    createFolder(
      { name: folderName, icon: folderIcon },
      {
        onSuccess: ({ data, folderId }) => {
          showToast(
            "Папка создана",
            `Папка "${data.name}" успешно создана`,
            "success",
          );
          if (setFolderForm) {
            setFolderForm(false);
          }
          if (locate) {
            router.push(`/app/folder/${folderId}`);
          }
          setFolderName("");
          setFolderIcon("folder");
        },
      },
    );
  };

  function selectFolderIcon(key: string) {
    setFolderIcon(key);
    setFolderIconMenu(false);
  }
  return (
    <div className={`${styles.add_folder}${isPending ? ' pending' : ''}`}>
      <form className={styles.add_folder__form} onSubmit={handleSubmit}>
        <div className={styles.add_folder__form_top}>
          <div className={styles.add_folder__form_icon_box}>
            <div
              className={styles.add_folder__form_icon}
              onClick={() => setFolderIconMenu((prev) => !prev)}
            >
              <FeatherIcon icon={folderIcon} />
            </div>
            {folderIconMenu && (
              <div className={styles.add_folder__form_icons}>
                {FOLDER_ICONS.map((ico) => {
                  const folderKey = ico;
                  if (!folderKey) return null;
                  return (
                    <div
                      className={`${styles.add_folder__form_icons_item} ${folderKey == folderIcon ? styles.active : ""}`}
                      onClick={() => selectFolderIcon(folderKey)}
                      key={folderKey}
                    >
                      <FeatherIcon icon={folderKey} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <input
            type="text"
            name="name"
            id="name"
            className="default_input_md"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Новая папка"
          />
        </div>

        <button
          type="submit"
          className={styles.add_folder__form_submit}
          disabled={!folderName.trim()}
        >
          Создать
        </button>
      </form>
    </div>
  );
}
