import { sendVerificationEmail } from "../../services/sendVerificationEmail.js";
import User from "../../models/schemas/userSchema.js";

export async function verifyUser(req, res) {
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
}
