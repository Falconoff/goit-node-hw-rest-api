const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");

const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

// const validateMiddleware = validation(joiSchema);

const router = express.Router();

// Register
// router.post("/signup");
router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register),
);

// Login
// router.post("/signin");
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
