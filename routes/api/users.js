import express from "express";
import auth from "../../middleware/auth.js";
import { signUpUser } from "../../controllers/users/signUpUser.js";
import { logInUser } from "../../controllers/users/logInUser.js";
import { verifyUser } from "../../controllers/users/verifyUser.js";
import { logOutUser } from "../../controllers/users/logOutUser.js";

export const usersRouter = express.Router();

usersRouter.post("/signup", signUpUser);
usersRouter.post("/login", logInUser);
usersRouter.get("/current", auth, verifyUser);
usersRouter.get("/logout", auth, logOutUser);
