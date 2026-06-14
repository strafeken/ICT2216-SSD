const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.on('connection', (connection) => {
  console.log(`[DB] ${new Date().toISOString()} - New connection established (id: ${connection.threadId})`);
});

pool.on('error', (err) => {
  console.error(`[DB] ${new Date().toISOString()} - Pool error: ${err.message}`);
});

module.exports = pool;