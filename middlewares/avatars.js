const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "temp");
console.log("tempDir:", tempDir);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null);
  },
});
