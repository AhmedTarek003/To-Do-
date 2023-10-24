import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slices/authSlice";
import { tasksReducer } from "./Slices/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});
