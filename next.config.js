/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SOMETHING: 'my-value',
  },
}

module.exports = nextConfig
