import { create } from "zustand";

type AuthState = {
  user: any,
  token: any
}

type AuthActions = {
  setCredentials: (credentials: {}) => void;
  logOut: () => void;
}

const initialAuthState: AuthState = {
  user: {},
  token: {}
}

const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  ...initialAuthState,
  setCredentials: (credentials: any) => {
    set({ user: credentials.user });
    set({ token: credentials.token });
  },
  logOut: () => {
    set({ user: null });
    set({ token: null });
  }
}))


