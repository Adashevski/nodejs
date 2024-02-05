import { Contact } from "../models/schemas/contactSchema.js";

export async function writeDataToDb(data) {
  try {
    const contact = new Contact({ ...data });
    await contact.save();
    console.log("Data successfully written to the database.");
  } catch (err) {
    console.error("Error writing data to the database:", err);
    throw err;
  }
}
