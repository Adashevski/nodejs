import express from "express";
import auth from "../../middleware/auth.js";
import { upload } from "../../middleware/multer.js";
import { signUpUser } from "../../controllers/users/signUpUser.js";
import { logInUser } from "../../controllers/users/logInUser.js";
import { currentUser } from "../../controllers/users/currentUser.js";
import { logOutUser } from "../../controllers/users/logOutUser.js";
import { updateAvatar } from "../../controllers/users/updateAvatar.js";
import { ensureFoldersExist } from "../../middleware/ensureFoldersExist.js";

import { sendVerificationEmail } from "../../services/sendVerificationEmail.js";
import User from "../../models/schemas/userSchema.js";

ensureFoldersExist();

export const usersRouter = express.Router();

usersRouter.post("/signup", signUpUser);
usersRouter.post("/login", logInUser);
usersRouter.get("/current", auth, currentUser);
usersRouter.get("/logout", auth, logOutUser);
usersRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

usersRouter.post("/verify", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
        data: "Not Found",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Verification has already been passed",
        data: "Bad Request",
      });
    }

    await sendVerificationEmail({
      email,
      verificationToken: user.verificationToken,
    });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
      data: "Email Sending Failure",
    });
  }
});

usersRouter.get("/verify/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
        data: "Not Found",
      });
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
      data: "Verification process failed",
    });
  }
});
