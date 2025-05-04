const express = require("express");
const {
  createApplication,
  approveApplication,getApplications
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/", createApplication);
router.put("/:applicationId/approve", approveApplication);
router.get("/",getApplications)
module.exports = router;
