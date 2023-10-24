const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const Verification = require("../models/Verification");
const Crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcryptjs");

/**
 * @desc Send mail to reset password
 * @route /api/password/reset-password-link
 * @method POST
 * @access public
 */
exports.sendResetPassLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  let verification = await Verification.findOne({ userId: user._id });
  if (!verification) {
    verification = await Verification.create({
      userId: user._id,
      token: Crypto.randomBytes(32).toString("hex"),
    });
  }
  // Create Link
  const link = `${process.env.URL}/reset-password/${user._id}/${verification.token}`;
  const htmlTemplate = `<div> to reset your psssword click here 
  <a href= ${link}>Reset</a>
  </div>`;
  await sendMail(user.email, "Reset Password", htmlTemplate);
  res.status(200).json({ msg: "check your gmail to reset your password" });
});

/**
 * @desc chedk mail to reset password
 * @route /api/password/reset-password-link/:userId/:tokenId
 * @method GET
 * @access public
 */
exports.getResetPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ msg: "invalid link" });
  }
  const verification = await Verification.findOne({
    userId: user._id,
    token: req.params.tokenId,
  });
  if (!verification) {
    return res.status(400).json({ msg: "invalid link" });
  }
  res.status(200).json({ msg: "vaild link" });
});
/**
 * @desc reset  password
 * @route /api/password/reset-password-link/:userId/:tokenId
 * @method POST
 * @access public
 */
exports.resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ msg: "invalid link" });
  }
  const verification = await Verification.findOne({
    userId: user._id,
    token: req.params.tokenId,
  });
  if (!verification) {
    return res.status(400).json({ msg: "invalid link" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  await user.save();
  await verification.deleteOne();
  res.status(200).json({ msg: "password reset successfully, please login" });
});
