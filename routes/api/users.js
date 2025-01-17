const express = require("express");

const { users: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");

const { subscriptionJoiSchema } = require("../../models/user");

const router = express.Router();

// Get current
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

// Update Subscription Status
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription),
);

// Update Avatar
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar),
);

// Verify Register Token
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

// resend Verification letter
router.post("/verify", ctrlWrapper(ctrl.resendLetter));

module.exports = router;
