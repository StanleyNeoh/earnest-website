/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: process.env.IMAGE_HOSTNAME || "localhost" }],
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
