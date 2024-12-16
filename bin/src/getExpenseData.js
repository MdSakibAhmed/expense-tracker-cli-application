import fs from "fs";
import dbFilePath from "../utils/dbFilePath";
export default function getExpenseData() {
  const expenseDataFilePath = dbFilePath(import.meta.url, "expenseData");
  const expnesData = fs.readFileSync(expenseDataFilePath, "utf-8");
  if (expnesData.length === 0) {
    fs.writeFileSync(expenseDataFilePath, JSON.stringify([]));
  }
  return JSON.parse(expnesData);
}
