import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/constants/constants'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/auth', '/studio', '/my', '/s']
		},
		sitemap: `${SITE_URL}/sitemap.xml`
	}
}
