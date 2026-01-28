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
    });
  }

  revalidatePath("/app", "layout");
  redirect("/app");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id, // обязательно используем id пользователя
      name: "Новый пользователь",
      email: email,
    });

    if (profileError) {
      console.log("Ошибка при создании профиля: " + profileError.message);
      return;
    }
  }

  if (signUpError) {
    console.log("Ошибка при регистрации: " + signUpError.message);
    return;
  }

  revalidatePath("/app", "layout");
  redirect("/app");
}
