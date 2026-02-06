"use client";
import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null>(null);

export function UserProvider({ user, children }: { user: User | null; children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);