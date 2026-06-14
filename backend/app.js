const express = require('express');
const { globalLimiter } = require('./middleware/rateLimiter');
const { httpLogger } = require('./utils/logger');
const app = express();

app.set('trust proxy', 1); // trust first proxy (Nginx)

app.use(express.json());
app.use(httpLogger);
app.use(globalLimiter);

app.use('/api/health', require('./routes/health'));
app.use('/api/users', require('./routes/users'));

app.use((err, req, res, _next) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;