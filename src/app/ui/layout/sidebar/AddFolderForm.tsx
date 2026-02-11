"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./AddFolderForm.module.scss";
import { nanoid } from "nanoid";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUI } from "@/app/providers/UIProvider";
import FeatherIcon from "feather-icons-react";

type AddFolderFormProps = {
  setFolderForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const FOLDER_ICONS = [
  "folder",
  "heart",
  "coffee",
  "star",
  "zap",
  "thumbs-up",
  "thumbs-down",
  "smile",
  "meh",
  "frown",
  "headphones",
  "moon",
];

export default function AddFolderForm({ setFolderForm }: AddFolderFormProps) {
  const [folderName, setFolderName] = useState("");
  const [folderIcon, setFolderIcon] = useState("folder");
  const [folderIconMenu, setFolderIconMenu] = useState(false);
  const { showToast } = useUI();

  const router = useRouter();
  const supabase = createClient();

  const addFolder = async (e: FormEvent) => {
    e.preventDefault();

    const folderId = nanoid(22);
    const { data, error } = await supabase
      .from("folders")
      .insert({
        name: folderName,
        icon: folderIcon,
        public_id: folderId,
      })
      .select()
      .single();

    console.log(data);
    if (error) {
      console.log(error.message);
      alert("Ошибка при создании папки");
    }

    const { error: membersError } = await supabase
      .from("folder_members")
      .insert({
        folder_id: data.id,
        role: "owner",
      });

    if (membersError) {
      console.log(membersError.message);
      alert("Ошибка при добавлении роли папки");
    }

    showToast(
      "Папка создана",
      `Папка "${folderName}" успешно создана`,
      "success",
    );

    setFolderForm(false);

    router.push(`/app/folder/${folderId}`);
    router.refresh();

    setFolderName("");
    setFolderIcon("folder");
  };
  function selectFolderIcon(key: string) {
    setFolderIcon(key);
    setFolderIconMenu(false);
  }

  return (
    <div className={styles.add_folder}>
      <form className={styles.add_folder__form} onSubmit={addFolder}>
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
                  if (folderKey == "grid") return null;
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
