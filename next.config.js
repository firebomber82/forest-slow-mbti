/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // 關閉 Lightning CSS
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
