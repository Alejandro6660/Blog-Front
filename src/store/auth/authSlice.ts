import { CatalogoRolUser } from "@/app/models/rolUsers/CatalogoRolUserModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ESTATUS {
  NOT_AUTHENTICATED = "not-authenticated",
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
}

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  userName: string;
  email: string;
  rolUser: CatalogoRolUser;
}

export interface IAuthSlice {
  status: ESTATUS;
  user: IUser;
  token: string;
  errorMessage: string | undefined;
}

const initialState: IAuthSlice = {
  status: ESTATUS.NOT_AUTHENTICATED,
  user: {
    id: 0,
    name: "",
    lastname: "",
    userName: "",
    email: "",
    rolUser: {
      id: 0,
      name: "",
    },
  },
  token: "",
  errorMessage: "",
};

interface ILoginPayload {
  accessToken: string;
  user: IUser;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<ILoginPayload>) => {
      state.status = ESTATUS.AUTHENTICATED;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.errorMessage = "";
    },

    onLoginError: (state, action: PayloadAction<string>) => {
      state.status = ESTATUS.NOT_AUTHENTICATED;
      state.errorMessage = action.payload;
      state.user = {
        id: 0,
        name: "",
        lastname: "",
        userName: "",
        email: "",
        rolUser: {
          id: 0,
          name: "",
        },
      };
    },

    onRegister: (state, action) => {},

    onLogout: (state) => {
      state.status = ESTATUS.NOT_AUTHENTICATED;
      state.user = {
        id: 0,
        name: "",
        lastname: "",
        userName: "",
        email: "",
        rolUser: {
          id: 0,
          name: "",
        },
      };
      state.token = "";
      state.errorMessage = "";
    },

    onCheckingCredentials: (state) => {
      state.status = ESTATUS.CHECKING;
      state.user = {
        id: 0,
        name: "",
        lastname: "",
        userName: "",
        email: "",
        rolUser: {
          id: 0,
          name: "",
        },
      };
      state.errorMessage = undefined;
    },
  },
});

export const { onCheckingCredentials, onLoginError, onLogin, onLogout } =
  authSlice.actions;
