import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

const initialState: IUser = {
  email: "",
  userID: "",
  budget: 0,
  Totalexpenses: 0,
  Totalincomes: 0,
  Incomes: [],
  Expenses: [],
  Salary: 0,
  Investment: 0,
  Freelance: 0,
  Other: 0,
  Transport: 0,
  Foodstuff: 0,
  Rest: 0,
  Gift: 0,
  Clothes: 0,
  OtherExpense: 0,
};

export const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    writeInfo(
      state,
      action: PayloadAction<{
        email: string;
        userID: string;
        budget: Number;
        Totalexpenses: Number;
        Totalincomes: Number;
        Incomes: Array<Number>;
        Expenses: Array<Number>;
      }>
    ) {
      state.email = action.payload.email;
      state.userID = action.payload.userID;
      state.budget = action.payload.budget;
      state.Totalexpenses = action.payload.Totalexpenses;
      state.Totalincomes = action.payload.Totalincomes;
      state.Incomes = action.payload.Incomes;
      state.Expenses = action.payload.Expenses;
    },
    editBudget(state, action: PayloadAction<Number>) {
      state.budget = action.payload;
    },
    updateIncomeAndBudget(
      state,
      action: PayloadAction<{
        Totalincomes: Number;
        budget: Number;
        salary: Number;
        investment: Number;
        freelance: Number;
        other: Number;
      }>
    ) {
      state.Totalincomes = action.payload.Totalincomes;
      state.budget = action.payload.budget;
      state.Salary = action.payload.salary;
      state.Investment = action.payload.investment;
      state.Freelance = action.payload.freelance;
      state.Other = action.payload.other;
    },
    updateExpenseAndBudget(
      state,
      action: PayloadAction<{
        Totalexpenses: Number;
        budget: Number;
        Transport: Number;
        Foodstuff: Number;
        Rest: Number;
        Gift: Number;
        Clothes: Number;
        OtherExpense: Number;
      }>
    ) {
      state.Totalexpenses = action.payload.Totalexpenses;
      state.budget = action.payload.budget;
      state.Transport = action.payload.Transport;
      state.Foodstuff = action.payload.Foodstuff;
      state.Rest = action.payload.Rest;
      state.Gift = action.payload.Gift;
      state.Clothes = action.payload.Clothes;
      state.OtherExpense = action.payload.OtherExpense;
    },
  },
});

export default userInfoSlice.reducer;
