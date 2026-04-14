import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Разрешаем доступ с вашего локального IP для тестирования (например, с телефона)
  allowedDevOrigins: ["192.168.3.38", "localhost"],
};

export default nextConfig;