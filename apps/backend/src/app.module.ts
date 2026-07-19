import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'
import { AuthModule } from './auth/auth.module'
import { getGoogleRecaptchaConfig } from './config/google-recaptcha.config'
import { EmailModule } from './email/email.module'

import { CategoryModule } from './category/category.module'
import { ChannelModule } from './channel/channel.module'
import { MediaModule } from './media/media.module'
import { PlaylistModule } from './playlist/playlist.module'
import { SettingsModule } from './settings/settings.module'
import { UserModule } from './user/user.module'
import { VideoModule } from './video/video.module'
import { WatchHistoryModule } from './watch-history/watch-history.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		GoogleRecaptchaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getGoogleRecaptchaConfig,
			inject: [ConfigService]
		}),
		AuthModule,
		UserModule,
		CategoryModule,
		ChannelModule,
		MediaModule,
		VideoModule,
		EmailModule,
		WatchHistoryModule,
		PlaylistModule,
		SettingsModule
	]
})
export class AppModule {}
