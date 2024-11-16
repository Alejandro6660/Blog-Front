import {
  IUser,
  onCheckingCredentials,
  onLogin,
  onLoginError,
  onLogout,
} from "./authSlice";
import { AppDispatch, RootState } from "../store";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { API } from "@/helpers/blogApi.helper";

export const checkignAuthentication = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(onCheckingCredentials());

    const obj = {
      email,
      password,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await API.post(
        "user/login",
        JSON.stringify(obj),
        config
      );
      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(onLogin({ accessToken: data.accessToken, user: data.user }));
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Error desconocido";
        dispatch(onLoginError(errorMessage));
      } else {
        dispatch(onLoginError("Error de red o servidor"));
      }
    }
  };
};

export const checkingToken = (
  token: string,
  user: IUser
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const response = await API.get("user/test2");
      const data = response.data;
      dispatch(onLogin({ accessToken: token, user: user }));
    } catch (error: any) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };
};

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    localStorage.clear();
    dispatch(onLogout());
  };
};
