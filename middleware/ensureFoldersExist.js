import fs from "fs/promises";
import { AVATARS_FOLDER, TMP_FOLDER } from "../utilities/foldersPath.js";

export const ensureFoldersExist = async () => {
  try {
    await fs.mkdir(AVATARS_FOLDER, { recursive: true });
    await fs.mkdir(TMP_FOLDER, { recursive: true });
  } catch (error) {
    console.error("Error creating folders:", error);
  }
};
