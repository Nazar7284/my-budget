import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IModal } from "../../models/models";

const initialState: IModal = {
  showModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    close(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
  },
});

export default modalSlice.reducer;
