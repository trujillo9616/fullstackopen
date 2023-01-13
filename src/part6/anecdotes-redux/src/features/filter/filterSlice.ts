import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Filter {
  value: string;
}

export interface FilterState {
  value: Filter;
}

const initialState: FilterState = {
  value: {
    value: "",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.value.value = action.payload;
    },
    resetFilter: (state) => {
      state.value.value = "";
    }
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter.value;

export default filterSlice.reducer;
