const express = require("express");
const router = express.Router();
const controller = require("../controllers/votesController");

//router.post("/submit", controller.submitVote);
router.get("/summary", controller.summary);
router.post("/submit", votesController.castVote);

module.exports = router;
