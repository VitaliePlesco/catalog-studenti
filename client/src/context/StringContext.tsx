"use client";
import { createContext, useContext, useState } from "react";

type Scontext = {
  hello: string;
};

const StringContext = createContext<any>(undefined);

export const StringProvider = ({ children }: { children: React.ReactNode }) => {
  const [world, setWorld] = useState({
    hello: "world",
  });

  return (
    <StringContext.Provider value={{ world, setWorld }}>
      {children}
    </StringContext.Provider>
  );
};

export function useStringContext() {
  return useContext(StringContext);
}
