import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const AVATARS_FOLDER = path.join(__dirname, "../public/avatars");
export const TMP_FOLDER = path.join(__dirname, "../tmp");
