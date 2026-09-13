const db = require("../config/db");

// GET ALL VOTERS
exports.getAllVoters = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM voters ORDER BY voter_id ASC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching voters:", err);
    res.status(500).json({ error: "Failed to fetch voters" });
  }
};

// GET ONE VOTER
exports.getVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM voters WHERE voter_id = ?", [id]);

    if (!rows.length) {
      return res.status(404).json({ error: "Voter not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching voter:", err);
    res.status(500).json({ error: "Failed to fetch voter" });
  }
};

// ADD VOTER
exports.addVoter = async (req, res) => {
  try {
    const { voter_id, full_name, address, city, state, zipcode, phone } = req.body;

    const sql = `
      INSERT INTO voters (voter_id, full_name, address, city, state, zipcode, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      voter_id,
      full_name,
      address,
      city,
      state,
      zipcode,
      phone
    ]);

    res.json({ message: "Voter added", id: result.insertId });
  } catch (err) {
    console.error("Add voter error:", err);
    res.status(500).json({ error: "Failed to add voter" });
  }
};

// UPDATE VOTER
exports.updateVoter = async (req, res) => {
  try {
    const { full_name, address, city, state, zipcode, phone, voted } = req.body;
    const { id } = req.params; // voter primary key

    // Determine vote_date value
    const voteDateValue = voted == 1 ? new Date() : null;

    await db.query(
      "UPDATE voters SET full_name=?, address=?, city=?, state=?, zipcode=?, phone=?, voted=?, vote_date=? WHERE voter_id=?",
      [full_name, address, city, state, zipcode, phone, voted, voteDateValue, id]
    );

    res.json({ message: "Voter updated successfully" });
  } catch (err) {
    console.error("Update voter error:", err);
    res.status(500).json({ error: "Failed to update voter" });
  }
};


// LOOKUP VOTER
exports.lookupVoter = async (req, res) => {
  try {
    const { voter_id } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM voters WHERE voter_id = ?",
      [voter_id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Voter not found" });
    }

    if (rows[0].voted) {
      return res.status(403).json({ error: "Voter has already voted" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Lookup voter error:", err);
    res.status(500).json({ error: "Failed to lookup voter" });
  }
};

// DELETE VOTER
exports.deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if voter has voted
    const [votes] = await db.query(
      "SELECT * FROM votes WHERE voter_id = ?",
      [id]
    );

    if (votes.length > 0) {
      return res.status(403).json({
        error: "Cannot delete voter who has already voted"
      });
    }

    // Delete voter
    await db.query("DELETE FROM voters WHERE voter_id = ?", [id]);

    res.json({ message: "Voter deleted" });
  } catch (err) {
    console.error("Delete voter error:", err);
    res.status(500).json({ error: "Failed to delete voter" });
  }
};
