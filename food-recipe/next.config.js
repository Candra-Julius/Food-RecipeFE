/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', ""]
  },
  reactStrictMode: true,
  env: {
    NEXT_API: 'https://long-underwear-toad.cyclic.app'
  }
}

module.exports = nextConfig
