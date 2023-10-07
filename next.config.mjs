import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
