import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import counterReducer from "./modules/counter";
import homeReducer from "./modules/home";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
  },
  devTools: true,
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
