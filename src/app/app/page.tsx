import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Не авторизован</div>;

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  return <div>Аккаунт: {profile?.name}</div>;
}