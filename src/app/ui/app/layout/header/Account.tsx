"use client";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Account({ user }: { user: User | null }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    id: string;
    avatar_url: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select(`name, email, id, avatar_url`)
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          console.log(error);
          throw error;
        }

        if (data) setProfile(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, supabase]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="account">
      <div
        className="icon"
        onClick={() => {
          setOpen(prev => !prev);
        }}
      >
        <Image src={profile.avatar_url} width={40} height={40} alt='Изображение пользователя'></Image>
        <h1>{profile.name}</h1>
        <p>{profile.email}</p>
      </div>
      {open && (
        <div className="menu">
          <Link href="/app/account">Мой аккаунт</Link>
          <p>2314134</p>
        </div>
      )}
    </div>
  );
}
