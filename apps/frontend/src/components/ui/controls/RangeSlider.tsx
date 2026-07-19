import { memo } from 'react'

import styles from './RangeSlider.module.scss'

interface Props {
	value: number
	onChange: (value: number) => void
	min?: number
	max?: number
	step?: number
	className?: string
}

export const RangeSlider = memo(function RangeSlider({
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	className
}: Props) {
	return (
		<input
			type='range'
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={e => onChange(Number(e.target.value))}
			className={`${styles.range} ${className ?? ''}`}
		/>
	)
})
