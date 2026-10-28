/**
 * Express application setup.
 *
 * This file only wires middleware and routes together. It does not open a
 * port - that is handled by server.js so the app can be reused (tests, etc.).
 */
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health / status endpoint
app.use('/api', healthRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
