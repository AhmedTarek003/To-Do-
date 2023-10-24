const router = require("express").Router();
const {
  createTaskCtrl,
  getTaskCtrl,
  updateTaskCtrl,
  deleteTaskCtrl,
} = require("../controllers/tasksCtrl");
const validateId = require("../middlewares/validateId");
const verifyToken = require("../middlewares/verifyToken");

// /api/tasks
router.route("/").post(verifyToken, createTaskCtrl);
// /api/tasks/:id
router
  .route("/:id")
  .get(validateId, verifyToken, getTaskCtrl)
  .put(validateId, verifyToken, updateTaskCtrl)
  .delete(validateId, verifyToken, deleteTaskCtrl);

module.exports = router;
