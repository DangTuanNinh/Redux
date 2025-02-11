import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  listUser: IUser[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
} = {
  listUser: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

interface IUser {
  id: number;
  name: string;
  email: string;
}

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

export const updateAUser = createAsyncThunk(
  "users/updateAUser",
  async (payload: any, thunkAPI) => {
    console.log(">.Check userID: ", payload);
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
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

export const deleteAUser = createAsyncThunk(
  "users/deleteAUser",
  async (payload: any, thunkAPI) => {
    console.log(">.Check userID: ", payload);
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    thunkAPI.dispatch(fetchListUser());
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
    resetUpdate(state) {
      state.isUpdateSuccess = false;
    },
    resetDelete(state) {
      state.isDeleteSuccess = false;
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
    builder.addCase(updateAUser.fulfilled, (state, action) => {
      // reduce the collection by the id property into a shape of { 1: { ...user }}
      state.isUpdateSuccess = true;
    });
    builder.addCase(deleteAUser.fulfilled, (state, action) => {
      // reduce the collection by the id property into a shape of { 1: { ...user }}
      state.isDeleteSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions;

export default userSlice.reducer;
