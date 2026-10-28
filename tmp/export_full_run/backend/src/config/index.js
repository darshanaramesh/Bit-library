/**
 * Central environment configuration.
 *
 * Loads .env files (local backend/.env first, then the project-root .env as a
 * fallback) and exposes a typed config object. No secrets belong in git - see
 * .env.example at the project root for the expected variables.
 */
const path = require('path');
const dotenv = require('dotenv');

// Local overrides win over the shared root file. dotenv never overwrites
// variables that already exist in process.env.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,

  // Database (MySQL) - not wired up yet
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_NAME: process.env.DB_NAME || 'bit_central_library',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',

  // Auth (JWT) - not wired up yet
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',

  // AI chatbot - not wired up yet
  AI_API_KEY: process.env.AI_API_KEY || '',
  AI_MODEL: process.env.AI_MODEL || '',
};

module.exports = { env };
