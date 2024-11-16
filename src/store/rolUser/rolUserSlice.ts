import { CatalogoRolUser } from "@/app/models/rolUsers/CatalogoRolUserModel";
import { RolUserModel } from "@/app/models/rolUsers/RolUserModel";
import { Status } from "@/types/Status.type";
import { createSlice } from "@reduxjs/toolkit";

type rolUserState = {
  roles: RolUserModel[];
  rol: RolUserModel;
  catalogRol: CatalogoRolUser[];
  status: Status;
  messageError: string;
};

const initialState: rolUserState = {
  roles: [],
  rol: {
    id: 0,
    name: "",
    level: 0,
    description: "",
  },
  catalogRol: [],
  status: "none",
  messageError: "",
};

export const rolUserSlice = createSlice({
  name: "rolUser",
  initialState,
  reducers: {
    getCatalog(state, action) {
      state.status = "success";
      state.catalogRol = action.payload;
    },
    setIsLoading(state) {
      state.status = "loading";
    },
  },
});

export const { getCatalog, setIsLoading } = rolUserSlice.actions;
