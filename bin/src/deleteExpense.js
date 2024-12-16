import fs from "fs";
import getExpenseData from "./getExpenseData.js";
import genarateIncreamentId from "../utils/genarateIncreamentId.js";
import dbFilePath from "../utils/dbFilePath.js";
export default function deleteExpense(id) {
  const expenseDataFilePath = dbFilePath(import.meta.url, "expenseData");
  const expenseData = getExpenseData();
  expenseData.splice(id - 1, 1);
  // generate unique id
  genarateIncreamentId(expenseData);

  fs.writeFileSync(expenseDataFilePath, JSON.stringify(expenseData));

  console.log("# Expense deleted successfully (ID: " + id + ")");
}
