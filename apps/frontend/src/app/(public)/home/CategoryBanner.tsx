import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import type { ICategoryWithPreview } from '@/types/category.types'

export function CategoryBanner({ category }: { category: ICategoryWithPreview }) {
	const preview =
		category.videos?.[0]?.thumbnailUrl || `https://picsum.photos/seed/${category.slug}/572/344`

	return (
		<Link
			href={PAGE.CATEGORY(category.slug)}
			className='group relative flex h-[172rem] w-[286rem] shrink-0 snap-start items-center justify-center overflow-hidden rounded-[16rem] md:w-auto md:rounded-[32rem]'
		>
			<Image
				src={preview}
				alt={category.name}
				fill
				sizes='286px'
				className='object-cover transition-transform duration-500 group-hover:scale-110'
			/>
			<div className='relative flex h-[45rem] items-center justify-center rounded-[12rem] border border-white-25 bg-white-15 px-[24rem] backdrop-blur-[8rem] md:h-[66rem] md:w-[188rem] md:rounded-[22rem] md:px-0'>
				<span className='font-heading text-[18rem] font-semibold text-white md:text-[30rem]'>
					{category.name}
				</span>
			</div>
		</Link>
	)
}
