const app = require('./app');

app.listen(3000, () => {
  console.log(`[SERVER] ${new Date().toISOString()} - Server running on port 3000`);
});