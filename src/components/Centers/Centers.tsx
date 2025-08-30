'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Lens } from '@/components/magicui/lens'
import Image from 'next/image'
import { CentersResponse } from '@/types/types'
import { useTranslation } from '@/context/TranslationContext'

interface DashboardProps {
	data: CentersResponse
}
export default function Center({ data }: DashboardProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const { t } = useTranslation()

	return (
		<section className='my-20'>
			<div className='web-container'>
				<div className='grid grid-cols-3 gap-5 max-[940px]:grid-cols-2 max-[660px]:grid-cols-1'>
					{data?.data?.map(item => (
						<Card key={item?.id} className='relative max-w-md max-[660px]:max-w-full shadow-none'>
							<CardHeader>
								<Lens
									zoomFactor={2}
									lensSize={150}
									isStatic={false}
									ariaLabel='Zoom Area'
								>
									<Image
										src={`${apiUrl}/image/${item?.image}`}
										alt='image placeholder'
										width={500}
										height={500}
										className='w-full h-[200px] object-center bg-cover'
									/>
								</Lens>
							</CardHeader>
							<CardContent>
								<CardTitle className='text-2xl'>{item?.name}</CardTitle>
								<CardDescription>
									<address className='not-italic text-sm text-muted-foreground'>
										{item?.address}
									</address>
								</CardDescription>
							</CardContent>
							<CardFooter className='flex justify-between items-center'>
								<Button variant='default' className='cursor-pointer'>{t('learnMore')}...</Button>

								<Button variant='ghost' className='flex items-center space-x-2 cursor-pointer'>
									<span>👍 Like</span>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
