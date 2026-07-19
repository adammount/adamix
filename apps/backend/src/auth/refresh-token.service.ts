import { Injectable } from '@nestjs/common'
import type { Response } from 'express'

@Injectable()
export class RefreshTokenService {
	readonly EXPIRE_DAY_REFRESH_TOKEN = 7
	readonly REFRESH_TOKEN_NAME = 'refreshToken'

	private readonly isProduction = process.env.NODE_ENV === 'production'

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN || 'localhost',
			expires: expiresIn,
			secure: this.isProduction,
			sameSite: this.isProduction ? 'none' : 'lax'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN || 'localhost',
			expires: new Date(0),
			secure: this.isProduction,
			sameSite: this.isProduction ? 'none' : 'lax'
		})
	}
}
