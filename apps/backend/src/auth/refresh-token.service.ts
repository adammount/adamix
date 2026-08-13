import { Injectable } from '@nestjs/common'
import type { Response } from 'express'

@Injectable()
export class RefreshTokenService {
	readonly EXPIRE_DAY_REFRESH_TOKEN = 7
	readonly REFRESH_TOKEN_NAME = 'refreshToken'

	private readonly isProduction = process.env.NODE_ENV === 'production'

	private get cookieOptions() {
		const domain = process.env.COOKIE_DOMAIN

		return {
			httpOnly: true,
			secure: this.isProduction,
			sameSite: (this.isProduction ? 'none' : 'lax') as 'none' | 'lax',
			path: '/',
			...(domain ? { domain } : {})
		}
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			...this.cookieOptions,
			expires: expiresIn
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			...this.cookieOptions,
			expires: new Date(0)
		})
	}
}
