import { Contact } from "../../models/schemas/contactSchema.js";

export const addContact = (body) => {
  return Contact.create(body);
};
