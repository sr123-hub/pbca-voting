// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// ROUTES
const voterRoutes = require("./routes/voters");
const candidateRoutes = require("./routes/candidates");
const positionRoutes = require("./routes/positions");
const voteRoutes = require("./routes/votes");
const summaryRoutes = require("./routes/summary");
const importVotersRoute = require("./routes/import-voters");
const settingsRoutes = require("./routes/settings");
const adminRoutes = require("./routes/admin");

const app = express();

// CORS for local + Netlify + Render
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Serve uploaded candidate images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API ROUTES
app.use("/api/voters", voterRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/import-voters", importVotersRoute);
app.use("/api/settings", settingsRoutes);   // ⭐ FIXED: now under /api/settings
app.use("/admin", adminRoutes);

// Root route (Render health check)
app.get("/", (req, res) => {
  res.send("PBCA Voting System Backend is running");
});

// IMPORTANT:
// ❌ Do NOT serve React build here.
// Netlify serves the frontend.
// Render serves ONLY the backend.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

setInterval(async () => {
  try {
    await pool.query("SELECT 1");
  } catch (err) {
    console.log("DB keep-alive failed:", err.message);
  }
}, 30000);
