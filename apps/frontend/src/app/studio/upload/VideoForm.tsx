import { Controller, type UseFormReturn } from 'react-hook-form'

import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { TagsField } from '@/ui/tags-field/TagsField'
import { UploadField } from '@/ui/upload-field/UploadField'

import { stripHtmlWithBreak } from '@/utils/strip-html'

import { UploadSkeleton } from './UploadSkeleton'
import { VideoFormRightSide } from './VideoFormRightSide'
import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	isPending?: boolean
	form: UseFormReturn<IVideoFormData, unknown, IVideoFormData>
}

export function VideoForm({
	form: {
		formState: { errors },
		control,
		register,
		watch
	},
	isPending
}: Props) {
	return (
		<div className='grid grid-cols-1 gap-[24rem] md:grid-cols-[2.5fr_1fr]'>
			{isPending ? (
				<UploadSkeleton />
			) : (
				<>
					<div className='flex flex-col gap-[16rem]'>
						<Field
							label='Title'
							type='text'
							registration={register('title', { required: 'Title is required!' })}
							error={errors.title?.message}
							placeholder='Enter title:'
						/>

						<Controller
							control={control}
							name='description'
							rules={{ required: 'Description is required!' }}
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<Textarea
									label='Description'
									value={stripHtmlWithBreak(value || '')}
									onChange={e => onChange(e.target.value)}
									error={error?.message}
									placeholder='Enter description:'
									rows={7}
								/>
							)}
						/>

						<Controller
							control={control}
							name='thumbnailUrl'
							rules={{ required: 'Thumbnail is required!' }}
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<UploadField
									label='Thumbnail'
									onChange={onChange}
									value={value}
									error={error}
									folder='thumbnails'
									sizePreview={[151, 82]}
								/>
							)}
						/>

						<Controller
							control={control}
							name='tags'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<TagsField
									label='Tags'
									onTagsChange={onChange}
									tags={value}
									error={error?.message}
								/>
							)}
						/>
					</div>

					<VideoFormRightSide watch={watch} />
				</>
			)}
		</div>
	)
}
