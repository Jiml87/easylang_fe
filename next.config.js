/** @type {import('next').NextConfig} */
const path = require('path');

const API_HOST = process.env.API_HOST || '';

const nextConfig = {
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
