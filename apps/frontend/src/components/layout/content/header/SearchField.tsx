'use client'

import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useRef, useState } from 'react'

import { PAGE } from '@/config/public-page.config'

import { useOutside } from '@/hooks/useOutside'

import { videoService } from '@/services/video.service'

export function SearchField() {
	const router = useRouter()
	const { ref, isShow, setIsShow } = useOutside<HTMLDivElement>(false)

	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedTerm, setDebouncedTerm] = useState('')
	const timer = useRef<ReturnType<typeof setTimeout>>(null)

	const { data } = useQuery({
		queryKey: ['search-suggestions', debouncedTerm],
		queryFn: () => videoService.getAll(debouncedTerm),
		enabled: debouncedTerm.trim().length >= 2,
		select: res => res.data.videos.slice(0, 5)
	})

	const suggestions = data ?? []

	const onChange = (value: string) => {
		setSearchTerm(value)
		setIsShow(true)
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => setDebouncedTerm(value), 300)
	}

	const goToSearch = () => {
		if (searchTerm.trim() === '') return
		router.push(PAGE.SEARCH(searchTerm))
		setIsShow(false)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return
		e.preventDefault()
		goToSearch()
	}

	const isOpen = isShow && !!suggestions.length

	return (
		<div
			ref={ref}
			className='relative min-w-0 max-w-[200rem] flex-1 md:w-[300rem] md:max-w-none md:flex-none'
		>
			<div
				className={cn(
					'transition-base flex h-[36rem] items-center justify-between gap-[8rem] border border-white-15 bg-white-15 px-[14rem] backdrop-blur-[16rem] focus-within:border-brown-light md:h-[44rem] md:px-[12rem]',
					isOpen ? 'rounded-t-[24rem]' : 'rounded-[40rem]'
				)}
			>
				<input
					type='search'
					placeholder='Search curated content...'
					className='h-full w-full bg-transparent text-[13rem] leading-none text-white outline-none placeholder:text-white-60 md:text-[14rem]'
					value={searchTerm}
					onChange={e => onChange(e.target.value)}
					onFocus={() => setIsShow(true)}
					onKeyDown={handleKeyDown}
				/>
				<button
					onClick={goToSearch}
					aria-label='Search'
					className='shrink-0 text-white-60 transition-fast hover-desktop:text-white'
				>
					<Search className='size-[16rem] md:size-[14rem]' />
				</button>
			</div>

			{isOpen && (
				<div className='absolute left-0 top-full z-20 flex w-full flex-col overflow-hidden rounded-b-[24rem] border-x border-b border-white-15 bg-white-15 backdrop-blur-[16rem]'>
					{suggestions.map(video => (
						<button
							key={video.id}
							onClick={() => {
								router.push(PAGE.VIDEO(video.publicId))
								setIsShow(false)
							}}
							className='flex h-[38rem] items-center gap-[8rem] px-[14rem] text-left transition-fast hover-desktop:bg-white-25 md:h-[32rem] md:gap-[6rem] md:px-[12rem]'
						>
							<Search className='size-[12rem] shrink-0 text-white-60 md:size-[10rem]' />
							<span className='line-clamp-1 text-[12rem] text-white-60 md:text-[11rem]'>
								{video.title}
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
