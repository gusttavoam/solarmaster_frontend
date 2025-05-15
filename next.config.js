/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // Desabilita o Hot Module Replacement para evitar atualizações automáticas
    config.watchOptions = {
      ignored: ['**/node_modules'],
      poll: false,
      aggregateTimeout: 300,
    }
    return config
  },
}

module.exports = nextConfig 