const { loadEnvFile } = require('node:process');
loadEnvFile();

const PORT = process.env.PORT;
const IS_TEST = process.env.NODE_ENV === 'test';

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT, IS_TEST }