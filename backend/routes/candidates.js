const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const candidates = require("../controllers/candidatesController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get("/", candidates.getCandidates);
router.post("/", upload.single("photo"), candidates.addCandidate);
router.put("/:id", upload.single("photo"), candidates.updateCandidate);
router.delete("/:id", candidates.deleteCandidate);

module.exports = router;
