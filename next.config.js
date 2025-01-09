/** @type {import('next').NextConfig} */
const path = require('path');

const API_HOST =
  process.env.NODE_ENV === 'development' ? 'localhost' : 'api_service';

const API_URL = `http://${API_HOST}:8000`;

const nextConfig = {
  env: {
    OAUTH_GOOGLE_ID: process.env.OAUTH_GOOGLE_ID,
    // OAUTH_GOOGLE_REDIRECT_URL: process.env.OAUTH_GOOGLE_REDIRECT_URL,
    // AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET,
    API_HOST: API_HOST,
  },
  compress: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(path.resolve(), './src'),
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
