import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for better debugging and catching potential issues
  //clswcMinify: true, // Uses SWC compiler for faster builds and better minification

  images: {
    domains: ["your-image-domain.com", "res.cloudinary.com"], // Allows optimized images from these domains
  },

  async redirects() {
    return [
      {
        source: "/:path*", // Matches all routes on the Vercel subdomain
        has: [{ type: "host", value: "fit-circuit.vercel.app" }], // Only applies when the request comes from this domain
        destination: "https://fitcircuit.life/:path*", // Redirects users to the custom domain
        permanent: true, // 301 Permanent Redirect (recommended for SEO)
      },
    ];
  },
};

export default nextConfig;
