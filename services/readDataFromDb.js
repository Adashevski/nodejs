import { Contact } from "../models/schemas/contactSchema.js";

export async function readDataFromDb() {
  try {
    const data = await Contact.find();
    return data;
  } catch (err) {
    console.error("Error reading data from database:", err);
    throw err;
  }
}
