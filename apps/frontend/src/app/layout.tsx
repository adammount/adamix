import { type Metadata, type Viewport } from 'next'

import { Providers } from '@/providers/Providers'

import { COLORS } from '@/constants/colors.constants'
import { SITE_NAME, SITE_URL } from '@/constants/constants'

import { playfairDisplay, plusJakartaSans } from './fonts'
import './globals.css'

export const fetchCache = 'default-cache'

export const metadata: Metadata = {
	icons: {
		icon: [
			{ url: '/images/favicon.ico', sizes: 'any' },
			{ url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/images/icon-512.png', sizes: '512x512', type: 'image/png' }
		],
		shortcut: '/images/favicon.ico',
		apple: [{ url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' }]
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		title: SITE_NAME
	},
	title: {
		absolute: `${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best app for video watching',
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: [`info@redvideo.com`],
		images: [
			{
				url: '/images/share.jpg',
				width: 1200,
				height: 630,
				alt: `${SITE_NAME}`
			}
		]
	},
	metadataBase: new URL(SITE_URL),
	applicationName: `${SITE_NAME}`,
	authors: {
		name: 'Max Shushval [RED Group]',
		url: 'https://htmllessons.io'
	},
	manifest: '/manifest.json',
	publisher: 'Max Shushval [RED Group]',
	formatDetection: {
		telephone: false
	}
}

export const viewport: Viewport = {
	themeColor: COLORS.bg,
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}
		>
			<body className={plusJakartaSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
