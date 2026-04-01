/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@react-pdf\/renderer/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all remote images (optional: restrict in production)
      },
    ],
  },

  // Optional: Enable experimental features for Next.js 15
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
