/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', ""]
  },
  reactStrictMode: true,
  env: {
    NEXT_API: 'http://localhost:8000'
  }
}

module.exports = nextConfig
