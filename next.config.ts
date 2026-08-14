import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img77.uenicdn.com",
        pathname: "/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
