import Contact from "./schemas/contactSchema.js";

export const createContact = ({ email, password, subscription }) => {
  const newContact = new Contact({ email, password, subscription });
  return newContact.save();
};

export const findContactByEmail = (email) => {
  return Contact.findOne({ email });
};

export const findContactById = (id) => {
  return Contact.findById(id);
};

export const updateContactToken = (id, token) => {
  return Contact.findByIdAndUpdate(id, { token });
};
