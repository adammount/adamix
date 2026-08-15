'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { PageHeading } from '@/ui/PageHeading'

import { CreateVideoForm } from './CreateVideoForm'
import { DragNDropVideo } from './DragNDropVideo'
import { ProgressVideoProcessing } from './ProgressVideoProcessing'
import { RecentUploads } from './RecentUploads'
import type { IVideoFormData } from '@/types/studio-video.types'

export function UploadVideoMain() {
	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const [isReadyToPublish, setIsReadyToPublish] = useState(false)

	const router = useRouter()

	const fileName = form.watch('videoFileName')

	return (
		<div className='flex min-h-[calc(100dvh-120rem)] items-center justify-center'>
			<section className='glass-strong relative flex w-full max-w-[672rem] flex-col gap-[20rem] overflow-hidden rounded-[24rem] px-[13rem] py-[17rem] md:gap-[32rem] md:overflow-visible md:rounded-[40rem] md:p-[21rem]'>
				<button
					type='button'
					onClick={() => router.back()}
					title='Close'
					aria-label='Close'
					className='transition-fast hover-desktop:text-white absolute right-[17rem] top-[17rem] z-[1] text-white-60 md:right-[21rem] md:top-[21rem]'
				>
					<X className='size-[20rem]' />
				</button>
				<PageHeading className='pr-[32rem] text-[30rem] text-white md:text-[36rem]'>
					Upload
				</PageHeading>

				{!fileName && <DragNDropVideo reset={form.reset} />}

				{!!fileName && (
					<ProgressVideoProcessing
						isReadyToPublish={isReadyToPublish}
						setIsReadyToPublish={setIsReadyToPublish}
						fileName={fileName}
					/>
				)}

				{!!fileName && (
					<CreateVideoForm
						form={form}
						isReadyToPublish={isReadyToPublish}
					/>
				)}

				{!fileName && <RecentUploads />}
			</section>
		</div>
	)
}
