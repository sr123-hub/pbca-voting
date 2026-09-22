// backend/config/db.js

require("dotenv").config();
const mysql = require("mysql2/promise");

// Detect Railway automatically
const isProduction = !!process.env.MYSQLHOST;

// Create pool
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "voting_system",
  port: Number(process.env.MYSQLPORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,

  // Railway requires SSL
  ssl: process.env.MYSQLHOST ? { rejectUnauthorized: false } : false
});

// Log active DB
console.log("Connected to DB:", process.env.MYSQLHOST ? "Railway" : "Local MySQL");

module.exports = pool;
