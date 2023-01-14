/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', ""]
  },
  reactStrictMode: true,
  env: {
    NEXT_API: 'https://white-rooster-kilt.cyclic.app'
  }
}

module.exports = nextConfig
