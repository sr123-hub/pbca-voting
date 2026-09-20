const express = require("express");
const multer = require("multer");
const path = require("path");
const importVotersController = require("../controllers/importVotersController");

const router = express.Router();

// Upload CSV to /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// POST /api/import-voters
router.post("/", upload.single("file"), importVotersController.importVoters);

module.exports = router;
