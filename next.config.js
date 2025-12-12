/** @type {import('next').NextConfig} */
const repo = "telluride-bush";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(isProd
    ? { basePath: `/${repo}`, assetPrefix: `/${repo}/` }
    : {}),
};

module.exports = nextConfig;
