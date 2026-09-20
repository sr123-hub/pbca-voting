const express = require("express");
const router = express.Router();
const votesController = require("../controllers/votesController");

// Submit vote
router.post("/submit", votesController.submitVote);

// Get summary of votes
router.get("/summary", votesController.summary);

module.exports = router;
