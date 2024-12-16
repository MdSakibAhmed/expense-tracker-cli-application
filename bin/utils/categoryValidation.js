import getCategories from "../src/getCategories.js";

export default function isCategoryExist(category) {
  const categories = getCategories();
  return categories.find((record) => record.category === category);
}
