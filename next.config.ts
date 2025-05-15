import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", //* 회원가입 이미지 업로드 제한 10mb // 설정하지 않으면 기본값은 1mb임
    },
  },
  images: {
    domains: ["loremflickr.com"],
  },
};

export default nextConfig;
