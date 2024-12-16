import path from "path";
import { fileURLToPath } from "url";

export default function dbFilePath(currentFilePath, dbFileName) {
  const __filename = fileURLToPath(currentFilePath);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, "..", "bin/db/" + dbFileName + ".json");
}
