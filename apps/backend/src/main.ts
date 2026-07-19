import { RequestMethod, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { IS_DEV_ENV } from './utils/is-dev.util'

async function bootstrap() {
	if (!process.env.JWT_SECRET) {
		throw new Error('JWT_SECRET is not set')
	}

	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.enableShutdownHooks()

	app.setGlobalPrefix('api', {
		exclude: [{ path: 'verify-email', method: RequestMethod.GET }]
	})

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(helmet({ contentSecurityPolicy: IS_DEV_ENV ? false : undefined }))
	app.use(cookieParser())

	app.enableCors({
		origin: process.env.CLIENT_URL || 'http://localhost:3000',
		credentials: true
	})

	app.disable('x-powered-by')

	await app.listen(process.env.PORT || 4200)
}
bootstrap()
