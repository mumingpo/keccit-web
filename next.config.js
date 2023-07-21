/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // FIXME: swcMinify is causing bug somewhere that prevents a successful build
  swcMinify: false,
}

module.exports = nextConfig
