const Job = require("../models/Job");
const parseValidationErrors = require("../utils/parseValidationErrors");

const getAllJobs = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.session?.userId;
    const jobs = await Job.find({ createdBy: userId }).sort({ createdAt: -1 });
    res.render("jobs", { jobs });
  } catch (error) {
    console.log("Error getting jobs:", error);
    req.flash("error", "Unable to get jobs. Please try again later.");
    res.redirect("/");
  }
};

const createJob = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.session?.userId;
    console.log("req.user =", req.user);
    req.body.createdBy = userId;
    const job = await Job.create(req.body);
    res.redirect("/jobs");
  } catch (error) {
    console.log("Error creating job:", error);
    req.flash("error", "Could not create new job.");
    res.redirect("/jobs/new");
  }
};

// get the form for add a new job
const getNewJobForm = (req, res) => {
  res.render("job", { job: null });
};

// get the form for updating an existing job
const getEditJobForm = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.session?.userId;

    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: userId,
    }).lean();
    if (!job) {
      req.flash("error", "Job not found.");
      return res.redirect("/jobs");
    }

    res.render("job", {
      job: {
        id: job._id,
        company: job.company || "",
        position: job.position || "",
        status: job.status || "pending",
      },
    });
  } catch (err) {
    console.error("getEditJobForm error:", err);
    req.flash("error", "Unable to load job.");
    res.redirect("/jobs");
  }
};

const updateJob = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.session?.userId;
    const { id: jobId } = req.params;

    const job = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId }, // ownership check
      {
        company: req.body.company,
        position: req.body.position,
        status: req.body.status,
      },
      { new: true, runValidators: true }
    );

    if (!job) {
      req.flash("error", "Job not found.");
    }
    return res.redirect("/jobs");
  } catch (err) {
    console.error("updateJob error:", err);
    const errs = parseValidationErrors(err);
    req.flash("error", errs?.join(" ") || "Could not update job.");
    return res.redirect(`/jobs/edit/${req.params.id}`);
  }
};

const deleteJob = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.session?.userId;
    const { id: jobId } = req.params;

    const deleted = await Job.findOneAndDelete({
      _id: jobId,
      createdBy: userId,
    });
    if (!deleted) {
      req.flash("error", "Job not found.");
    }
    return res.redirect("/jobs");
  } catch (err) {
    console.error("deleteJob error:", err);
    req.flash("error", "Could not delete job.");
    return res.redirect("/jobs");
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getNewJobForm,
  getEditJobForm,
  updateJob,
  deleteJob,
};
