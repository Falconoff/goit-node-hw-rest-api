const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    // 409 error
    throw new Conflict(`User with ${email} already exist`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ name, email, password: hashPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = register;
