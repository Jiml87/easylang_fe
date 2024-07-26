/** @type {import('next').NextConfig} */
const path = require('path');

const API_HOST = process.env.API_HOST || '';

const nextConfig = {
  env: {
    OAUTH_GOOGLE_ID: process.env.OAUTH_GOOGLE_ID,
    OAUTH_GOOGLE_REDIRECT_URL: process.env.OAUTH_GOOGLE_REDIRECT_URL,
  },
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
        destination: `${API_HOST}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
