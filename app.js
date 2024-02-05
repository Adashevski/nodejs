import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import "./config/config-passport.js";
import { contactsRouter } from "./routes/api/contacts.js";
import { usersRouter } from "./routes/api/users.js";

export const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
