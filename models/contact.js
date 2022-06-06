const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(30).required(),
  favorite: Joi.bool(),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": "missing field favorite",
  }),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, statusJoiSchema };
