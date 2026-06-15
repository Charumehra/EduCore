import { createSlice } from "@reduxjs/toolkit";

const initialState = { lectures: [], currentLecture: null };
const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setLectures: (state, action) => {
      state.lectures = action.payload;
    },
    setCurrentLecture: (state, action) => {
      state.currentLecture = action.payload;
    },
  },
});
export const { setLectures, setCurrentLecture } = lectureSlice.actions;
export default lectureSlice.reducer;
