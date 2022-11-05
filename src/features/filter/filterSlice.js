import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: [],
  status: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    colorChanged: (state, action) => {
      if (state.colors.includes(action.payload)) {
        state.colors = state.colors.filter(
          (existingColor) => existingColor !== action.payload
        );
      } else {
        state.colors.push(action.payload);
      }
    },
    statusChanged: (state, action) => {
      if (action.payload === "Complete") {
        state.status = true;
      } else if (action.payload === "Incomplete") {
        state.status = false;
      } else {
        state.status = "";
      }
    },
  },
});

export default filterSlice.reducer;
export const { colorChanged, statusChanged } = filterSlice.actions;
