import { getContactById } from "../../repositories/contacts/getContactsById.js";

export async function showContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).json(contact);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
