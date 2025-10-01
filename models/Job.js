const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a job title"],
      maxlength: 100,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done", "skipped"],
      default: "todo",
    },
    assignees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recurrence: {
      type: String,
      enum: ["never", "daily", "weekly"],
      default: "never",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
