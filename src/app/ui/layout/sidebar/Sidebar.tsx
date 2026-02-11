import { createClient } from "@/utils/supabase/server";
import { FolderButton } from "../buttons/Buttons";
import styles from "./Sidebar.module.scss";
import SidebarHeader from "./SidebarHeader";

type FoldersDataType = {
  id: string;
  public_id: string;
  name: string;
  icon: string;
  folder_members: {
    user_id: string;
  }[];
};
export default async function Sidebar() {
  const supabase = await createClient();
  let foldersData: FoldersDataType[] | []  = [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) console.log("Ошибка при получении пользователя");

  // if (user) {
  //   const { data: folders } = await supabase
  //     .from("folders")
  //     .select(
  //       `
  //   *,
  //   folder_members!inner(user_id, role),
  //   folder_members ( user_id )
  // `,
  //     )
  //     .eq("folder_members.user_id", user.id);

  //   foldersData = folders || [];
  // }
  if (user) {
    const { data: folders } = await supabase
      .from("folders")
      .select(
        `
    id,
    public_id,
    name,
    icon,
    folder_members ( user_id )
  `,
      )
      .in(
        "id",
        (
          await supabase
            .from("folder_members")
            .select("folder_id")
            .eq("user_id", user.id)
        ).data?.map((f) => f.folder_id) || [],
      );
    if (folders) {
      foldersData = folders || [];
    }
  }
  return (
    <div className={styles.sidebar}>
      <SidebarHeader />
      <div className={styles.sidebar__folders}>
        <FolderButton link="/app/added" icon='grid'>
          Вся Медиатека
        </FolderButton>
        {foldersData.map((folder) => (
          <FolderButton
            key={folder.id}
            link={`/app/folder/${folder.public_id}`}
            icon={folder.icon}
            shared={folder.folder_members?.length > 1 ? true : false}
          >
            {folder.name}
          </FolderButton>
        ))}
      </div>
    </div>
  );
}
