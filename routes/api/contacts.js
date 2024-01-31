import express from "express";
import auth from "../../middleware/auth.js";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContacts } from "../../controllers/contacts/updateContacts.js";
import { updateContactsStatus } from "../../controllers/contacts/updateContactsStatus.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", auth, indexContacts);

contactsRouter.get("/:contactId", auth, showContacts);

contactsRouter.post("/", auth, createContacts);

contactsRouter.delete("/:contactId", auth, deleteContacts);

contactsRouter.put("/:contactId", auth, updateContacts);

contactsRouter.patch("/:contactId/favorite", auth, updateContactsStatus);
