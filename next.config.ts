import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // 정적 사이트 빌드 비활성화
  // trailingSlash: true, // trailing slash 비활성화
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 빌드 중 TypeScript 오류 무시
  },
};

export default nextConfig;
