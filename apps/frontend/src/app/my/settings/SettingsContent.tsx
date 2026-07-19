'use client'

import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { useIsClient } from '@/hooks/useIsClient'
import { useUserSettings } from '@/hooks/useUserSettings'

import { AccountPanel } from './AccountPanel'
import { NotificationsPanel } from './NotificationsPanel'
import { PlaybackPanel } from './PlaybackPanel'
import { PrivacyPanel } from './PrivacyPanel'

export function SettingsContent() {
	const isClient = useIsClient()
	const { settings, isLoading, update } = useUserSettings()

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<PageHeading className='text-[30rem] md:text-[36rem]'>Settings</PageHeading>

			{!isClient || isLoading || !settings ? (
				<div className='grid grid-cols-1 gap-[20rem] md:grid-cols-2'>
					<SkeletonLoader
						count={2}
						className='h-[280rem] w-full rounded-[24rem] md:h-[340rem] md:rounded-[40rem]'
					/>
					<SkeletonLoader
						count={2}
						className='h-[280rem] w-full rounded-[24rem] md:h-[340rem] md:rounded-[40rem]'
					/>
				</div>
			) : (
				<div className='grid grid-cols-1 items-start gap-[20rem] md:grid-cols-2'>
					<div className='flex flex-col gap-[20rem]'>
						<AccountPanel />
						<PrivacyPanel
							profileVisibility={settings.profileVisibility}
							watchHistory={settings.watchHistory}
							activityStatus={settings.activityStatus}
							update={update}
						/>
					</div>
					<div className='flex flex-col gap-[20rem]'>
						<NotificationsPanel
							emailNotifications={settings.emailNotifications}
							pushNotifications={settings.pushNotifications}
							newVideoAlerts={settings.newVideoAlerts}
							commentMentions={settings.commentMentions}
							frequency={settings.frequency}
							update={update}
						/>
						<PlaybackPanel
							defaultQuality={settings.defaultQuality}
							autoplay={settings.autoplay}
							language={settings.language}
							dataSaver={settings.dataSaver}
							bufferSize={settings.bufferSize}
							update={update}
						/>
					</div>
				</div>
			)}
		</section>
	)
}
