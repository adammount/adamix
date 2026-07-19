'use client'

import { useQuery } from '@tanstack/react-query'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { CategoryBanner } from './CategoryBanner'
import { categoryService } from '@/services/category.service'

export function CategoryBannersSection() {
	const { data, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAll()
	})

	const order = ['music', 'gaming', 'news', 'movies']
	const categories = [...(data?.data || [])]
		.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
		.slice(0, 4)

	return (
		<section>
			<div className='-mx-[8rem] flex snap-x snap-mandatory gap-[12rem] overflow-x-auto px-[8rem] scroll-px-[8rem] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-[16rem] md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden'>
				{isLoading ? (
					<SkeletonLoader
						count={4}
						className='h-[172rem] w-[286rem] shrink-0 snap-start rounded-[32rem] md:w-auto'
					/>
				) : (
					categories.map(category => (
						<CategoryBanner
							key={category.id}
							category={category}
						/>
					))
				)}
			</div>
		</section>
	)
}
