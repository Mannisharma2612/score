/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media-1.api-sports.io",
      },
      {
        hostname: "media-2.api-sports.io",
      },
      {
        hostname: "media-3.api-sports.io",
      },
    ],
  },
};

export default nextConfig;
