import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dfciqrwpe/**",
      },
    ],
  },
  // Don't use rewrites to external URLs (causes redirect loops)
  // Instead, use dynamic fetch in the API layer with env variable
};

export default nextConfig;
