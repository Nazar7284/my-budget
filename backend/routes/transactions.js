// const {
//   addIncome,
//   getIncomes,
//   deleteIncome,
// } = require("../controllers/income");

// const {
//   addExpense,
//   getExpenses,
//   deleteExpense,
// } = require("../controllers/expenses");

const { addIncome, addExpense } = require("../controllers/finance");
const { addUser, loginUser, updateBudget } = require("../controllers/user");

const router = require("express").Router();

router
  // .post("/add-income", addIncome)
  // .get("/get-incomes", getIncomes)
  // .delete("/delete-income/:id", deleteIncome)
  // .post("/add-expense", addExpense)
  // .get("/get-expense", getExpenses)
  // .delete("/delete-expense/:id", deleteExpense)
  .post("/registration", addUser)
  .post("/login", loginUser)
  .post("/incomes", addIncome)
  .post("/expenses", addExpense)
  .post("/changebudget", updateBudget);

module.exports = router;
