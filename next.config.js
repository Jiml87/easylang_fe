/** @type {import('next').NextConfig} */
const path = require('path');

const API_URL = process.env.API_HOST;

const nextConfig = {
  env: {
    OAUTH_GOOGLE_ID: process.env.OAUTH_GOOGLE_ID,
    API_URL: API_URL,
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
