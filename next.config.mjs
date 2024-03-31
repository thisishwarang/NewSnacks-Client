/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "do-sopt-server-millie.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/articles/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
