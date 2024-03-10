/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 反向代理
  // async rewrites() {
  //   return [
  //     {
  //       source: "/store/api/product/:path*",
  //       destination: "https://music.163.com/store/api/product/:path*",
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        // hostname: "p4.music.126.net", // 匹配指定路由
        // hostname: "*.music.126.net", // 匹配单个路径段或子域
        hostname: "**.music.126.net", // 匹配末尾任意数量的路径段或开头的子域
      },
      {
        protocol: "https",
        hostname: "**.music.126.net", // 匹配末尾任意数量的路径段或开头的子域
      },
    ],
    // 与 类似remotePatterns, 该domains配置可用于为外部图像提供允许的主机名列表。
    // 该 domains 配置不支持通配符模式匹配，并且不能限制协议、端口或路径名。
    // domains: [],
  },
};

module.exports = nextConfig;
