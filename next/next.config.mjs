import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
console.log(process.env.IMAGE_HOSTNAME, "IMAGE_HOSTNAME");
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
  },
  pageExtensions: ["ts", "tsx"],
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
