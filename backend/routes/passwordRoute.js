const router = require("express").Router();
const {
  sendResetPassLink,
  resetPassword,
  getResetPasswordLink,
} = require("../controllers/password");

router.route("/reset-password-link").post(sendResetPassLink);
router
  .route("/reset-password-link/:userId/:tokenId")
  .get(getResetPasswordLink)
  .post(resetPassword);

module.exports = router;
