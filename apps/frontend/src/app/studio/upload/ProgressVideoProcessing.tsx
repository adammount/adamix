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
			const status = query.state.data?.data.status
			return status === undefined || (status >= 0 && status < 100) ? 3000 : false
		},
		enabled: !!fileName && !isReadyToPublish
	})

	const progress = processingData ?? 0
	const isFailed = progress < 0

	useEffect(() => {
		if (isFailed) {
			setIsReadyToPublish(true)

			const toastError = async () => {
				const { toast } = await import('react-hot-toast')
				toast.error('Video processing failed, quality options may be limited')
			}

			toastError()
			return
		}

		if (progress !== 100) return

		setIsReadyToPublish(true)

		const toastSuccess = async () => {
			const { toast } = await import('react-hot-toast')
			toast.success('Video processed successfully!')
		}

		toastSuccess()
	}, [progress, isFailed, setIsReadyToPublish])

	if (isFailed || progress >= 100) return null

	return (
		<div className='relative flex h-[36rem] w-full items-center justify-center overflow-hidden rounded-[24rem] border border-white-15 bg-white-15'>
			<div
				className='absolute inset-y-0 left-0 animate-pulse bg-gradient-to-r from-white-15 to-brown-light/50 transition-all'
				style={{ width: `${progress}%` }}
			/>
			<span className='relative text-[14rem] font-medium text-white'>
				Processing video ({Math.round(progress)}%)
			</span>
		</div>
	)
}
