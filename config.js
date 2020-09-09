const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  API_HOST: process.env.API_HOST,
  CORS_ORIGIN: process.env.CORS_ORIGIN
};