import { createClient } from "@/actions/supabase/client";
import { SupabaseProfile } from "@/types/supabase";

export const getProfileByUserId = async (
  userId: string,
): Promise<SupabaseProfile> => {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return profile;
};

export const getProfileByUsername = async (username: string) => {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  return profile;
};

// export const getServerUser = async () => {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   return user;
// };
