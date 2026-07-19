import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SITE_URL } from '@/constants/constants'

import { stripHtml } from '@/utils/strip-html'

import { SingleVideo } from './SingleVideo'
import { videoService } from '@/services/video.service'
import type { TPagePublicIdProp } from '@/types/page.types'

export const revalidate = 100

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
	const publicId = (await params).publicId
	const video = await videoService
		.byPublicId(publicId)
		.then(res => res.data)
		.catch(() => null)

	if (!video) return {}

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export default async function VideoPage({ params }: TPagePublicIdProp) {
	const publicId = (await params).publicId
	const video = await videoService
		.byPublicId(publicId)
		.then(res => res.data)
		.catch(() => null)

	if (!video) notFound()

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: video.title,
		description: stripHtml(video.description).slice(0, 300),
		thumbnailUrl: video.thumbnailUrl,
		uploadDate: video.createdAt,
		contentUrl: `${SITE_URL}/v/${video.publicId}`,
		embedUrl: `${SITE_URL}/v/${video.publicId}`,
		interactionStatistic: {
			'@type': 'InteractionCounter',
			interactionType: 'https://schema.org/WatchAction',
			userInteractionCount: video.viewsCount
		}
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<SingleVideo video={video} />
		</>
	)
}
