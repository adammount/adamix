import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { MediaController } from './media.controller'
import { MediaService } from './media.service'
import { UploadsController } from './uploads.controller'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(process.cwd(), 'uploads'),
			serveRoot: '/uploads',
			serveStaticOptions: {
				setHeaders: res => {
					res.setHeader('X-Content-Type-Options', 'nosniff')
					res.setHeader('Content-Security-Policy', "default-src 'none'")
				}
			}
		})
	],
	controllers: [MediaController, UploadsController],
	providers: [MediaService]
})
export class MediaModule {}
