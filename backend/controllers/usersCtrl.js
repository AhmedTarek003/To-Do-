const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");

/**
 * @desc Get a Task
 * @route /api/tasks/:id
 * @method GET
 * @access private (only logged in users and owner)
 */
exports.getUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate({ path: "tasks", options: { sort: "-createdAt" } })
    .select("-password");
  if (!user || req.user._id !== id) {
    return res.status(404).json({ msg: "this user not found" });
  }
  res.status(200).json(user);
});
