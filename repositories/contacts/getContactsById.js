import { Contact } from "../../models/schemas/contactSchema.js";

export async function getContactById(contactId) {
  return Contact.findOne({ _id: contactId });
}
