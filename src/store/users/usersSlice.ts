import { UserModel } from "@/app/models/users/UserModel";
import { Status } from "@/types/Status.type";
import { createSlice } from "@reduxjs/toolkit";

type userState = {
  users: UserModel[];
  user: UserModel | null;
  status: Status;
  messageError: string;
};

const initialState: userState = {
  users: [],
  user: null,
  status: "none",
  messageError: "",
};

export const usersSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    createUser(state, action) {
      state.status = "success";
      state.users = [...state.users, action.payload];
    },
    getAllUsers(state, action) {
      state.messageError = "";
      state.status = "success";
      state.users = action.payload;
    },

    setIsLoading(state) {
      state.status = "loading";
    },
  },
});

export const { createUser, getAllUsers, setIsLoading } = usersSlice.actions;
