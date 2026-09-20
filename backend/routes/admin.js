const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const db = require("../config/db");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/import-voters", upload.single("file"), adminController.importVoters);
router.post("/reset-votes", adminController.resetVotes);
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM admins WHERE username=? AND password=?",
    [username, password]
  );

  if (!rows.length) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.json({
    success: true,
    role: rows[0].role,
    username: rows[0].username
  });
});

module.exports = router;
