'use client'

import { useState } from 'react'

import { ChannelAbout } from './ChannelAbout'
import { ChannelHeader } from './ChannelHeader'
import { ChannelHome } from './ChannelHome'
import { ChannelPlaylistsTab } from './ChannelPlaylistsTab'
import { ChannelTabs, type ChannelTab } from './ChannelTabs'
import { ChannelVideosTab } from './ChannelVideosTab'

import type { IChannelDetail } from '@/types/channel.types'

export function ChannelContent({ channel }: { channel: IChannelDetail }) {
	const [tab, setTab] = useState<ChannelTab>('home')

	return (
		<section className='flex flex-col gap-[16rem]'>
			<ChannelHeader channel={channel} />
			<ChannelTabs
				active={tab}
				onChange={setTab}
			/>
			<span className='divider' />

			{tab === 'home' && <ChannelHome videos={channel.videos} />}
			{tab === 'videos' && <ChannelVideosTab channelId={channel.id} />}
			{tab === 'playlists' && (
				<ChannelPlaylistsTab playlists={channel.playlists} />
			)}
			{tab === 'about' && <ChannelAbout channel={channel} />}
		</section>
	)
}
