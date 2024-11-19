import { PostModel } from "@/app/models/posts/PostModel";
import { Status } from "@/types/Status.type";
import { createSlice } from "@reduxjs/toolkit";

type userState = {
  posts: PostModel[];
  post: PostModel | null;
  status: Status;
  messageError: string;
};
const initialState: userState = {
  posts: [],
  post: null,
  status: "none",
  messageError: "",
};

export const postSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    getAll(state, action) {
      state.status = "success";
      state.posts = action.payload;
    },
  },
});

export const { getAll } = postSlice.actions;
