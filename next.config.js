/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'static-cdn.jtvnw.net',
      'avatars.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig
