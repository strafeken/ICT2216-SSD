const { sanitizeLog } = require('./sanitize');

const log = (message, ...values) => {
  const sanitized = values.map(sanitizeLog);
  process.stdout.write(`${message} ${sanitized.join(' ')}\n`);
};

const logError = (message, ...values) => {
  const sanitized = values.map(sanitizeLog);
  process.stderr.write(`${message} ${sanitized.join(' ')}\n`);
};

module.exports = { log, logError };