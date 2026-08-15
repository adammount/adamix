import { useQuery } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useEffect } from 'react'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { fileService } from '@/services/studio/file.service'

interface Props {
	fileName: string
	isReadyToPublish: boolean
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
}

export function ProgressVideoProcessing({
	fileName,
	setIsReadyToPublish,
	isReadyToPublish
}: Props) {
	const { data: processingData } = useQuery({
		queryKey: QUERY_KEYS.PROCESSING_VIDEO(fileName),
		queryFn: () => fileService.getProcessingStatus(fileName),
		select(data) {
			return data.data.status
		},
		refetchInterval: query => {
			const queryProgress = query.state.data?.data
			return queryProgress !== undefined && queryProgress.status < 100 ? 3500 : false
		},
		enabled: !!fileName && !isReadyToPublish
	})

	const progress = processingData ?? 0

	useEffect(() => {
		if (progress !== 100) return

		setIsReadyToPublish(true)

		const toastSuccess = async () => {
			const { toast } = await import('react-hot-toast')
			toast.success('Video processed successfully!')
		}

		toastSuccess()
	}, [progress, setIsReadyToPublish])

	return (
		progress > 0 && (
			<div className='relative flex h-[36rem] w-full items-center justify-center overflow-hidden rounded-[24rem] border border-white-15 bg-white-15'>
				<div
					className='absolute inset-y-0 left-0 animate-pulse bg-gradient-to-r from-white-15 to-brown-light/50 transition-all'
					style={{
						width: progress ? `${progress}%` : 0
					}}
				/>
				<span className='relative text-[14rem] font-medium text-white'>
					Processing video ({Math.round(progress)}%)
				</span>
			</div>
		)
	)
}
