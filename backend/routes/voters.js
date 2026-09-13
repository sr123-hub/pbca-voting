const express = require("express");
const router = express.Router();
const voters = require("../controllers/votersController");

router.get("/", voters.getAllVoters);
router.get("/:id", voters.getVoter);
router.post("/", voters.addVoter);
router.put("/:id", voters.updateVoter);
router.post("/lookup", voters.lookupVoter);
router.delete("/:id", voters.deleteVoter);

module.exports = router;
