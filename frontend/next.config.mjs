/** @type {import('next').NextConfig} */

// When deploying to GitHub Pages the app lives at /<repo-name>/
// Set NEXT_PUBLIC_BASE_PATH="" to deploy at root (custom domain / username.github.io)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export",       // Static HTML export — required for GitHub Pages
  trailingSlash: true,    // GitHub Pages expects /about/ not /about

  basePath,
  assetPrefix: basePath,

  images: {
    unoptimized: true,    // next/image optimization not available in static export
  },

  experimental: {
    serverComponentsExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;
