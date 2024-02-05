import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/schemas/userSchema.js";
import { signUpUser } from "../../controllers/users/signUpUser.js";
import { logInUser } from "../../controllers/users/logInUser.js";
import { verifyUser } from "../../controllers/users/verifyUser.js";
import { logOutUser } from "../../controllers/users/logOutUser.js";

import fs from "fs/promises";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import jimp from "jimp";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const AVATARS_FOLDER = path.join(__dirname, "../../public/avatars");
const TMP_FOLDER = path.join(__dirname, "../../tmp");

export const usersRouter = express.Router();

const ensureFoldersExist = async () => {
  try {
    await fs.mkdir(AVATARS_FOLDER, { recursive: true });
    await fs.mkdir(TMP_FOLDER, { recursive: true });
  } catch (error) {
    console.error("Error creating folders:", error);
  }
};

ensureFoldersExist();

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp");
  },
  filename: (req, file, cb) => {
    const avatarFileName = `${req.user._id.toString()}${path.extname(
      file.originalname
    )}`;
    cb(null, avatarFileName);
  },
});

const upload = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

usersRouter.post("/signup", signUpUser);
usersRouter.post("/login", logInUser);
usersRouter.get("/current", auth, verifyUser);
usersRouter.get("/logout", auth, logOutUser);

usersRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No avatar uploaded" });
      }

      const avatarPath = path.join("tmp", req.file.filename);
      const avatar = await jimp.read(avatarPath);
      await avatar.cover(250, 250).writeAsync(avatarPath);

      const newAvatarFileName = `${req.user._id.toString()}.jpg`;
      const newAvatarPath = path.join(AVATARS_FOLDER, newAvatarFileName);
      await fs.rename(avatarPath, newAvatarPath);

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.avatarURL = `/avatars/${newAvatarFileName}`;
      await user.save();

      res.status(200).json({ avatarURL: user.avatarURL });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
