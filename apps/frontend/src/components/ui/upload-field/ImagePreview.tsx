import Image from 'next/image'

import { SkeletonLoader } from '../SkeletonLoader'

interface Props {
	isLoading: boolean
	value?: string
	overlay?: string
	sizePreview?: [number, number]
}

export function ImagePreview({
	isLoading,
	overlay,
	value,
	sizePreview = [100, 100]
}: Props) {
	const [width, height] = sizePreview
	const size = {
		width: `${width}rem`,
		maxWidth: '100%',
		aspectRatio: `${width} / ${height}`
	}

	return (
		<div>
			{isLoading ? (
				<SkeletonLoader
					className='rounded-[20rem]'
					style={size}
				/>
			) : (
				!!value && (
					<div
						className='relative overflow-hidden rounded-[20rem]'
						style={size}
					>
						<Image
							alt='Uploaded file'
							className='object-cover'
							src={value}
							fill
							priority
						/>
						{!!overlay && (
							<Image
								alt='Overlay'
								className='z-[1] object-cover'
								src={overlay}
								fill
								priority
							/>
						)}
					</div>
				)
			)}
		</div>
	)
}
