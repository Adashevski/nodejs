import nodemailer from "nodemailer";
import "dotenv/config";

const EMAIL = process.env.EMAIL;
const API_KEY = process.env.EMAIL_API_KEY;
const BASE_URL = process.env.BASE_URL;

export const sendVerificationEmail = async ({ email, verificationToken }) => {
  const config = {
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: API_KEY,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: "no-reply@sandbox35f03b02a94349f7a622d733e7e57591.mailgun.org",
    to: email,
    subject: "Email Verification",
    html: `<p>Your verification code: ${verificationToken}</p><a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Or click here </a>`,
  };

  await transporter.sendMail(emailOptions);
};
