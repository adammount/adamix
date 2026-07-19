import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export function SettingsField({ className, ...props }: Props) {
	return (
		<input
			className={cn(
				'glass-input h-[36rem] w-[160rem] max-w-full px-[16rem] text-[12rem] text-white-60 focus:text-white md:h-[44rem] md:w-[256rem] md:px-[20rem] md:text-[14rem]',
				className
			)}
			{...props}
		/>
	)
}
