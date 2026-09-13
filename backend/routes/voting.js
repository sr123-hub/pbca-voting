const express = require("express");
const router = express.Router();
const voting = require("../controllers/votingController");

router.post("/submit", voting.submitVote);

module.exports = router;
