import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState = {
  value: 10,
  name: "Ninh",
  address: {
    city: "Hanoi",
    code: 100000,
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrease: (state) =>{
      console.log("Check decrease: 1111");
      state.value -= 1;
    }
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrease } = counterSlice.actions;

export default counterSlice.reducer;
