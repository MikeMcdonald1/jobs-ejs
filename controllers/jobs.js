const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.render("jobs", { jobs });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  // res.status(StatusCodes.CREATED).json({ job });
  res.redirect("/jobs");
};

// GET the form for add a new job
const getNewJobForm = (req, res) => {
  res.render("job", { job: null });
};

// GET the form for updating an existing job
const getEditJobForm = (req, res) => {
  const job = {
    id: req.params.id,
    company: "",
    position: "",
    status: "pending",
  };
  res.render("job", { job: job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  res.redirect("/jobs");
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  res.redirect("/jobs");
};

module.exports = {
  getAllJobs,
  createJob,
  getNewJobForm,
  getEditJobForm,
  updateJob,
  deleteJob,
};
