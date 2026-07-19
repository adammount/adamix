import type { Metadata } from 'next'

import { CategoryBannersSection } from './home/CategoryBannersSection'
import { RecommendedSection } from './home/RecommendedSection'
import { TrendingSection } from './home/TrendingSection'
import { videoService } from '@/services/video.service'

export const revalidate = 100

export const metadata: Metadata = {
	title: 'Home',
	description: 'Best video platform',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: 'RED Video'
	}
}

export default async function Home() {
	const trendingVideos = await videoService
		.getTrendingVideos()
		.then(res => res.data.slice(0, 8))
		.catch(() => [])

	return (
		<div className='flex flex-col gap-[20rem] md:gap-[24rem]'>
			<TrendingSection videos={trendingVideos} />
			<CategoryBannersSection />
			<RecommendedSection />
		</div>
	)
}
