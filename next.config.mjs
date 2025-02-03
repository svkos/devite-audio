const isCDN = process.env.IS_CDN === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  swcMinify: true,
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
    return config;
  },
  eslint: {
    dirs: ['.']
  },
  assetPrefix: isCDN ? process.env.CDN_URL : '',
};

export default nextConfig;
