import { Upload } from 'lucide-react'
import { type ChangeEvent, type DragEvent, useState } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { useUpload } from '@/ui/upload-field/useUpload'

import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	reset: UseFormReset<IVideoFormData>
}

export function DragNDropVideo({ reset }: Props) {
	const { uploadFile, isLoading: isUploading } = useUpload({
		// 3gb
		maxFileSize: 3 * 1024 * 1024 * 1024,
		folder: 'videos',
		async onSuccess(data) {
			const file = data[0]
			if (!file) return

			reset({
				videoFileName: file.name,
				maxResolution: file.maxResolution,
				title: file.name
			})

			const { toast } = await import('react-hot-toast')
			toast.success('File uploaded successfully!')
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Failed to upload the video')
		}
	})

	const [isDragging, setIsDragging] = useState(false)

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => setIsDragging(false)

	const handleDrop = (e: DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer.files?.[0]
		if (file) uploadFile({ target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>)
	}

	return isUploading ? (
		<div className='animate-fade-in flex h-[228rem] flex-col items-center justify-center rounded-[20rem] border-2 border-dashed border-brown-light bg-black-60'>
			<p className='text-[14rem] text-white-60'>Uploading...</p>
		</div>
	) : (
		<label
			className={twMerge(
				'flex cursor-pointer flex-col items-center justify-center gap-[16rem] rounded-[16rem] border-2 border-dashed border-brown-light bg-black-60 px-[2rem] py-[42rem] transition-base md:rounded-[20rem] md:p-[42rem]',
				isDragging && 'bg-white-15'
			)}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<Upload className='size-[24rem] text-brown-light md:size-[36rem]' />
			<p className='text-center text-[12rem] text-white md:text-[14rem]'>
				{isDragging ? 'Drop here' : 'Drag and drop files here or click to select'}
			</p>
			<span className='flex h-[28rem] items-center rounded-[8rem] bg-white px-[16rem] text-[12rem] !text-dark-brown md:h-auto md:rounded-[12rem] md:px-[24rem] md:py-[10rem] md:text-[14rem]'>
				Select files to upload
			</span>
			<input
				type='file'
				accept='video/*'
				className='hidden'
				onChange={uploadFile}
			/>
		</label>
	)
}
