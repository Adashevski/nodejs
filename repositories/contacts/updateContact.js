import { Contact } from "../../models/schemas/contactSchema.js";

export const updateContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body);
};
