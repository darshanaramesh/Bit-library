/**
 * Health check controller.
 */
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'bit-central-library-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

module.exports = { getHealth };
