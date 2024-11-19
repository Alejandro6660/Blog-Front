import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createUser, getAllUsers, getById, setIsLoading } from "./usersSlice";
import { API } from "@/helpers/blogApi.helper";
import { CreateUserModel } from "@/app/models/users/CreateUserModel";

export const createUserThunk = (
  data: CreateUserModel
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setIsLoading());

    try {
      const response = await API.post("user/create", JSON.stringify(data));
      const info = await response.data;
      dispatch(createUser(info));
    } catch (error: any) {}
  };
};

export const getAllUsersThunk = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    const response = await API.get("user");
    const data = await response.data;
    dispatch(getAllUsers(data));
  };
};

export const getByIdThunk = (
  id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    try {
      const response = await API.get(`user/getById/${id}`);
      const data = await response.data;
      dispatch(getById(data));
    } catch (error: any) {}
  };
};

export const deleteUserThunk = (
  id: number | undefined
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    if (!id) return;
    const response = await API.delete(`user/delete/${id}`);
  };
};
