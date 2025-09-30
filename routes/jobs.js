const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");

router.get("/", jobController.getAllJobs);

router.post("/", jobController.createJob);

router.get("/new", jobController.getNewJobForm);

router.get("/edit/:id", jobController.getEditJobForm);

router.post("/update/:id", jobController.updateJob);

router.post("/delete/:id", jobController.deleteJob);

module.exports = router;
