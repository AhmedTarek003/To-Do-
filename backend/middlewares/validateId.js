const mongoose = require("mongoose");

const validateId = (req, res, next) => {
  const id = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!id) {
    return res.status(404).json({ msg: "Invalid Id" });
  }
  next();
};

module.exports = validateId;
