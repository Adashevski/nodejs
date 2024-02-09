import express from "express";
import auth from "../../middleware/auth.js";
import { upload } from "../../middleware/multer.js";
import { signUpUser } from "../../controllers/users/signUpUser.js";
import { logInUser } from "../../controllers/users/logInUser.js";
import { currentUser } from "../../controllers/users/currentUser.js";
import { logOutUser } from "../../controllers/users/logOutUser.js";
import { updateAvatar } from "../../controllers/users/updateAvatar.js";
import { ensureFoldersExist } from "../../middleware/ensureFoldersExist.js";
import { verifyUser } from "../../controllers/users/verifyUser.js";
import { verifyUserToken } from "../../controllers/users/verifyUserToken.js";

ensureFoldersExist();

export const usersRouter = express.Router();

usersRouter.post("/signup", signUpUser);
usersRouter.post("/login", logInUser);
usersRouter.get("/current", auth, currentUser);
usersRouter.get("/logout", auth, logOutUser);
usersRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
usersRouter.post("/verify", verifyUser);
usersRouter.get("/verify/:verificationToken", verifyUserToken);
