"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "./AddFolderForm.module.css";
import { nanoid } from "nanoid";
import { FolderIcon, folderIcons } from "@/app/ui/FolderIcons";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUI } from "@/app/providers/UIProvider";

type AddFolderFormProps = {
  setFolderForm: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddFolderForm({ setFolderForm }: AddFolderFormProps) {
  const [folderName, setFolderName] = useState("");
  const [folderIcon, setFolderIcon] = useState(1);
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

      console.log(data)
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
    setFolderIcon(1);
  };
  function selectFolderIcon(key: number) {
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
              <FolderIcon id={folderIcon} />
            </div>
            {folderIconMenu && (
              <div className={styles.add_folder__form_icons}>
                {Object.keys(folderIcons).map((key) => {
                  const folderKey = Number(key);
                  if (folderKey == 99) return null;
                  return (
                    <div
                      className={`${styles.add_folder__form_icons_item} ${folderKey == folderIcon ? styles.active : ""}`}
                      onClick={() => selectFolderIcon(folderKey)}
                      key={folderKey}
                    >
                      <FolderIcon id={folderKey} />
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
