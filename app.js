const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs/promises");

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
// const avatarsRouter = require("./routes/api/avatars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// TEMP middleware
const path = require("path");

// const tempDir = path.join(__dirname, "public", "avatars");
const tempDir = path.join(__dirname, "temp");
const avatarsDir = path.join(__dirname, "public", "avatars");
console.log("tempDir:", tempDir);
console.log("avatarsDir:", avatarsDir);

//  config for middleware with Multer
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 2048 },
});
// middleware
const upload = multer({ storage: multerConfig });

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

const avatars = [];

// app.use("/api/avatars", avatarsRouter);
// Route for upload files
app.post("/api/avatars", upload.single("avatar"), async (req, res) => {
  console.log(req.file); // info about uploaded file
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);
  console.log("tempUpload:", tempUpload);
  console.log("resultUpload", resultUpload);

  try {
    await fs.rename(tempUpload, resultUpload);

    const image = path.join("avatars", originalname);
    const newContact = {
      name: req.body.name,
      image: image,
    };
    avatars.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
});

app.get("/api/avatars", async (req, res) => {
  res.json(avatars);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
