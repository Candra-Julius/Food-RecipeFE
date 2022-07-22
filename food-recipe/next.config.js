/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', ""]
  },
  reactStrictMode: true,
  env: {
    NEXT_API: 'https://food-recipe-pijar.herokuapp.com'
  }
}

module.exports = nextConfig
