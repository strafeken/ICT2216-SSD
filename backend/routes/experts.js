const express = require('express');
const router = express.Router();
const pool = require('../db/pool').promise();
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const { system } = require('../utils/winstonLogger');

const DELETED_EMAIL_SUFFIX = '@orca-deleted';

/**
 * GET /api/experts
 * List approved experts for workers to start a consultation.
 * Workers communicate with experts only — not with other workers.
 */
router.get('/', authMiddleware, requireRole('worker'), async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, bio, contact_number
         FROM users
        WHERE role = 'expert'
          AND is_approved = TRUE
          AND is_hard_locked = FALSE
          AND email NOT LIKE ?
        ORDER BY name ASC`,
      [`%${DELETED_EMAIL_SUFFIX}`]
    );
    res.json({ experts: rows });
  } catch (err) {
    system.error('Failed to list experts', { context: 'experts', error: err.message });
    res.status(500).json({ error: 'Could not load experts.' });
  }
});

module.exports = router;
