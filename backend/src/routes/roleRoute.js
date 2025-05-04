const express = require("express");
const { updateUserRole } = require("../controllers/roleController");

const router = express.Router();

router.put('/update', updateUserRole); 

module.exports = router;
