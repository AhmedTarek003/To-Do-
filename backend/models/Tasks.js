const mongoose = require("mongoose");
const Joi = require("joi");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    compleated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Tasks", TaskSchema);

const TaskValidate = (obj) => {
  const schema = Joi.object({
    title: Joi.required(),
    desc: Joi.string(),
  });
  return schema.validate(obj);
};
module.exports = { Task, TaskValidate };
