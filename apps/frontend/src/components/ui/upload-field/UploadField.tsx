import cn from 'clsx'
import { UploadCloud } from 'lucide-react'
import { useId } from 'react'
import type { FieldError } from 'react-hook-form'

import { ImagePreview } from './ImagePreview'
import { useUpload } from './useUpload'

interface Props {
	folder?: string
	value?: string
	onChange: (url: string) => void
	label: string
	error?: FieldError
	className?: string
	isImage?: boolean
	overlay?: string
	sizePreview?: [number, number]
}

export function UploadField({
	label,
	onChange,
	className,
	error,
	folder,
	isImage = true,
	value,
	overlay,
	sizePreview
}: Props) {
	const { isLoading, uploadFile } = useUpload({ onChange, folder })
	const inputId = useId()

	return (
		<div className={cn('flex flex-col gap-[12rem]', className)}>
			<label
				htmlFor={inputId}
				className='block text-[12rem] text-white-60'
			>
				{label}
			</label>

			<label
				htmlFor={inputId}
				className='flex w-max cursor-pointer items-center gap-[8rem] rounded-[24rem] border border-white-15 bg-white-15 px-[17rem] py-[8rem] text-[12rem] text-white backdrop-blur-[8rem] transition-base hover-desktop:bg-white-25 md:px-[21rem] md:py-[10rem] md:text-[14rem]'
			>
				<UploadCloud className='size-[14rem] md:size-[16rem]' />
				Upload
			</label>

			<input
				id={inputId}
				type='file'
				onChange={uploadFile}
				accept='image/*'
				className='hidden'
			/>
			{error && <p className='text-[12rem] text-pinq-60'>{error.message}</p>}

			{isImage && (
				<ImagePreview
					isLoading={isLoading}
					overlay={overlay}
					value={value}
					sizePreview={sizePreview}
				/>
			)}
		</div>
	)
}
