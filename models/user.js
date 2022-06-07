const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true },
);

const joiRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// const statusJoiSchema = Joi.object({
//   favorite: Joi.bool().required().messages({
//     "any.required": "missing field favorite",
//   }),
// });

const User = model("user", userSchema);

// module.exports = { User, joiSchema, statusJoiSchema };
module.exports = { User, joiRegisterSchema, joiLoginSchema };
