import { listContacts } from "../../repositories/contacts/listContacts.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
