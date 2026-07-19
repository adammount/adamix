import { ChevronDown } from 'lucide-react'
import { memo } from 'react'

interface Option {
	label: string
	value: string
}

interface Props {
	value: string
	onChange: (value: string) => void
	options: Option[]
	className?: string
}

export const Select = memo(function Select({ value, onChange, options, className }: Props) {
	return (
		<div className='relative w-[140rem] md:w-[256rem]'>
			<select
				value={value}
				onChange={e => onChange(e.target.value)}
				className={`transition-base h-[36rem] w-full cursor-pointer appearance-none rounded-[24rem] border border-white-15 bg-white-15 px-[17rem] pr-[36rem] text-[12rem] text-white outline-none backdrop-blur-[8rem] hover-desktop:border-brown-light focus:border-brown-light md:text-[14rem] ${className ?? ''}`}
			>
				{options.map(option => (
					<option
						key={option.value}
						value={option.value}
						className='bg-dark-brown text-white'
					>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDown className='pointer-events-none absolute right-[17rem] top-1/2 size-[11rem] -translate-y-1/2 text-white' />
		</div>
	)
})
