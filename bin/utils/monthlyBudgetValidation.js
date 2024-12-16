import fs from "fs";
import dbFilePath from "./dbFilePath";
export default function budgetValidation(month, budget) {
  const monthlyBudgetPath = dbFilePath(import.meta.url, "expenseBudget");
  const monthlyBudgets = fs.readFileSync(monthlyBudgetPath, "utf-8");
  const budgetData = JSON.parse(monthlyBudgets);
  const budgetOfMonth = budgetData.find((record) => record.month == month);
  if (!budgetOfMonth) {
    return true;
  }
  if (budget > budgetOfMonth?.budgetAmount) {
    return false;
  }

  return true;
}
