import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILogin } from "../../models/models";

const initialState: ILogin = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    signout(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export default loginSlice.reducer;
