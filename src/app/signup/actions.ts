"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id, // обязательно используем id пользователя
      name: name || "Новый пользователь",
      email: email,
      avatar_url: "/user.svg",
    });

    if (profileError) {
      console.log("Ошибка при создании профиля: " + profileError.message);
      return;
    }

    const { error: foldersError } = await supabase.from("folders").insert({
      public_id: nanoid(22),
      owner_id: authData.user.id,
      name: "Тестовая папка",
      icon: 1,
    });

    if (foldersError) {
      console.log("Ошибка при создании папок: " + foldersError.message);
      return;
    }
  }

  if (signUpError) {
    console.log("Ошибка при регистрации: " + signUpError.message);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/signup/confirm-email");
}
