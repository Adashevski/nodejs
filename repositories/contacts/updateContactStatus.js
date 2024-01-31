import { User } from "../../models/schemas/userSchema.js";

export const updateContactStatus = (contactId, body) => {
  return User.findByIdAndUpdate(contactId, body);
};
