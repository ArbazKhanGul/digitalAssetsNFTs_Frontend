/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CONTACT: "contact@gmailgoldennft.com",
    URL: 'https://textnft.vercel.app',
    // SERVER:'http://localhost:5000/images',
    SERVER:'https://3a89-119-160-64-216.ngrok.io/images',
    // SERVER_URL: 'http://localhost:5000'
    SERVER_URL:'https://3a89-119-160-64-216.ngrok.io'
  },
  images: {
    domains: ['localhost','3a89-119-160-64-216.ngrok.io'],
},
}

module.exports = nextConfig
