const express = require("express");
// const createError = require("http-errors");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(30).required(),
});

const router = express.Router();
const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    // res.status(500).json({
    //   status: "error мля!",
    //   code: 50000,
    //   message: "Server error мать его!",
    // });
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      // --- 1 ---
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Product with id=${id} not found`,
      // });
      // return;
      // --- 2 ---
      // const error = new Error(`Product with id=${contactId} not found`);
      // error.status = 404;
      // throw error;
      //  --- 3 ---
      // throw createError(404, `Product with id=${contactId} not found`);
      //  --- 4 ---
      throw new NotFound(`Product with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    // res.status(500).json({
    //   status: "error мля!!!",
    //   code: 50000,
    //   message: "Server error!!! мать его!",
    // });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
