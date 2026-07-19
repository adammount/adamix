import cn from 'clsx'
import type { Dispatch, SetStateAction } from 'react'

interface Props {
	isLogin: boolean
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

export function SwitchAuth({ isLogin, setIsLogin }: Props) {
	return (
		<div className='flex gap-[8rem] rounded-[24rem] glass p-[4rem]'>
			<button
				type='button'
				onClick={() => setIsLogin(true)}
				className={cn(
					'flex-1 rounded-[20rem] py-[8rem] text-[14rem] font-medium transition-base',
					isLogin ? 'bg-white-25 text-white' : 'text-white-60 hover-desktop:text-white'
				)}
			>
				Login
			</button>
			<button
				type='button'
				onClick={() => setIsLogin(false)}
				className={cn(
					'flex-1 rounded-[20rem] py-[8rem] text-[14rem] font-medium transition-base',
					!isLogin ? 'bg-white-25 text-white' : 'text-white-60 hover-desktop:text-white'
				)}
			>
				Register
			</button>
		</div>
	)
}
