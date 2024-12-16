import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default function exportCSV(data) {
  const headers = Object.keys(data[0]);
  // remove id element
  headers.pop();
  const rows = data.map((record) =>
    headers.map((key) => record[key]).join(",")
  );
  const totalExpense = data.reduce((total, record) => {
    return total + Number(record.amount);
  }, 0);
  rows.push(`Total expense, ${totalExpense}`);
  const csv = [headers.join(","), ...rows].join("\n");
  const downloadPath = path.join(__dirname, "..", "assets/expenseData.csv");
  fs.writeFileSync(downloadPath, csv);
  console.log("# Data exported successfully. Saved at: " + downloadPath);
}
