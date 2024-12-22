/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		// Add file-loader for .pdf files
		config.module.rules.push({
			test: /\.pdf$/,
			use: 'file-loader', // Or another appropriate loader
		});

		// Fallback for canvas module
		config.resolve.fallback = {
			...config.resolve.fallback,
			canvas: false, // Mock canvas during the build
		};

		return config;
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
		// unoptimized: true,
	},
};

export default nextConfig;
