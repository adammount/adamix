import { Play } from 'lucide-react'

export function PlayOverlay() {
	return (
		<span className='absolute inset-0 flex items-center justify-center'>
			<span className='flex size-[64rem] items-center justify-center rounded-full bg-black-60 backdrop-blur-[8rem]'>
				<Play className='size-[24rem] text-white' />
			</span>
		</span>
	)
}
