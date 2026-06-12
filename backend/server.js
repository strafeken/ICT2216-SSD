const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is up!' });
});

app.get('/api/db-test', (req, res) => {
  db.query('SELECT 1', (err) => {
    if (err) return res.status(500).json({ status: 'DB connection failed', error: err.message });
    res.json({ status: 'DB connected!' });
  });
});

app.get('/api/users', (req, res) => {
  db.query('SELECT id, name, email, role, is_verified, is_approved, created_at FROM users', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));