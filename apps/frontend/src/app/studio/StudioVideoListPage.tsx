'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { STUDIO_PAGE } from '@/config/studio-page'

const DynamicStudioVideoList = dynamic(
	() => import('./StudioVideoList').then(mod => mod.StudioVideoList),
	{
		ssr: false,
		loading: () => (
			<div className='flex flex-col gap-[12rem]'>
				<SkeletonLoader
					count={3}
					className='h-[260rem] w-full rounded-[20rem] md:h-[140rem] md:rounded-[28rem]'
				/>
			</div>
		)
	}
)

export function StudioVideoListPage() {
	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<div className='flex items-center justify-between gap-[16rem]'>
				<PageHeading className='text-[30rem] md:text-[36rem]'>Content</PageHeading>
				<Link
					href={STUDIO_PAGE.UPLOAD_VIDEO}
					className='glass-action flex shrink-0 items-center gap-[8rem] px-[17rem] py-[8rem] text-[12rem] md:px-[24rem] md:py-[12rem] md:text-[14rem]'
				>
					<Plus className='size-[14rem] md:size-[16rem]' />
					Upload video
				</Link>
			</div>
			<DynamicStudioVideoList />
		</section>
	)
}
