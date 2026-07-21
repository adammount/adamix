import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
	output: 'standalone',
	outputFileTracingRoot: path.join(__dirname, '../../'),
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		unoptimized: true,
		qualities: [75, 100],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos'
			},
			{
				protocol: 'https',
				hostname: 'fastly.picsum.photos'
			}
		]
	},
	async rewrites() {
		const serverUrl = process.env.SERVER_URL || 'http://localhost:4200'
		return [
			{
				source: '/uploads/:path*',
				destination: `${serverUrl}/uploads/:path*`
			}
		]
	}
}

export default nextConfig
