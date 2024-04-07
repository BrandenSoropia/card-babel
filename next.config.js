/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Needed this to get Jest working
   */
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
