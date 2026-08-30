import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page lives under /{lang}. The bare root sends visitors to the
  // default locale. Not permanent: the default locale may change, and a
  // cached 308 in every visitor's browser would be painful to undo.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
