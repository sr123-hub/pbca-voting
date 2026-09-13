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
