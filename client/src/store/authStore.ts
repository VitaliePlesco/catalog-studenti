import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosPrivate } from "@/axios";

export type User = {
  userId: string;
  name: string;
  email: string;
}
type AuthState = {
  user: any,
  accessToken: boolean
}

type AuthActions = {
  login: (credentials: { userId: string, name: string, email: string }, accessToken: boolean) => void;
  logout: () => void;
}

const initialAuthState: AuthState = {
  user: null,
  accessToken: false
}

export const useAuthStore = create<AuthState & AuthActions>()(persist((set) => ({
  ...initialAuthState,
  login: (credentials: User, accessToken: boolean) => {

    set({ user: credentials, accessToken: accessToken });

  },
  logout: async () => {
    const response = await axiosPrivate.post("/users/logout");
    localStorage.clear();
    set({ user: null });
    set({ accessToken: false });
  }
}), {
  name: "authStore"
}))


