const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { auth, validation, ctrlWrapper } = require("../../middlewares");

const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

// const validateMiddleware = validation(joiSchema);

const router = express.Router();

// Register
router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register),
);

// Login
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

// Logout
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
