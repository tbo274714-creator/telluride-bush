/** @type {import('next').NextConfig} */
const repo = "telluride-bush";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

module.exports = nextConfig;
