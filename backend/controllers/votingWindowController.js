const db = require("../config/db");

// GET voting settings
exports.getVotingWindow = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT voting_date, voting_start, voting_end FROM settings WHERE id = 1"
    );

    if (!rows.length) {
      return res.json({
        voting_date: null,
        voting_start: null,
        voting_end: null
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching voting settings:", err);
    res.status(500).json({ error: "Failed to fetch voting settings" });
  }
};

// UPDATE voting settings
exports.updateVotingWindow = async (req, res) => {
  try {
    const { voting_date, voting_start, voting_end } = req.body;

    await db.query(
      "UPDATE settings SET voting_date=?, voting_start=?, voting_end=? WHERE id = 1",
      [voting_date, voting_start, voting_end]
    );

    res.json({ message: "Voting settings updated" });
  } catch (err) {
    console.error("Error updating voting settings:", err);
    res.status(500).json({ error: "Failed to update voting settings" });
  }
};
