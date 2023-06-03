const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      }
    }
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }
    return config
  },
  reactStrictMode: false,
  output: 'standalone',
  transpilePackages: ["echarts"],
}

module.exports = nextConfig
