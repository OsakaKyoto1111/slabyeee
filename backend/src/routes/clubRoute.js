const express = require("express");
const {
  getClubs,
  createClub,
  getClubApplicationsByUserId,addOwnerToClub
} = require("../controllers/clubController");

const router = express.Router();

router.get("/", getClubs);
router.post("/", createClub);
router.put("/", addOwnerToClub);
router.get("/applications/:userId", getClubApplicationsByUserId);

module.exports = router;
