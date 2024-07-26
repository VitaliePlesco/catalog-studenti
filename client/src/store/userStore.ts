import { create } from "zustand";

type UserState = {
  userInfo: any
}

type UserActions = {
  login: (credentials: any) => void;
}

const initialUserState: UserState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null
}

const useAuthStore = create<UserState & UserActions>()((set) => ({
  ...initialUserState,

  login: () => {
    return;
  }
}))

