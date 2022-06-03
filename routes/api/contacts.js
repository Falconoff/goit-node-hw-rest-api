const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas/");
const validateMiddleware = validation(contactSchema);

const router = express.Router();

// get all
router.get("/", ctrlWrapper(ctrl.getAll));

// get 1
router.get("/:contactId", ctrlWrapper(ctrl.getById));

// add new
router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

// delete
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

// update
router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router;
