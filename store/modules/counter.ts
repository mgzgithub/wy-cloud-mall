import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 100,
  },
  reducers: {
    changeCountAction(state, action) {
      console.log("changeCountAction=>", action.type, action.payload);
      state.count += action.payload;
    },
  },
  // 没有触发？在服务器端getServerSideProps使用store时就会触发
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     console.log(state.count); // 当前模块的state
  //     console.log("HYDRATE", action.payload); // payload 拿到整个rootState
  //     return {
  //       ...state,
  //       ...action.payload.counter, // 更新模块数据
  //     };
  //   },
  // },

  // 每次当用户打开getStaticProps或getServerSideProps打开页面时，HYDRATE将调度操作。
  // 这可能发生在初始页面加载期间和常规页面导航期间。此payload操作的 将包含state静态生成或服务器端渲染时的 ，
  // 因此您的 reducer 必须将其与现有客户端状态正确合并。
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      console.log(state.count); // 当前模块的state
      console.log(action.type); //  action types: __NEXT_REDUX_WRAPPER_HYDRATE__
      console.log("HYDRATE", action.payload); // payload 拿到整个rootState
      return {
        ...state,
        ...action.payload.counter, // 更新模块数据
      };
    });
  },
});

// 异步的action
export const fetchHomeDataAction = createAsyncThunk(
  "fetchHomeData",
  async (params: number | string, { dispatch }) => {
    console.log(params);
    console.log(dispatch);
    // 模拟延时
    const timeoutPromise = (timeout: number) =>
      new Promise((resolve) => setTimeout(resolve, timeout));
    await timeoutPromise(1000);
    dispatch(counterSlice.actions.changeCountAction(1));
  }
);

// 同步的action
export const { changeCountAction } = counterSlice.actions;
export default counterSlice.reducer;
