const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  console.log("favorite:", favorite);

  let findParams = { owner: _id };
  if (favorite !== null) {
    findParams = { owner: _id, favorite };
  }

  const result = await Contact.find(findParams, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = getAll;
