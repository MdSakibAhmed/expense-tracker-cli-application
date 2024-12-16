import getCategories from "./getCategories.js";
import fs from "fs";
import genarateIncreamentId from "../utils/genarateIncreamentId.js";
import dbFilePath from "../utils/dbFilePath.js";

export default function addCategory(category) {
  const categoryDataFilePath = dbFilePath(import.meta.url, "categories");
  const categoryData = getCategories();
  categoryData.push({ category });

  // generate unique id
  genarateIncreamentId(categoryData);

  fs.writeFileSync(categoryDataFilePath, JSON.stringify(categoryData));
  console.log("# Expense added successfully (ID: " + categoryData.length + ")");
}
