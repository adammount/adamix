import { SkeletonLoader } from '@/ui/SkeletonLoader'

export function UploadSkeleton() {
	return (
		<>
			<div className='flex flex-col gap-[16rem]'>
				<SkeletonLoader
					count={1}
					className='h-[64rem] w-full rounded-[24rem]'
				/>
				<SkeletonLoader
					count={1}
					className='h-[160rem] w-full rounded-[24rem]'
				/>
				<SkeletonLoader
					count={1}
					className='h-[120rem] w-full rounded-[24rem]'
				/>
				<SkeletonLoader
					count={1}
					className='h-[64rem] w-full rounded-[24rem]'
				/>
			</div>
			<SkeletonLoader
				count={1}
				className='h-[200rem] w-full rounded-[24rem]'
			/>
		</>
	)
}
