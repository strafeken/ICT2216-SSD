const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const pool = require('../db/pool');
const { sanitizeLog } = require('./sanitize');
const { logError } = require('./consoleLogger');

const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

const httpLogger = morgan('combined', { stream: accessLogStream });

const auditLog = ({ userId = null, actionType, resourceType = null, resourceId = null, ip = null }) => {
  pool.query(
    'INSERT INTO audit_logs (user_id, action_type, resource_type, resource_id, source_ip) VALUES (?, ?, ?, ?, ?)',
    [userId, sanitizeLog(actionType), resourceType ? sanitizeLog(resourceType) : null, resourceId, ip ? sanitizeLog(ip) : null],
    (err) => {
      if (err) logError('[AUDIT] Failed to write audit log:', err.message);
    }
  );
};

module.exports = { httpLogger, auditLog };