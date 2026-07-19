import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/constants/constants'

import { categoryService } from '@/services/category.service'
import { videoService } from '@/services/video.service'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: SITE_URL, changeFrequency: 'daily', priority: 1 },
		{ url: `${SITE_URL}/trending`, changeFrequency: 'daily', priority: 0.8 }
	]

	try {
		const [videosRes, categoriesRes] = await Promise.all([
			videoService.getAll(null, { page: 1, limit: 1000 }),
			categoryService.getAll()
		])

		const videoRoutes: MetadataRoute.Sitemap = videosRes.data.videos.map(
			video => ({
				url: `${SITE_URL}/v/${video.publicId}`,
				lastModified: video.createdAt,
				changeFrequency: 'weekly',
				priority: 0.7
			})
		)

		const categoryRoutes: MetadataRoute.Sitemap = categoriesRes.data.map(
			category => ({
				url: `${SITE_URL}/category/${category.slug}`,
				changeFrequency: 'weekly',
				priority: 0.6
			})
		)

		return [...staticRoutes, ...categoryRoutes, ...videoRoutes]
	} catch {
		return staticRoutes
	}
}
