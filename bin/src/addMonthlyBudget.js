import fs from "fs";
import genarateIncreamentId from "../utils/genarateIncreamentId.js";
import dbFilePath from "../utils/dbFilePath.js";
export default function addMonthlyBudget(month, budget) {
  const monthlyBudgetPath = dbFilePath(import.meta.url, "expenseBudget");
  const monthlyBudgets = fs.readFileSync(monthlyBudgetPath, "utf-8");
  if (monthlyBudgets.length === 0) {
    fs.writeFileSync(monthlyBudgetPath, JSON.stringify([]));
  }
  const parsedData = JSON.parse(monthlyBudgets);
  parsedData.push({
    month,
    budgetAmount: budget,
  });

  // generate uniq id
  genarateIncreamentId(parsedData);

  fs.writeFileSync(monthlyBudgetPath, JSON.stringify(parsedData));
  console.log(`# Budget created successfully`);
}
