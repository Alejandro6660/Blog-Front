import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API } from "@/helpers/blogApi.helper";
import { getCatalog, setIsLoading } from "./rolUserSlice";

export const getCatalogRolUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(setIsLoading());
    const response = await API.get("rolUser/catalogRolUser");
    const data = await response.data;
    dispatch(getCatalog(data));
  };
};
