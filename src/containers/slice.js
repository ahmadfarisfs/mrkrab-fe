import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "sidebar",
  initialState: {
    sidebarShow: 'responsive'
   },
  reducers: {
    showChange: (state, action) => {
      console.log("From reducer sidebar!");
      console.log(state);
      console.log(action);
      state.sidebarShow = action.payload.sidebarShow;
    }
  },
});

export const { showChange } = slice.actions;

export default slice.reducer;