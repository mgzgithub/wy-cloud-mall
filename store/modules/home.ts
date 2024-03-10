import { ISearchSuggest } from "./../../service/home";
import { getSearchSuggestData } from "@/service/home";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
interface IInitialState {
  navbar: ISearchSuggest;
}
const counterSlice = createSlice({
  name: "home",
  initialState: {
    navbar: {},
  } as IInitialState,
  reducers: {
    changeNavbarAction(state, action) {
      state.navbar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.home, // hydration home模块数据
      };
    });
  },
});

// 异步的action
export const fetchHomeInfoDataAction = createAsyncThunk(
  "fetchHomeInfoData",
  async (params: any, { dispatch }) => {
    const searchSuggestData = await getSearchSuggestData();
    dispatch(counterSlice.actions.changeNavbarAction(searchSuggestData.data));
  }
);

// 同步的action
export const { changeNavbarAction } = counterSlice.actions;
export default counterSlice.reducer;
