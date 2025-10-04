const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      maxlength: 100,
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      maxlength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined", "accepted"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
