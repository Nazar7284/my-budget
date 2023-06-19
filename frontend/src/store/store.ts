import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/LoginSlice";
import UserInfoReducer from "./reducers/UserInfoSlice";
import ModalReducer from "./reducers/ModalSlice";

const rootReducer = combineReducers({
  LoginReducer,
  UserInfoReducer,
  ModalReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
