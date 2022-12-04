/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CONTACT: "contact@gmailgoldennft.com",
    Address:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
    URL: 'https://textnft.vercel.app',
    // SERVER:'http://localhost:5000/images',
    // SERVER:'https://3a89-119-160-64-216.ngrok.io/images',
    SERVER_URL: 'http://localhost:5000',
    // SERVER_URL:'https://3a89-119-160-64-216.ngrok.io'
    chainId:31337
  },
  images: {
    domains: ['localhost','3a89-119-160-64-216.ngrok.io'],
},
}

module.exports = nextConfig
