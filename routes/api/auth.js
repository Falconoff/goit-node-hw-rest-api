const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");

// const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const { joiRegisterSchema } = require("../../models/user");

// const validateMiddleware = validation(joiSchema);

const router = express.Router();

// register
// router.post("/signup");
router.post(
  "/register",
  // validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register),
);

module.exports = router;
