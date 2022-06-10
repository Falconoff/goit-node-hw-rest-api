const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log("_id:", _id);
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({ status: "No Content", code: 204 });
};

module.exports = logout;
