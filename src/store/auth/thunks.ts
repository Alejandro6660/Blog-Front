import { Action, UnknownAction } from "@reduxjs/toolkit";
import { checkingCredentials } from "./authSlice";
import { AppDispatch } from "../store";

export const checkignAuthentication = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};
