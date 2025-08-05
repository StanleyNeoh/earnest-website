import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost" 
      },
      process.env.IMAGE_HOSTNAME && {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME
      }
    ].filter(Boolean),
    minimumCacheTTL: 31536000, // 1 year in seconds
    formats: ["image/webp"],
  },
  pageExtensions: ["ts", "tsx"],
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
