const IncomeSchema = require("../models/IncomeModel");
const ExpenseSchema = require("../models/ExpenseModel");
const UserSchema = require("../models/userModel");

exports.addIncome = async (req, res) => {
  const { owner, title, amount, category, date } = req.body;

  const income = new IncomeSchema({
    owner,
    title,
    amount,
    category,
    date,
  });

  await income.save();

  try {
    const updatedInfo = await UserSchema.findOneAndUpdate(
      { _id: owner },
      { $inc: { Totalincomes: amount, budget: amount } },
      { new: true }
    );

    const categoriesINC = {
      salary: 0,
      investment: 0,
      freelance: 0,
      other: 0,
    };

    // Знайти всі колекції, що мають owner = 123
    const incomes = await IncomeSchema.find({ owner: owner });

    // Підрахунок суми для кожної категорії
    incomes.forEach((income) => {
      const { category, amount } = income;
      if (categoriesINC[category]) {
        categoriesINC[category] += amount;
      } else {
        categoriesINC[category] = amount;
      }
    });

    return res.status(201).json({
      message: "Income added",
      Totalincomes: updatedInfo.Totalincomes,
      budget: updatedInfo.budget,
      AmountOfCategory: categoriesINC,
    });
  } catch (error) {
    return res.status(300).json({ message: `Error adding expense + ${error}` });
  }
};

exports.addExpense = async (req, res) => {
  const { owner, title, amount, category, date } = req.body;

  const expense = new ExpenseSchema({
    owner,
    title,
    amount,
    category,
    date,
  });

  await expense.save();

  try {
    const updatedInfo = await UserSchema.findOneAndUpdate(
      { _id: owner },
      { $inc: { Totalexpenses: amount, budget: -amount } },
      { new: true }
    );

    const categoriesEXP = {
      transport: 0,
      foodftuff: 0,
      rest: 0,
      gift: 0,
      clothes: 0,
      otherexpense: 0,
    };

    const expenses = await ExpenseSchema.find({ owner: owner });

    // Підрахунок суми для кожної категорії
    expenses.forEach((expense) => {
      const { category, amount } = expense;
      if (categoriesEXP[category]) {
        categoriesEXP[category] += amount;
      } else {
        categoriesEXP[category] = amount;
      }
    });

    return res.status(201).json({
      message: "Expense added",
      Totalincomes: updatedInfo.Totalincomes,
      budget: updatedInfo.budget,
      AmountOfCategory: categoriesEXP,
    });
  } catch (error) {
    return res.status(300).json({ message: `Error adding expense + ${error}` });
  }
};
