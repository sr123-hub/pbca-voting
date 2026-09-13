const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/voters", require("./routes/voters"));
app.use("/candidates", require("./routes/candidates"));
app.use("/settings", require("./routes/settings"));
app.use("/voting", require("./routes/voting"));
app.use("/summary", require("./routes/summary"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
