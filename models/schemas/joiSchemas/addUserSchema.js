import Joi from "joi";

export const addUserSchema = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase letter, one digit, and one special character.",
    }),
  email: Joi.string().email().required(),
});
