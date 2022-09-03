/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CONTACT: process.env.NEXT_PUBLIC_CONTACT,
    URL: process.env.NEXT_PUBLIC_URL,
    SERVER:'http://localhost:5000/images'
  },
  images: {
    domains: ['localhost'],
},
}

module.exports = nextConfig
