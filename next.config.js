/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CONTACT: "arbazkhangul123@gmail.com",
    URL: 'https://textnft.vercel.app',
    SERVER:'http://localhost:5000/images'
  },
  images: {
    domains: ['localhost'],
},
}

module.exports = nextConfig
