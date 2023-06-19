import React from "react";
import MainPage from "../pages/MainPage/MainPage";
import IncomesPage from "../pages/IncomesPage/IncomesPage";
import ExpensesPage from "../pages/ExpensesPage/ExpensesPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export interface ILogin {
  isLogin: boolean;
}

export interface IModal {
  showModal: boolean;
}

export interface IUser {
  email: string;
  userID: string;
  budget: Number;
  Totalexpenses: Number;
  Totalincomes: Number;
  Incomes: any;
  Expenses: Array<Number>;
  Salary: Number;
  Investment: Number;
  Freelance: Number;
  Other: Number;
  Transport: Number;
  Foodstuff: Number;
  Rest: Number;
  Gift: Number;
  Clothes: Number;
  OtherExpense: Number;
}

export interface FormState {
  owner: string;
  title: string;
  amount: string;
  category: string;
  date: string;
}

interface IRoute {
  path: string;
  element: React.ComponentType<any> | React.FC<any>;
}

export enum RoutesNames {
  LOGIN = "/login",
  REGISTER = "/registration",
  MAIN = "/main",
  INCOMES = "/incomes",
  EXPENSES = "/expenses",
  REDIRECTION = "*",
}

export const privateroutesArray: IRoute[] = [
  { path: RoutesNames.MAIN, element: MainPage },
  { path: RoutesNames.INCOMES, element: IncomesPage },
  { path: RoutesNames.EXPENSES, element: ExpensesPage },
];
export const publicroutesArray: IRoute[] = [
  { path: RoutesNames.LOGIN, element: LoginPage },
  { path: RoutesNames.REGISTER, element: RegisterPage },
];
