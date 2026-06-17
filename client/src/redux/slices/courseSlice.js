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

    addCourse: (state, action) => {
      state.courses.unshift(action.payload);
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload,
      );
    },
    updateCourse: (state, action) => {
  const updatedCourse = action.payload;

  state.courses = state.courses.map((course) =>
    course._id === updatedCourse._id ? updatedCourse : course
  );
},
  },
});

export const { setCourses, setMyCourses, setSelectedCourse, addCourse, removeCourse, updateCourse } =
  courseSlice.actions;

export default courseSlice.reducer;
