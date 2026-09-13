const express = require("express");
const router = express.Router();
const { getCandidates } = require("../controllers/candidatesController");

router.get("/", getCandidates);
router.post("/submit", votesController.castVote);

module.exports = router;
