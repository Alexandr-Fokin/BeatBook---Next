"use client";

import { createContext, useContext, useState } from "react";
import { DefaultUserDataType } from "@/types/user";

type DataContextType = {
  user: DefaultUserDataType | null;
  setUser: React.Dispatch<React.SetStateAction<DefaultUserDataType | null>>;
};

const DataContext = createContext<DataContextType | null>(null);

export const useUserData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useUserData must be used inside DataProvider");
  return context;
};

export function DataProvider({
  defaultUserData,
  children,
}: {
  defaultUserData: DefaultUserDataType;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<DefaultUserDataType | null>(defaultUserData);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
}
