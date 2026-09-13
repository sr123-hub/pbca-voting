const express = require("express");
const router = express.Router();
const controller = require("../controllers/positionsController");

router.get("/", controller.getAllPositions);

module.exports = router;
