// db.js
require("dotenv").config();
const mysql = require("mysql2/promise");

// Detect Railway environment
const isRailway = process.env.RAILWAY_ENVIRONMENT !== undefined;

// Local development config
const localConfig = {
  host: "localhost",
  user: "root",
  password: "pbcavoting2026",
  database: "voting_system",
  port: 3306
};

// Railway production config
const railwayConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
};

// Choose correct config
const dbConfig = isRailway ? railwayConfig : localConfig;

// Create promise-based pool
const db = mysql.createPool(dbConfig);

// Log active DB
console.log("Connected to DB:", isRailway ? "Railway" : "Local MySQL");

module.exports = db;
