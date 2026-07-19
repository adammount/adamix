import localFont from 'next/font/local'

export const plusJakartaSans = localFont({
	src: [
		{
			path: '../../public/fonts/plus-jakarta-sans-regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/fonts/plus-jakarta-sans-medium.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../../public/fonts/plus-jakarta-sans-semi-bold.woff2',
			weight: '600',
			style: 'normal'
		}
	],
	variable: '--font-jakarta',
	display: 'swap'
})

export const playfairDisplay = localFont({
	src: [
		{
			path: '../../public/fonts/playfair-display-regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../public/fonts/playfair-display-semi-bold.woff2',
			weight: '600',
			style: 'normal'
		}
	],
	variable: '--font-playfair',
	display: 'swap'
})
