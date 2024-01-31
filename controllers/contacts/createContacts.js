import { addContact } from "../../repositories/contacts/addContact.js";

export async function createContacts(req, res, next) {
  const { name, email, phone } = req.body;
  try {
    const newContact = await addContact({ name, email, phone });
    return res.status(201).json(newContact);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
