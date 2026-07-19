import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export function AsideSearch({ placeholder = 'Search...', ...props }: Props) {
	return (
		<div className='transition-base flex h-[36rem] w-full items-center justify-between gap-[8rem] rounded-[24rem] border border-white-15 bg-white-15 px-[16rem] backdrop-blur-[16rem] focus-within:border-brown-light md:h-[44rem]'>
			<input
				type='search'
				placeholder={placeholder}
				className='h-full w-full bg-transparent text-[12rem] leading-none text-white outline-none placeholder:text-white-60 md:text-[14rem]'
				{...props}
			/>
			<Search className='size-[12rem] shrink-0 text-white-60' />
		</div>
	)
}
