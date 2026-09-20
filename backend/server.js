const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const voterRoutes = require("./routes/voters");
const candidateRoutes = require("./routes/candidates");
const positionRoutes = require("./routes/positions");
const voteRoutes = require("./routes/votes");
const summaryRoutes = require("./routes/summary");
const importVotersRoute = require("./routes/import-voters");
const settingsRoutes = require("./routes/settings");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/voters", voterRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/import-voters", importVotersRoute);
app.use("/settings", settingsRoutes);
app.use("/admin", adminRoutes);

// ⭐ Serve React build correctly
app.use(express.static(path.join(__dirname, "../frontend/build")));

// ⭐ SPA rewrite rule — fixes /voting-jamaica, /voting-woodside, etc.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
