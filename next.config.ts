import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 输出目录
  distDir: 'out',
  // 静态资源路径
  assetPrefix: '/',
  // 基础路径
  basePath: '',

  // 图片优化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
