import fs from "fs";
import genarateIncreamentId from "../utils/genarateIncreamentId.js";
import getExpenseData from "./getExpenseData.js";
import addMonthlyBudget from "./addMonthlyBudget.js";
import budgetValidation from "../utils/monthlyBudgetValidation.js";
import dbFilePath from "../utils/dbFilePath.js";
const addExpense = ({ amount, description, category }) => {
  const expenseData = getExpenseData();
  const expenseDataFilePath = dbFilePath(import.meta.url, "expenseData");
  expenseData.push({
    description,
    amount,
    category,
    date: `${new Date().toLocaleDateString()}`,
  });

  // generate unique id
  genarateIncreamentId(expenseData);

  // check budget validation
  const totalAmountOfThisMonth = expenseData
    .filter((record) => {
      return new Date(record.date).getMonth() === new Date().getMonth();
    })
    .reduce((total, record) => {
      return total + Number(record.amount);
    }, 0);

  const isPassed = budgetValidation(
    new Date().getMonth() + 1,
    totalAmountOfThisMonth
  );
  if (!isPassed) {
    console.log("! Monthly budget exceeded. Try with correct amount");
    return;
  }

  fs.writeFileSync(expenseDataFilePath, JSON.stringify(expenseData));

  console.log("# Expense added successfully (ID: " + expenseData.length + ")");
};

export default addExpense;
