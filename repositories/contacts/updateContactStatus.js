import { Contact } from "../../models/schemas/contactSchema.js";

export const updateContactStatus = (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body);
};
