import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { LikedVideosContent } from './LikedVideosContent'

export const metadata: Metadata = {
	title: 'Liked videos',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <LikedVideosContent />
}
