/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "vercel.app"],
  },
  experimental: {
    // ❌ remova "appDir"
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
