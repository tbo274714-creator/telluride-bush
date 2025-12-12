/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com", // YouTube thumbnails
      },
    ],
  },
};

export default nextConfig;
