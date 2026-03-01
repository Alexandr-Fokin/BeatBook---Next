"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/actions/supabase/server";
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
      icon: "folder",
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

export type SignupState = {
  error?: string;
  values?: {
    email?: string;
    name?: string;
  };
};

export async function newSignup(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { error: "Введите корректный email", values: { email, name } };
  }

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    console.log("Ошибка при регистрации: " + signUpError.message);
    return {
      error: "Ошибка при регистрации: " + signUpError.message,
      values: { email, name },
    };
  }

  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id, // обязательно используем id пользователя
      name: name || "Новый пользователь",
      email: email,
      avatar_url: "/user.svg",
    });

    if (profileError) {
      return {
        error: "Ошибка при создании профиля: " + profileError.message,
        values: { email, name },
      };
    }
  }

  revalidatePath("/", "layout");
  redirect("/signup/confirm-email");
}
