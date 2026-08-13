import cn from 'clsx'
import { memo } from 'react'

interface Props {
	checked: boolean
	onChange: (checked: boolean) => void
	disabled?: boolean
}

export const Switch = memo(function Switch({ checked, onChange, disabled }: Props) {
	return (
		<button
			type='button'
			role='switch'
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onChange(!checked)}
			className={cn(
				'group transition-fast flex w-[40rem] shrink-0 items-center rounded-full bg-white-15 p-[2.5rem]',
				checked ? 'justify-end' : 'justify-start',
				disabled ? 'cursor-not-allowed opacity-50' : 'hover-desktop:bg-white-25'
			)}
		>
			<span
				className={cn(
					'size-[16rem] rounded-full transition-fast',
					checked ? 'bg-brown-light' : 'bg-white-40'
				)}
			/>
		</button>
	)
})
