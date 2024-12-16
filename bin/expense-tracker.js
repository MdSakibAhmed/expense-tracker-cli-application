#!/usr/bin/env node
import { Command } from "commander";
import addExpense from "./src/addExpense.js";
import deleteExpense from "./src/deleteExpense.js";
import expenseList from "./src/expenseList.js";
import expneseSummary from "./src/expneseSummary.js";
import getExpenseData from "./src/getExpenseData.js";
import addCategory from "./src/addCategory.js";
import isCategoryExist from "./utils/categoryValidation.js";
import addMonthlyBudget from "./src/addMonthlyBudget.js";
import exportCSV from "./utils/exportCSV.js";

const program = new Command();
program
  .name("expense-tracker")
  .description("Expense tracker app. Track your monthly  expense ")
  .version("1.0.0");

// add a expense command
program
  .command("add")
  .description("Add an expense")
  .option("-d, --description <description>", "Expense description", "Groceries")
  .option("-a, --amount <amount>", "Expense amount", 0, (value) =>
    parseInt(value)
  )
  .option("-c, --category <category>", "Expense category")
  .action((options) => {
    // handle nagative value
    if (Number(options.amount) <= 0) {
      console.log("! Invalid amount value. Try with correct amount ( > 0)");
      return;
    }
    // handle invalid category name
    if (!isCategoryExist(options.category)) {
      console.log(
        "! Invalid category name. Try with correct category name or add new category first. ( expense-tracker add-category <category-name> )"
      );
      return;
    }
    addExpense(options);
  });

// view expenes list

program
  .command("list")
  .description("View expense list")
  .option("-c, --category [category]", "Category")
  .action((option) => {
    if (option.category && !isCategoryExist(option.category)) {
      console.log(
        "! Invalid category name. Try with correct category name or add new category first. ( expense-tracker add-category <category-name> )"
      );
      return;
    }
    expenseList(option.category);
  });

// expnese summary

program
  .command("summary")
  .description("View expnese summary")
  .option("-m, --month [month]", "Month")
  .option("-c, --category [category]", "Category")
  .action((option) => {
    // handle invalid month value
    if (
      !isNaN(option.month) &&
      (Number(option.month) <= 0 || Number(option.month) > 12)
    ) {
      console.log("! Invalid month value. Try with correct month ( 1-12)");
      return;
    }
    // hanlde invalid category name
    if (option.category && !isCategoryExist(option.category)) {
      console.log(
        "! Invalid category name. Try with correct category name or add new category first. ( expense-tracker add-category <category-name> )"
      );
      return;
    }
    expneseSummary(option.month, option.category);
  });

// delete expense
program
  .command("delete")
  .description("Delete an expense")
  .option("-i, --id <id>", "Expense id", 0, (value) => parseInt(value))
  .action((options) => {
    if (Number(options.id) <= 0) {
      console.log("! Invalid id value. Try with correct id ( > 0)");
      return;
    }
    const data = getExpenseData();
    const isExist = data.find((record) => record.id == options.id);
    if (!isExist) {
      console.log("!  This id does not exist. Try with correct Id value. )");
      return;
    }
    deleteExpense(options.id);
  });

// add category
program
  .command("add-category")
  .description("Add a category")
  .argument("<category>", "Category name")
  .action((argument) => {
    addCategory(argument);
  });

// add monthly budget
program
  .command("add-budget")
  .description("Add a budget for a month")
  .option("-m --month <month>", parseInt)
  .option("-b --budget <budget>", parseInt)
  .action((option) => {
    addMonthlyBudget(option.month, option.budget);
  });

// export csv file
program
  .command("export-csv")
  .description("Export expense data to csv file")
  .action(() => {
    const data = getExpenseData();
    exportCSV(data);
  });

program.parse();
