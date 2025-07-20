import withBundleAnalyzer from "@next/bundle-analyzer";
import { format } from "path";

/** @type {import('next').NextConfig} */
console.log(process.env.IMAGE_HOSTNAME, "IMAGE_HOSTNAME");
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
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
