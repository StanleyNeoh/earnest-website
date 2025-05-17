/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: process.env.IMAGE_HOSTNAME || "localhost" }],
  },
  pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
