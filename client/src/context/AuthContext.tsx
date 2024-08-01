"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  userId: string;
  name: string;
  email: string;
};

type TAuthContext = {
  user: User | null;
  setUser: (userData: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
  jwt: string | null;
  setJwt: (token: string) => void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
    if (storedJwt && storedUser) {
      setIsLoggedIn(true);
      setJwt(storedJwt);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  function login(token: string, user: User) {
    setIsLoggedIn(true);
    setJwt(token);
    setUser(user);
    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function logout() {
    setIsLoggedIn(false);
    setJwt(null);
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  }

  const authValue = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    jwt,
    setJwt,
    isLoading,
    setIsLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
