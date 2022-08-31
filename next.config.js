/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTACT: process.env.NEXT_PUBLIC_CONTACT,
    URL: process.env.NEXT_PUBLIC_URL
  },
}

module.exports = nextConfig
