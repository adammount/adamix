'use client'

import dynamic from 'next/dynamic'

import { PageHeading } from '@/ui/PageHeading'
import { Field } from '@/ui/field/Field'

import { useSettings } from './useSettings'

const DynamicSettingsMediaFields = dynamic(() =>
	import('./SettingsMediaFields').then(mod => mod.SettingsMediaFields)
)

export function SettingsForm() {
	const {
		formObject: {
			handleSubmit,
			register,
			formState: { errors },
			control
		},
		isLoading,
		isProfileLoading,
		onSubmit
	} = useSettings()

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<PageHeading className='text-[30rem] md:text-[36rem]'>
				Channel Settings
			</PageHeading>

			{isProfileLoading ? (
				<p className='text-[16rem] text-white-60'>Loading...</p>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-[24rem] rounded-[24rem] border border-white-15 bg-white-15 px-[13rem] py-[17rem] backdrop-blur-[16rem] md:rounded-[40rem] md:p-[25rem]'
				>
					<div className='grid grid-cols-1 gap-[24rem] md:grid-cols-2'>
						<div className='flex flex-col gap-[16rem]'>
							<Field
								label='Email'
								type='email'
								placeholder='Enter email'
								error={errors.email?.message}
								registration={register('email', {
									required: 'Email is required!'
								})}
							/>

							<Field
								label='Password'
								type='password'
								placeholder='Enter password'
								registration={register('password')}
							/>

							<Field
								label='Name'
								type='text'
								placeholder='Enter name'
								registration={register('name')}
							/>

							<Field
								label='Slug (alias)'
								type='text'
								placeholder='Enter slug'
								registration={register('channel.slug')}
							/>

							<label className='flex flex-col gap-[8rem]'>
								<span className='field-label'>Description</span>
								<textarea
									rows={4}
									className='glass-input h-auto resize-none py-[14rem] leading-[22rem]'
									placeholder='Enter description'
									{...register('channel.description')}
								/>
							</label>
						</div>

						<DynamicSettingsMediaFields control={control} />
					</div>

					<button
						type='submit'
						disabled={isLoading}
						className='glass-action self-start px-[17rem] py-[8rem] text-[12rem] md:px-[24rem] md:py-[12rem] md:text-[14rem]'
					>
						{isLoading ? 'Updating...' : 'Update'}
					</button>
				</form>
			)}
		</section>
	)
}
