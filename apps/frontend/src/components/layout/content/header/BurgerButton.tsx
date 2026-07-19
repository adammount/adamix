import { X } from 'lucide-react'

interface Props {
	isShowedSidebar: boolean
	toggleSidebar: () => void
	isMobileMenuOpen: boolean
	toggleMobileMenu: () => void
}

function Burger() {
	return (
		<span className='flex h-[26rem] w-[30rem] flex-col justify-center gap-[5rem] px-[4rem]'>
			<span className='h-[2rem] w-full rounded-full bg-brown-light' />
			<span className='h-[2rem] w-full rounded-full bg-brown-light' />
			<span className='h-[2rem] w-full rounded-full bg-brown-light' />
		</span>
	)
}

function Cross() {
	return (
		<span className='flex h-[26rem] w-[30rem] items-center justify-center'>
			<X
				className='size-[26rem] text-brown-light'
				aria-hidden='true'
			/>
		</span>
	)
}

export function BurgerButton({
	isShowedSidebar,
	toggleSidebar,
	isMobileMenuOpen,
	toggleMobileMenu
}: Props) {
	return (
		<>
			<button
				onClick={toggleSidebar}
				title='Toggle sidebar'
				aria-label='Toggle sidebar'
				aria-expanded={isShowedSidebar}
				className='transition-fast hidden md:block'
			>
				{isShowedSidebar ? <Burger /> : <Cross />}
			</button>

			<button
				onClick={toggleMobileMenu}
				title='Toggle menu'
				aria-label='Toggle menu'
				aria-expanded={isMobileMenuOpen}
				className='transition-fast md:hidden'
			>
				{isMobileMenuOpen ? <Cross /> : <Burger />}
			</button>
		</>
	)
}
