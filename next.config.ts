import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to ./out,
// which Amplify serves directly. No server, no accounts, nothing to patch.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /articles/hello-world/ -> /articles/hello-world/index.html
  images: { unoptimized: true },
};

export default nextConfig;
