'use client'

import { Trash2 } from 'lucide-react'

import { AsideSearch } from '@/ui/playlist-aside/AsideSearch'
import { PlaylistAside } from '@/ui/playlist-aside/PlaylistAside'

interface Props {
	count: number
	searchTerm: string
	onSearch: (value: string) => void
	onClear: () => void
	isClearing: boolean
}

export function HistoryControlsAside({ count, searchTerm, onSearch, onClear, isClearing }: Props) {
	return (
		<PlaylistAside
			title='History controls'
			subtitle={`${count} videos`}
		>
			<AsideSearch
				placeholder='Search curated content...'
				value={searchTerm}
				onChange={e => onSearch(e.target.value)}
			/>
			<span className='divider' />
			<button
				onClick={onClear}
				disabled={isClearing}
				className='flex h-[36rem] items-center gap-[12rem] self-start rounded-[24rem] border border-white-15 bg-white-15 px-[17rem] text-[12rem] text-white-60 backdrop-blur-[8rem] transition-fast hover-desktop:text-white disabled-state md:h-[44rem] md:w-full md:justify-between md:gap-0 md:self-auto md:px-[17rem] md:text-[14rem]'
			>
				<span>Clear all watch history</span>
				<Trash2 className='size-[12rem] shrink-0 md:size-[14rem]' />
			</button>
		</PlaylistAside>
	)
}
