import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source:
          "/grimoire/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})-:rest",
        destination: "/grimoire/:rest",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
