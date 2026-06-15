import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  myCourses: [],
  selectedCourse: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },

    setMyCourses: (state, action) => {
      state.myCourses = action.payload;
    },

    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  setCourses,
  setMyCourses,
  setSelectedCourse,
} = courseSlice.actions;

export default courseSlice.reducer;