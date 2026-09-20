const pool = require("../config/db");
const fs = require("fs");
const csv = require("fast-csv");

exports.importVoters = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No CSV file uploaded" });
    }

    const voters = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        console.error("CSV parsing error:", error);
        res.status(500).json({ error: "CSV parsing failed" });
      })
      .on("data", (row) => {
        voters.push(row);
      })
      .on("end", async () => {
        try {
          for (const v of voters) {
            await pool.query(
              `INSERT INTO voters 
              (voter_id, full_name, address, city, state, zipcode, phone) 
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                v.voter_id,
                v.full_name,
                v.address || "",
                v.city || "",
                v.state || "",
                v.zipcode || "",
                v.phone || ""
              ]
            );
          }

          fs.unlinkSync(filePath); // delete uploaded CSV
          res.json({
            message: "Voters imported successfully",
            count: voters.length
          });
        } catch (err) {
          console.error("Database insert error:", err);
          res.status(500).json({ error: "Database insert failed" });
        }
      });
  } catch (err) {
    console.error("Import voters error:", err);
    res.status(500).json({ error: "Server error during import" });
  }
};
