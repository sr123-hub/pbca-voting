const db = require("../config/db");

// SUBMIT VOTE
exports.submitVote = async (req, res) => {
  try {
        const { voter_id, selections } = req.body;

    if (!voter_id || !Array.isArray(selections) || selections.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if voter exists
    const [voter] = await db.query(
      "SELECT * FROM voters WHERE voter_id = ?",
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
    message: "This voter has already submitted a vote and cannot vote again.",
    status: "warning"
  });
}

    // Insert vote
for (const sel of selections) {
      await db.query(
        "INSERT INTO votes (voter_id, position_id, candidate_id) VALUES (?, ?, ?)",
        [voter_id, sel.position_id, sel.candidate_id]
      );
    }

    // Mark voter as voted
       await db.query(
      "UPDATE voters SET voted = 1, vote_date = NOW() WHERE voter_id = ?",
      [voter_id]
    );

    res.json({
  title: "Vote Submitted",
  message: "Your vote has been successfully recorded.",
  status: "success"
});

  } catch (err) {
    console.error("Submit vote error:", err);
    res.status(500).json({ error: "Failed to submit vote" });
  }
};
