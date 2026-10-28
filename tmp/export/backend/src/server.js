/**
 * Server entry point: loads environment configuration and starts HTTP server.
 */
require('./config');

const app = require('./app');
const { env } = require('./config');

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`BIT Central Library API listening on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
