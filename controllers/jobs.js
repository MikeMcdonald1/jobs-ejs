const getAllJobs = (req, res) => {
  // res.send(
  //   "<h1>GET /jobs</h1><p>Display all the job listings belonging to this user.</p>"
  // );
  const jobs = [];
  res.render("jobs", { jobs });
};
const createJob = (req, res) => {
  // res.send("<h1>POST /jobs</h1><p>Add a new job listing</p>");
  const { company, position, status } = req.body;
  console.log("--- POST /jobs: New Job Payload Received ---");
  console.log(`Company: ${company}`);
  console.log(`Position: ${position}`);
  console.log(`Status: ${status}`);
  console.log("-------------------------------------------");
  res.redirect("/jobs");
  // res.render("job", { job: null });
};
const getNewJobForm = (req, res) => {
  // res.send(
  //   "<h1>GET /jobs/new</h1><p>Put up the form to create a new entry</p>"
  // );
  res.render("job", { job: null });
};
const getEditJobForm = (req, res) => {
  // const { id } = req.params;
  // res.send(
  //   `<h1>GET /jobs/edit/:id</h1><p>Display edit form for job ID: ${id}</p>`
  // );
  const jobFromDB = {
    id: req.params.id,
    company: "Google",
    position: "Software Engineer",
    status: "interview",
  };
  res.render("job", { job: forFromDB });
};
const updateJob = (req, res) => {
  const { id } = req.params;
  // res.send(`<h1>POST /jobs/update/:id</h1><p>Update job with ID: ${id}</p>`);
  res.render("job", { job });
};
const deleteJob = (req, res) => {
  const { id } = req.params;
  res.send(`<h1>POST /jobs/delete/:id</h1><p>Delete job with ID: ${id}</p>`);
};

module.exports = {
  getAllJobs,
  createJob,
  getNewJobForm,
  getEditJobForm,
  updateJob,
  deleteJob,
};
