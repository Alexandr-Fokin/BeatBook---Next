"use client";
import { type User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Account({ user }: { user: User | null }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<{ name: string; email: string; id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select(`name, email, id`)
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
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </div>
  );
}