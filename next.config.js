/** @type {import('next').NextConfig} */

const makeEnvVariablesAsPublic = require('./src/utils/makeEnvVariablesAsPublic');

makeEnvVariablesAsPublic(['API_SERVER_WORD_PATH']);

const nextConfig = {};

module.exports = nextConfig;
