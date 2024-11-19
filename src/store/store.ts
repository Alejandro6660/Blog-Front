import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { usersSlice } from "./users/usersSlice";
import { rolUserSlice } from "./rolUser/rolUserSlice";
import { postSlice } from "./posts/postSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    Users: usersSlice.reducer,
    rolUsers: rolUserSlice.reducer,
    posts: postSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
