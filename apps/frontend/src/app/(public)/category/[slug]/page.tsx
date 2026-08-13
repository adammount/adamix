import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageHeading } from '@/ui/PageHeading'

import { PAGE } from '@/config/public-page.config'

import { CategoryVideos } from './CategoryVideos'
import { categoryService } from '@/services/category.service'

export const revalidate = 100

interface Props {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params

	return {
		title: slug.charAt(0).toUpperCase() + slug.slice(1),
		alternates: {
			canonical: PAGE.CATEGORY(slug)
		}
	}
}

export default async function CategoryPage({ params }: Props) {
	const { slug } = await params

	const data = await categoryService
		.getBySlug(slug, { page: 1, limit: 1 })
		.then(res => res.data)
		.catch(() => null)

	if (!data) return notFound()

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<PageHeading className='text-[30rem] md:text-[36rem]'>{data.category.name}</PageHeading>
			<CategoryVideos slug={slug} />
		</section>
	)
}
