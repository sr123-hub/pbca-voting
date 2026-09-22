// backend/config/db.js

require("dotenv").config();
const mysql = require("mysql2/promise");

// Detect environment
const isProduction = process.env.RAILWAY_ENVIRONMENT === "true";

// Production → Railway
// Local → localhost MySQL
const pool = mysql.createPool({
  host: isProduction ? process.env.MYSQLHOST : "localhost",
  user: isProduction ? process.env.MYSQLUSER : "root",
  password: isProduction ? process.env.MYSQLPASSWORD : "pbcavoting2026",
  database: isProduction ? process.env.MYSQLDATABASE : "voting_system",
  port: isProduction ? Number(process.env.MYSQLPORT) : 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,

  // Railway requires SSL
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

// Log which DB you're connected to
console.log("Connected to DB:", isProduction ? "Railway (Production)" : "Local MySQL");

module.exports = pool;
