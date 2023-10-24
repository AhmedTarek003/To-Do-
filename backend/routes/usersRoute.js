const router = require("express").Router();
const { getUserCtrl } = require("../controllers/usersCtrl");
const validateId = require("../middlewares/validateId");
const verifyToken = require("../middlewares/verifyToken");

// /api/users/:id
router.route("/:id").get(validateId, verifyToken, getUserCtrl);
module.exports = router;
