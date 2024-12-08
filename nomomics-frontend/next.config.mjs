/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactDevOverlay: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: 'file-loader', // Or another appropriate loader
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
