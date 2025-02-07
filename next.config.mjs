/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' }
    ]
  },
  env: {
    MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN,
  },
};

export default nextConfig;
