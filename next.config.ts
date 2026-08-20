import { withContentCollections } from "@content-collections/next";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "radix-ui"],
  },
};

export default withContentCollections(withNextIntl(nextConfig));
