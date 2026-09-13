const db = require("../config/db");
const csv = require("csv-parser");
const fs = require("fs");

exports.importVoters = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        title: "No File Uploaded",
        message: "Please upload a CSV file.",
        status: "error"
      });
    }

    const results = [];
    const errors = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        const { voter_id, full_name, address, city, state, zipcode, phone } = row;

        if (!voter_id || !full_name || !address || !city || !state || !zipcode) {
          errors.push(row);
          return;
        }

        results.push([voter_id, full_name, address, city, state, zipcode, phone]);
      })
      .on("end", async () => {
        if (results.length > 0) {
          await db.query(
            `INSERT INTO voters 
             (voter_id, full_name, address, city, state, zipcode, phone)
             VALUES ?`,
            [results]
          );
        }

        fs.unlinkSync(req.file.path);

        res.json({
          title: "Import Complete",
          message: `Imported: ${results.length}, Failed: ${errors.length}`,
          status: "success"
        });
      });
  } catch (err) {
    console.error("Import voters error:", err);
    res.status(500).json({
      title: "Server Error",
      message: "Failed to import voters.",
      status: "error"
    });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM admins WHERE username = ? AND password = ?",
    [username, password]
  );

  if (!rows.length) {
    return res.json({ error: "Invalid username or password" });
  }

  res.json({ success: true, role: rows[0].role });
};
