const jobs = [];

const getAllJobs = (req, res) => {
  res.render("jobs", { jobs });
};

const createJob = (req, res) => {
  const { company, position, status } = req.body;
  // jobs.push({ id: Date.now(), company, position, status });
  res.redirect("/jobs");
};

const getNewJobForm = (req, res) => {
  res.render("job", { job: null });
};

const getEditJobForm = (req, res) => {
  const job = {
    id: req.params.id,
    company: "",
    position: "",
    status: "pending",
  };
  res.render("job", { job: job });
};

const updateJob = (req, res) => {
  const { id } = req.params;
  const { company, position, status } = req.body;
  // res.render("job", { job });
  res.redirect("/jobs");
};

const deleteJob = (req, res) => {
  const { id } = req.params;
  res.send(`<h1>POST /jobs/delete/:id</h1><p>Delete job with ID: ${id}</p>`);
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

// console.log("--- POST /jobs: New Job Payload Received ---");
// console.log(`Company: ${company}`);
// console.log(`Position: ${position}`);
// console.log(`Status: ${status}`);
// console.log("-------------------------------------------");

// console.log("--- POST /jobs: UPDATED Job Payload Received ---");
// console.log(`Company: ${company}`);
// console.log(`Position: ${position}`);
// console.log(`Status: ${status}`);
// console.log("-------------------------------------------");
