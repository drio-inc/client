/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    API_URL: process.env.API_URL,
    MOCK_URL: process.env.MOCK_URL,
    DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.DEVELOPMENT_MODE === "mock"
            ? process.env.MOCK_URL
            : process.env.API_URL
        }/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
