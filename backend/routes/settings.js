const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET voting date
router.get("/voting-date", async (req, res) => {
  const [rows] = await db.query(
    "SELECT voting_date FROM settings WHERE id=1"
  );
  res.json(rows[0] || { voting_date: "" });
});

// GET voting window
router.get("/voting-window", async (req, res) => {
  const [rows] = await db.query(
    "SELECT voting_start, voting_end FROM settings WHERE id=1"
  );

  if (!rows.length) {
    return res.json({
      voting_start: "",
      voting_end: ""
    });
  }

  const start = rows[0].voting_start;
  const end = rows[0].voting_end;

  res.json({
voting_start: start
  ? new Date(start).toLocaleString("sv-SE").replace(" ", "T").slice(0, 16)
  : "",
voting_end: end
  ? new Date(end).toLocaleString("sv-SE").replace(" ", "T").slice(0, 16)
  : ""

  });
});

// UPDATE voting window (start + end + auto date)
router.put("/voting-window", async (req, res) => {
  const { voting_start, voting_end } = req.body;

  if (!voting_start || !voting_end) {
    return res.status(400).json({ error: "Start and end times are required." });
  }

  const voting_date = voting_start.split("T")[0];

  try {
    await db.query(
      "UPDATE settings SET voting_start=?, voting_end=?, voting_date=? WHERE id=1",
      [voting_start, voting_end, voting_date]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Voting window update error:", err);
    res.status(500).json({ error: "Failed to update voting window" });
  }
});

module.exports = router;
