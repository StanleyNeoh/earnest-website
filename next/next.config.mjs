import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: process.env.IMAGE_HOSTNAME || "localhost" }],
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx"],
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
