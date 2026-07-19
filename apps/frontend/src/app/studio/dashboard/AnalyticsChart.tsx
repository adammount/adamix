'use client'

import { useId } from 'react'

const Y_LABELS = ['30K', '1.5K', '40K', '20K', '0']

export function AnalyticsChart() {
	const gradientId = useId()

	return (
		<div className='relative h-[249rem] w-full'>
			<div className='absolute bottom-[24rem] left-0 top-0 flex flex-col justify-between text-[10rem] font-semibold text-white'>
				{Y_LABELS.map((label, i) => (
					<span key={i}>{label}</span>
				))}
			</div>

			<div className='absolute inset-y-[8rem] left-[32rem] right-0 flex flex-col justify-between'>
				{[0, 1, 2, 3, 4].map(i => (
					<div
						key={i}
						className='h-[1rem] w-full rounded-full border-b border-white-15'
					/>
				))}
			</div>

			<svg
				viewBox='0 0 282 131'
				preserveAspectRatio='none'
				className='absolute inset-y-[8rem] left-[32rem] right-0 h-[calc(100%-32rem)] w-[calc(100%-32rem)]'
			>
				<defs>
					<linearGradient
						id={gradientId}
						x1='0'
						y1='0'
						x2='282'
						y2='0'
						gradientUnits='userSpaceOnUse'
					>
						<stop stopColor='#60A5FA' />
						<stop
							offset='1'
							stopColor='#D99A7A'
						/>
					</linearGradient>
				</defs>
				<path
					d='M3 127.8C21.4 65.4 39.8 55 58.2 96.6C76.6 138.2 95 127.8 113.4 65.4C131.8 3 150.2 -12.6 168.6 18.6C187 49.8 205.4 60.2 223.8 49.8C242.2 39.4 260.6 31.6 279 26.4'
					stroke={`url(#${gradientId})`}
					strokeWidth='6'
					strokeLinecap='round'
					fill='none'
					vectorEffect='non-scaling-stroke'
				/>
			</svg>

			<div className='absolute bottom-0 left-[32rem] right-0 flex justify-between pt-[8rem] text-[10rem] font-semibold text-white'>
				<span>0</span>
				<span>14</span>
				<span>28 days</span>
			</div>
		</div>
	)
}
