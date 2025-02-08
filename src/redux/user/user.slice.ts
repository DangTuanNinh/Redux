import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  name: string;
  email: string;
}

const initialState: {
  listUser: IUser[];
  isCreateSuccess: boolean;
} = {
  listUser: [],
  isCreateSuccess: false,
};

export const fetchListUser = createAsyncThunk(
  "users/fetchListUser",
  async (userId, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
);

interface IUserPayload {
  email: string;
  name: string;
}

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IUserPayload, thunkAPI) => {
    console.log(">.Check userID: ", payload);
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
    console.log(">>Check data: ", data);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      // reduce the collection by the id property into a shape of { 1: { ...user }}
      state.listUser = action.payload;
      console.log(">>Check action:", action);
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      // reduce the collection by the id property into a shape of { 1: { ...user }}
      state.isCreateSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate } = userSlice.actions;

export default userSlice.reducer;
