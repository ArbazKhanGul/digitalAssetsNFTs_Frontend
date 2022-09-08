/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CONTACT: "contact@gmailgoldennft.com",
    URL: 'https://textnft.vercel.app',
    SERVER:'http://localhost:5000/images',
    // SERVER:'https://24c6-119-160-64-218.ngrok.io/images',
    SERVER_URL: 'http://localhost:5000'
    // SERVER_URL:'https://24c6-119-160-64-218.ngrok.io'
  },
  images: {
    domains: ['localhost','24c6-119-160-64-218.ngrok.io'],
},
}

module.exports = nextConfig
