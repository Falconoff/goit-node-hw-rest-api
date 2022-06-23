const express = require("express");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

// router.post("/", auth, ctrlWrapper(ctrl.getCurrent));
router.post("/", ctrl.getCurrent);

// router.patch(
//   "/",
//   auth,
//   validation(subscriptionJoiSchema),
//   ctrlWrapper(ctrl.updateSubscription),
// );

module.exports = router;
