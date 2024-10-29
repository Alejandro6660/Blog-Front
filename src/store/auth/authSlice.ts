import { createSlice } from "@reduxjs/toolkit";

export type Tstatus = "checking" | "not-authenticated" | "authenticated";

interface IUser {
  id: number;
  name: string;
  userName: string;
  email: string;
  rol: string;
}

export interface IAuthSlice {
  status: Tstatus;
  user: IUser;
  token: string;
}

const initialState: IAuthSlice = {
  status: "not-authenticated",
  user: {
    id: 0,
    name: "",
    userName: "",
    email: "",
    rol: "",
  },
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},

    register: (state, action) => {},

    logout: (state, action) => {},

    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const { checkingCredentials } = authSlice.actions;
