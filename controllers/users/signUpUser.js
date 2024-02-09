import User from "../../models/schemas/userSchema.js";
import gravatar from "gravatar";
import { addUserSchema } from "../../models/schemas/joiSchemas/addUserSchema.js";
import { generateVerificationToken } from "../../utilities/verificationToken.js";
import { sendVerificationEmail } from "../../services/sendVerificationEmail.js";

export async function signUpUser(req, res) {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  const { error } = addUserSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
      data: `${error.details[0].message}`,
    });
  }

  try {
    const newUser = new User({ email, subscription });
    newUser.setPassword(password);

    const avatar = gravatar.url(email, { s: "250", d: "retro" });
    newUser.avatarURL = avatar;

    const verificationToken = generateVerificationToken();
    newUser.verificationToken = verificationToken;

    await newUser.save();
    await sendVerificationEmail({
      email,
      verificationToken: newUser.verificationToken,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          subscription: newUser.subscription || "starter",
          message: "Registration successful",
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
      data: "Registration Failure",
    });
  }
}
