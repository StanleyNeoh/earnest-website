import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost" 
      },
      process.env.IMAGE_HOSTNAME && {
        hostname: process.env.IMAGE_HOSTNAME
      }
    ].filter(Boolean),
    minimumCacheTTL: 24 * 60 * 60, // 1 day
    formats: ["image/webp"],
  },
  pageExtensions: ["ts", "tsx"],
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
