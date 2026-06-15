import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import lectureReducer from "./slices/lectureSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    lecture: lectureReducer,
  },
});