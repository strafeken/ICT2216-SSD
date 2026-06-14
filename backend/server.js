const app = require('./app');
const { log } = require('./utils/consoleLogger');

app.listen(3000, () => {
  log(`[SERVER] ${new Date().toISOString()} - Server running on port 3000`);
});