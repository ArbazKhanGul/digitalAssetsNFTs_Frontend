/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CONTACT: "contact@gmaildigitalassetsnft.com",
    Address:"0xeC7B1855C5f36FF5B29bD9bda6eaC026B8c42063",
    marketAddress:'0x402B7807fE161145671F82d0052F129011c41544',
    ipfsURL:"https://goldenwords.infura-ipfs.io/ipfs/",
    URL: 'https://textnft.vercel.app',
    // SERVER:'http://localhost:5000/images',
    // SERVER:'https://3a89-119-160-64-216.ngrok.io/images',
    SERVER_URL: 'http://localhost:5000',
    // SERVER_URL:'https://92fc-154-198-94-232.ngrok-free.app',
    chainId:31337,
    PROJECT_KEY_INFLURA:"2J1VjR9BuVpSDC33nS6hpLONikL",
    INFLURA_KEY:"6967a1bdc3d1ca8c2d10c472705917dc",
    STRIPE_PUBLISABLE_KEY:"pk_test_51IYU4pCchAI3m7fzkTfJbNEuR7PYsVv1gos4ELzuhNoKhEg1sx7gXDP91gtPjvNHSUPhW2tn9TDJNDXeS8vRxngP00RoO52d8D"
  },
  images: {
    domains: ['localhost','7109-119-160-64-133.ngrok.io','goldenwords.infura-ipfs.io'],
},
}

module.exports = nextConfig
