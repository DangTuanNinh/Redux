import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUser: [],
};

export const fetchListUser = createAsyncThunk(
  "users/fetchListUser",
  async (userId, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      // reduce the collection by the id property into a shape of { 1: { ...user }}

      console.log(">>Check action:", action);
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
