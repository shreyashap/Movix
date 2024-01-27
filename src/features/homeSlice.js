import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  generes: {},
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGeneres: (state, action) => {
      state.generes = action.payload;
    },
  },
});

const homeReducer = homeSlice.reducer;
export const { getApiConfiguration, getGeneres } = homeSlice.actions;
export { homeReducer };
