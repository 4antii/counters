import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InitStateType, IndexPayload } from "./index";

const initState: InitStateType = { counters: [] };

const counterSlice = createSlice({
  name: "counter",
  initialState: initState,
  reducers: {
    increment(state, action: PayloadAction<IndexPayload>) {
      state.counters[action.payload.index]++;
    },
    decrement(state, action: PayloadAction<IndexPayload>) {
      state.counters[action.payload.index]--;
    },
    add(state) {
      state.counters.push(state.counters.reduce((a, b) => a + b, 0));
    },
    remove(state, action: PayloadAction<IndexPayload>) {
      state.counters = state.counters.filter(
        (_, index) => index != action.payload.index
      );
    },
  },
});

export const { increment, decrement, add, remove } = counterSlice.actions;
export default counterSlice.reducer;
