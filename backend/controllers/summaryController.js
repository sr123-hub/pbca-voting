const db = require("../config/db");

exports.getSummary = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.position_name,
        c.full_name,
        c.photo,
        COUNT(v.id) AS votes
      FROM candidates c
      JOIN positions p ON c.position_id = p.id
      LEFT JOIN votes v ON c.id = v.candidate_id
      GROUP BY c.id
      ORDER BY p.id, votes DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Summary error:", err);
    res.status(500).json({ error: "Failed to load summary" });
  }
};
//const db = require("../config/db");

exports.getStateStats = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        state,
        COUNT(*) AS total_voters,
        SUM(CASE WHEN voted = 1 THEN 1 ELSE 0 END) AS voted_voters
      FROM voters
      WHERE state IN ('NY', 'NJ', 'CT')
      GROUP BY state
    `);

    res.json(rows);
  } catch (err) {
    console.error("State stats error:", err);
    res.status(500).json({ error: "Failed to load state stats" });
  }
};
exports.getLocationSummary = async (req, res) => {
  try {
    const sql = `
      SELECT voting_location AS location,
             COUNT(*) AS votes
      FROM voters
      WHERE voting_location IN ('Jamaica', 'Woodside', 'Jersey', 'Connecticut')
      GROUP BY voting_location
      ORDER BY voting_location
    `;

    const [rows] = await db.query(sql);
    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load location summary" });
  }
};
