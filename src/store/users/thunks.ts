import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CreateRolUserModel } from "@/app/models/rolUsers/CreateRolUserModel";
import { createUser, getAllUsers, setIsLoading } from "./usersSlice";
import { API } from "@/helpers/blogApi.helper";
import { CreateUserModel } from "@/app/models/users/CreateUserModel";

export const createUserThunk = (
  data: CreateUserModel
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    console.log(data);
    try {
      const response = await API.post("user/create", JSON.stringify(data));
      console.log(response);
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
