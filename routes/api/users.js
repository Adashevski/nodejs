import express from "express";
import auth from "../../middleware/auth.js";
import { upload } from "../../middleware/multer.js";
import { signUpUser } from "../../controllers/users/signUpUser.js";
import { logInUser } from "../../controllers/users/logInUser.js";
import { verifyUser } from "../../controllers/users/verifyUser.js";
import { logOutUser } from "../../controllers/users/logOutUser.js";
import { updateAvatar } from "../../controllers/users/updateAvatar.js";
import { ensureFoldersExist } from "../../middleware/ensureFoldersExist.js";

export const usersRouter = express.Router();

ensureFoldersExist();

usersRouter.post("/signup", signUpUser);
usersRouter.post("/login", logInUser);
usersRouter.get("/current", auth, verifyUser);
usersRouter.get("/logout", auth, logOutUser);
usersRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
