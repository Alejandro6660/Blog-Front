import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API } from "@/helpers/blogApi.helper";
import { getAll } from "./postSlice";

export const getAllPostsThunk = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const response = await API.get("post/getAll");
    const data = response.data;
    dispatch(getAll(data));
  };
};
