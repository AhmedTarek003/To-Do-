const asyncHandler = require("express-async-handler");
const { User, RegisterValidate, LoginValidate } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc Register new user
 * @route /api/auth/register
 * @method POST
 * @access public
 */
exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = RegisterValidate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // check if user already registered
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(403).json({ msg: "User already exist" });
  }
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  // generate token
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});
/**
 * @desc Login user
 * @route /api/auth/Login
 * @method POST
 * @access public
 */
exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = LoginValidate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  // check from email and password
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(404).json({ msg: "Incorrect email or password" });
  }
  // generate token
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});
