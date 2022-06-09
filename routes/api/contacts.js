const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { auth, validation, ctrlWrapper } = require("../../middlewares");

const { joiSchema, statusJoiSchema } = require("../../models/contact");

const validateMiddleware = validation(joiSchema);

const router = express.Router();

// get all
router.get("/", auth, ctrlWrapper(ctrl.getAll));

// get 1
router.get("/:contactId", ctrlWrapper(ctrl.getById));

// add new
router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.add));

// delete
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

// update
router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

// update status "favorite"
router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact),
);

module.exports = router;
