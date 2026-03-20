import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.filter((r) => r._id !== action.payload);
    },
  },
});

export const { addRequest, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
