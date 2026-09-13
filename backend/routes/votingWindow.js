const express = require("express");
const router = express.Router();
const voting = require("../controllers/votingWindowController");

router.get("/voting-date", voting.getVotingWindow);
router.put("/voting-date", voting.updateVotingWindow);

module.exports = router;
