'use server'

import { API_URL, SITE_URL } from '@/constants/constants'

import type { IUser } from '@/types/user.types'

interface IAuthResponse {
	user: IUser
	accessToken: string
}

export async function getNewTokensByRefresh(refreshToken: string) {
	const serverUrl = process.env.SERVER_URL
	const baseUrl = serverUrl ? `${serverUrl}/api` : API_URL
	const origin = process.env.CLIENT_URL || SITE_URL

	const response = await fetch(`${baseUrl}/auth/access-token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `refreshToken=${refreshToken}`,
			Origin: origin
		},
		credentials: 'include'
	})

	if (!response.ok) {
		throw new Error('Failed to fetch new tokens')
	}

	const data: IAuthResponse = await response.json()
	return data
}
