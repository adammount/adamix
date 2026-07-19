import { PlaylistContent } from './PlaylistContent'
import type { TPageIdProp } from '@/types/page.types'

export default async function Page({ params }: TPageIdProp) {
	const id = (await params).id

	return <PlaylistContent id={id} />
}
