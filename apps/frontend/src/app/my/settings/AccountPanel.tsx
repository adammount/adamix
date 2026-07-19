'use client'

import { AtSign, Lock, Upload, UserRound } from 'lucide-react'
import { useId } from 'react'

import { SettingsField } from '@/ui/controls/SettingsField'

import { useUpload } from '@/ui/upload-field/useUpload'

import { SettingsPanel } from './SettingsPanel'
import { SettingsRow } from './SettingsRow'
import { useAccountSettings } from './useAccountSettings'

export function AccountPanel() {
	const { profile, save, saveAvatar } = useAccountSettings()
	const uploadId = useId()

	const { uploadFile, isLoading } = useUpload({
		folder: 'avatars',
		onChange: saveAvatar
	})

	return (
		<SettingsPanel title='Account'>
			<SettingsRow
				icon={UserRound}
				label='Profile Picture'
			>
				<label
					htmlFor={uploadId}
					className='transition-base flex h-[36rem] cursor-pointer items-center gap-[8rem] rounded-[24rem] border border-white-15 bg-white-15 px-[17rem] text-[12rem] text-white-60 hover-desktop:bg-white-25 hover-desktop:text-white md:px-[21rem] md:text-[14rem]'
				>
					<Upload className='size-[12rem]' />
					{isLoading ? 'Uploading...' : 'Upload'}
				</label>
				<input
					id={uploadId}
					type='file'
					accept='image/*'
					onChange={uploadFile}
					className='hidden'
				/>
			</SettingsRow>

			<SettingsRow
				icon={UserRound}
				label='Username'
			>
				<SettingsField
					key={`name-${profile?.id}`}
					defaultValue={profile?.name ?? ''}
					onBlur={e => {
						const value = e.target.value
						if (value !== profile?.name) save({ name: value })
					}}
					placeholder='Your name'
				/>
			</SettingsRow>

			<SettingsRow
				icon={AtSign}
				label='Email'
			>
				<SettingsField
					key={`email-${profile?.id}`}
					type='email'
					defaultValue={profile?.email ?? ''}
					onBlur={e => {
						const value = e.target.value
						if (value !== profile?.email) save({ email: value })
					}}
					placeholder='your@email.com'
				/>
			</SettingsRow>

			<SettingsRow
				icon={Lock}
				label='Password'
			>
				<SettingsField
					type='password'
					onBlur={e => {
						const value = e.target.value
						if (!value) return
						save({ password: value })
						e.target.value = ''
					}}
					placeholder='New password'
				/>
			</SettingsRow>
		</SettingsPanel>
	)
}
