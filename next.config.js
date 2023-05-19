/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:[
      'image.tmdb.org','secure.gravatar.com','cdn-icons-png.flaticon.com','www.movienewz.com'
    ]
  }
}

module.exports = nextConfig
