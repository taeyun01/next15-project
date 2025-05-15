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
  // /upload:slug 주소를 만나면 localhost:1111/upload/:slug 이런식으로 바꿔서 실행해줌
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // Matched parameters can be used in the destination
      },
      // 바꾸고 싶은 주소들이 있다면 추가 가능
    ];
  },
};

export default nextConfig;
