import { createClient } from "@/utils/supabase/server";
import { FolderButton } from "../buttons/Buttons";
import styles from "./Sidebar.module.css";
import SidebarHeader from "./sidebar-header";

export default async function Sidebar() {
  const supabase = await createClient();
  let foldersData = [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) console.log("Ошибка при получении пользователя");

  if (user) {
    const { data, error: foldersError } = await supabase
      .from("folders")
      .select()
      .eq("owner_id", user.id);

    if (foldersError) console.log("Ошибка при получении папок");
    foldersData = data || [];
  }
  return (
    <div className={styles.sidebar}>
      <SidebarHeader />
      <div className={styles.sidebar__folders}>
        <FolderButton link="/app/added" id={99}>
          Вся Медиатека
        </FolderButton>
        {foldersData.map((folder) => (
          <FolderButton
            key={folder.id}
            link={`/app/folder/${folder.public_id}`}
            id={folder.icon}
          >
            {folder.name}
          </FolderButton>
        ))}
      </div>
    </div>
  );
}
