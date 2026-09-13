const db = require("../config/db");
const fs = require("fs");

exports.getCandidates = async (req, res) => {
  const [rows] = await db.query(`
    SELECT c.*, p.position_name 
    FROM candidates c 
    JOIN positions p ON c.position_id = p.id
    ORDER BY c.id ASC
  `);
  res.json(rows);
};

exports.addCandidate = async (req, res) => {
  try {
    const { full_name, position_id } = req.body;
    const photo = req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO candidates (full_name, position_id, photo)
      VALUES (?, ?, ?)
    `;

    await db.query(sql, [full_name, position_id, photo]);

    res.json({ message: "Candidate added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add candidate" });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, position_id } = req.body;

    // Get old photo
    const [old] = await db.query("SELECT photo FROM candidates WHERE id=?", [id]);

    let newPhoto = old[0].photo;

    if (req.file) {
      newPhoto = req.file.filename;

      // Delete old photo
      if (old[0].photo) {
        fs.unlink(`uploads/${old[0].photo}`, () => {});
      }
    }

    const sql = `
      UPDATE candidates 
      SET full_name=?, position_id=?, photo=?
      WHERE id=?
    `;

    await db.query(sql, [full_name, position_id, newPhoto, id]);

    res.json({ message: "Candidate updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update candidate" });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const [old] = await db.query("SELECT photo FROM candidates WHERE id=?", [id]);

    if (old[0].photo) {
      fs.unlink(`uploads/${old[0].photo}`, () => {});
    }

    await db.query("DELETE FROM candidates WHERE id=?", [id]);

    res.json({ message: "Candidate deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete candidate" });
  }
};
