import { Contact } from "../../models/schemas/contactSchema.js";

export const removeContact = (contactId) => {
  return Contact.findByIdAndDelete({ _id: contactId });
};
