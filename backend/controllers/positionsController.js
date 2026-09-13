const db = require("../config/db");

exports.getAllPositions = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM positions ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
};
