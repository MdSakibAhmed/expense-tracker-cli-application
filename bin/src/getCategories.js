import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function getCategories() {
  const categoriesDataFilePath = dbFilePath(import.meta.url, "categories");
  const categories = fs.readFileSync(categoriesDataFilePath, "utf-8");
  if (categories.length === 0) {
    fs.writeFileSync(categoriesDataFilePath, JSON.stringify([]));
  }
  return JSON.parse(categories);
}
