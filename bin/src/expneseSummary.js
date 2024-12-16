import monthNames from "../utils/monthNames.js";
import getExpenseData from "./getExpenseData.js";

export default function expneseSummary(month, category) {
  let expenseData = getExpenseData();

  if (category) {
    expenseData = expenseData.filter((record) => {
      return record.category === category;
    });
  }
  if (month) {
    expenseData = expenseData.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === month - 1;
    });
  }
  let totalExpense = 0;
  expenseData.forEach((record) => {
    totalExpense += Number(record.amount);
  });

  month
    ? console.log(`# Expenses for ${monthNames[month - 1]}: ${totalExpense}`)
    : console.log(`# Total expense: ${totalExpense}`);
}
