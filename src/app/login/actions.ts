"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("Ошибка при входе: " + error.message);
    return;
  }

  // Проверяем профиль
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (!profile) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      name: "Новый пользователь",
      email,
      avatar_url: "/user.svg",
    });
  }

  revalidatePath("/app", "layout");
  redirect("/app");
}
