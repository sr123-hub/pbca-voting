const db = require("../config/db");

/*exports.submitVote = async (req, res) => {
  const { voter_id, selections } = req.body;
  const now = new Date();

  for (const sel of selections) {
    await db.query(
      "INSERT INTO votes (voter_id, candidate_id, position_id, vote_time) VALUES (?, ?, ?, ?)",
      [voter_id, sel.candidate_id, sel.position_id, now]
    );
  }

  await db.query(
    "UPDATE voters SET voted = 1, vote_date = ? WHERE voter_id = ?",
    [now, voter_id]
  );

  res.json({ message: "Vote submitted" });
};
*/
const db = require("../config/db");

// SUBMIT VOTE (supports multiple selections)
exports.submitVote = async (req, res) => {
  try {
    const { voter_id, selections } = req.body;

    // Validate payload
    if (!voter_id || !Array.isArray(selections) || selections.length === 0) {
      return res.status(400).json({
        title: "Missing Required Fields",
        message: "Please select a candidate for every position before submitting.",
        status: "error"
      });
    }

    // Check if voter exists
    const [voter] = await db.query(
      "SELECT * FROM voters WHERE id = ?",
      [voter_id]
    );

    if (!voter.length) {
      return res.status(404).json({
        title: "Voter Not Found",
        message: "The voter ID you entered does not exist.",
        status: "error"
      });
    }

    // Check if voter already voted
    if (voter[0].voted) {
      return res.status(403).json({
        title: "Already Voted",
        message: "This voter has already submitted their vote.",
        status: "warning"
      });
    }

    // Insert each vote
    for (const sel of selections) {
      if (!sel.position_id || !sel.candidate_id) {
        return res.status(400).json({
          title: "Missing Required Fields",
          message: "Each selection must include a position and candidate.",
          status: "error"
        });
      }

      await db.query(
        "INSERT INTO votes (voter_id, position_id, candidate_id) VALUES (?, ?, ?)",
        [voter_id, sel.position_id, sel.candidate_id]
      );
    }

    // Mark voter as voted + set vote_date
    await db.query(
      "UPDATE voters SET voted = 1, vote_date = NOW() WHERE id = ?",
      [voter_id]
    );

    res.json({
      title: "Vote Submitted",
      message: "Your vote has been successfully recorded.",
      status: "success"
    });

  } catch (err) {
    console.error("Submit vote error:", err);
    res.status(500).json({
      title: "Server Error",
      message: "Failed to submit vote.",
      status: "error"
    });
  }
};




exports.summary = async (req, res) => {
  const [rows] = await db.query(`
    SELECT c.full_name, c.photo, COUNT(v.id) AS votes, p.position_name AS position_name
    FROM candidates c
    LEFT JOIN votes v ON c.id = v.candidate_id
    LEFT JOIN positions p ON c.position_id = p.id
    GROUP BY c.id
  `);

  res.json(rows);
};
