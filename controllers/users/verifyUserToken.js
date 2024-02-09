import User from "../../models/schemas/userSchema.js";

export async function verifyUserToken(req, res) {
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
}
