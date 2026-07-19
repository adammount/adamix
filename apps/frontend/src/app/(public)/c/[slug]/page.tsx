import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ChannelContent } from './ChannelContent'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

export const revalidate = 100

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const slug = (await params).slug
	const channel = await channelService
		.bySlug(slug)
		.then(res => res.data)
		.catch(() => null)

	if (!channel) return {}

	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	}
}

export default async function Page({ params }: TPageSlugProp) {
	const slug = (await params).slug
	const channel = await channelService
		.bySlug(slug)
		.then(res => res.data)
		.catch(() => null)

	if (!channel) notFound()

	return <ChannelContent channel={channel} />
}
