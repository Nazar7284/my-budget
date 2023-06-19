const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "userModel" },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("ExpenseModel", ExpenseSchema);
