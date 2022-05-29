const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expense: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  userId: { type: ObjectId, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = { Expense };
