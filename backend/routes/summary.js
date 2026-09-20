const express = require("express");
const router = express.Router();
const summary = require("../controllers/summaryController");
const summaryController = require("../controllers/summaryController");

router.get("/", summary.getSummary);
router.get("/states", summary.getStateStats);
router.get("/locations", summaryController.getLocationSummary);


module.exports = router;

/*
const express = require("express");
const router = express.Router();

// FIX: import the controller
const summaryController = require("../controllers/summaryController");

// Existing summary route
router.get("/", summaryController.summary);

// NEW state stats route
router.get("/states", summaryController.getStateStats);

module.exports = router;
*/