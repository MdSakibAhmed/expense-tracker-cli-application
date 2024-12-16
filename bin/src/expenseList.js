import getExpenseData from "./getExpenseData.js";

export default function expenseList(category) {
  let expenseData = getExpenseData();
  if (category) {
    expenseData = expenseData.filter((record) => {
      return record.category === category;
    });
  }

  console.log(`# ID   Description    Amount    Date        Category`);
  console.log(".....................................................");
  expenseData.forEach((record) => {
    console.log(
      `# ${record.id.toString().padEnd(3)}  ${record.description.padEnd(
        14
      )} ${record.amount.toString().padEnd(8)}  ${record.date.padEnd(8)}  ${
        record.category
      }`
    );
  });
  //   console.table(expenseData);
}
