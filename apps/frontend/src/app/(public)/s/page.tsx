import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { SearchContent } from './SearchContent'

export const metadata: Metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}

export default function SearchPage() {
	return (
		<Suspense>
			<SearchContent />
		</Suspense>
	)
}
