const asyncHandler = require("express-async-handler");
const { Task, TaskValidate } = require("../models/Tasks");
const { User } = require("../models/User");

/**
 * @desc Create a new Task
 * @route /api/tasks
 * @method POST
 * @access private (only logged in users)
 */
exports.createTaskCtrl = asyncHandler(async (req, res) => {
  const { error } = TaskValidate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const task = await Task.create({
    userId: req.user._id,
    title: req.body.title,
    desc: req.body.desc,
  });
  res.status(200).json(task);
});

/**
 * @desc Get a Task
 * @route /api/tasks/:id
 * @method GET
 * @access private (only logged in users and owner)
 */
exports.getTaskCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task || req.user._id !== task.userId.toString()) {
    return res.status(404).json({ msg: "this task not found" });
  }
  res.status(200).json(task);
});

/**
 * @desc Update a Task
 * @route /api/tasks/:id
 * @method PUT
 * @access private (only logged in users and owner)
 */
exports.updateTaskCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task || req.user._id !== task.userId.toString()) {
    return res.status(404).json({ msg: "this task not found" });
  }
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        title: req.body.title,
        desc: req.body.desc,
        compleated: req.body.compleated,
      },
    },
    { new: true }
  );
  const user = await User.findById(req.user._id)
    .populate({ path: "tasks", options: { sort: "-createdAt" } })
    .select("-password");
  res.status(200).json({ user, updatedTask });
});

/**
 * @desc Delete a Task
 * @route /api/tasks/:id
 * @method Delete
 * @access private (only logged in users and owner)
 */
exports.deleteTaskCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task || req.user._id !== task.userId.toString()) {
    return res.status(404).json({ msg: "this task not found" });
  }
  await Task.findByIdAndDelete(id);
  res.status(200).json({ msg: "task deleted successfully" });
});
