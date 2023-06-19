const UserSchema = require("../models/userModel");
const IncomeSchema = require("../models/IncomeModel");
const ExpenseSchema = require("../models/ExpenseModel");

exports.addUser = async (req, res) => {
  const { email, password } = req.body;
  budget = 0;
  Totalexpenses = 0;
  Totalincomes = 0;
  const isUsed = await UserSchema.findOne({ email });

  if (isUsed) {
    return res.status(300).json({ message: "This email is using" });
  }

  const user = new UserSchema({
    email,
    password,
    budget,
    Totalexpenses,
    Totalincomes,
  });

  await user.save();
  res.status(201).json({ message: "User added" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "This email does not exist" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const incomeCollections = await IncomeSchema.find({ owner: user._id });
    const expenseCollections = await ExpenseSchema.find({ owner: user._id });
    console.log(incomeCollections);
    console.log(expenseCollections);
    res.status(200).json({
      message: "User correct",
      userID: user._id,
      budget: user.budget,
      Totalexpenses: user.Totalexpenses,
      Totalincomes: user.Totalincomes,
      Incomes: incomeCollections,
      Expenses: expenseCollections,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateBudget = async (req, res) => {
  const { userID, amount } = req.body;

  UserSchema.updateOne({ _id: userID }, { $set: { budget: amount } })
    .then(() => {
      return res
        .status(201)
        .json({ message: "Budget field updated successfully" });
    })
    .catch((error) => {
      return res.status(300).json({ message: "Error updating budget field:" });
    });
};
