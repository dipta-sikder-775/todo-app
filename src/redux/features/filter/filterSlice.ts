import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import { IGetTodosArgs } from "@ts/todo";

export type TTaskFilterType = "ALL" | "COMPLETED" | "INCOMPLETE";

const initialState: IGetTodosArgs = {
  _order: "desc",
  _sort: "id",
  color: [],
  completed: undefined,
  text_like: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setTaskFilterStatus: (state, action: PayloadAction<TTaskFilterType>) => {
      if (action.payload === "COMPLETED") {
        state.completed = true;
      } else if (action.payload === "INCOMPLETE") {
        state.completed = false;
      } else {
        state.completed = undefined;
      }
    },

    setColorFilterStatus: (state, action: PayloadAction<string>) => {
      if (state.color) {
        const colorExists = state.color.includes(action.payload);

        if (colorExists) {
          state.color = state.color.filter((color) => color !== action.payload);
        } else {
          state.color = [...state.color, action.payload];
        }
      }
    },

    setSearchTodo: (state, action: PayloadAction<string>) => {
      if (!action?.payload) {
        state.text_like = [];
      } else {
        state.text_like = action?.payload?.toLowerCase()?.split(" ");
      }
    },
  },
});

const filterReducer = filterSlice.reducer;
type TSelectFilter = (state: RootState) => typeof state.filter;
export const selectFilterReducer: TSelectFilter = (state) => state.filter;
export const { setTaskFilterStatus, setColorFilterStatus, setSearchTodo } =
  filterSlice.actions;
export default filterReducer;
