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
  }
};

export default nextConfig;
