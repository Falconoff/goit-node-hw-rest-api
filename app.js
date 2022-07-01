const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const sgMail = require("@sendgrid/mail");

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();
// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

// const email = {
//   to: "jolid37009@hekarro.com",
//   from: "sokolov@meta.ua",
//   subject: "New letter",
//   html: "<h1>Hello!</h1><h2>How are you?</h2><p>We have a new contact!</p><p><b>It's amazing!!!</b></p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch(error => console.log(error.message));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
