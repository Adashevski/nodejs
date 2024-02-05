import { updateContactStatus } from "../../repositories/contacts/updateContactStatus.js";

export async function updateContactsStatus(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined || favorite === null) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing field favorite",
    });
  }

  try {
    const contactStatus = await updateContactStatus(contactId, { favorite });
    if (contactStatus) {
      return res.json({
        status: "success",
        code: 200,
        data: { favorite },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contacts id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: err?.message,
    });
  }
}
