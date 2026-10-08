import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return ["png-to-jpg", "jpg-to-png", "webp-to-png"].map((slug) => ({
      source: `/tools/${slug}`,
      destination: "/tools/image-converter",
      permanent: true,
    }));
  },
};

export default nextConfig;
