'use client'

import { CentersResponse1, Filial } from '@/types/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Lens } from '../magicui/lens'
import Image from 'next/image'

interface DashboardProps {
	data: CentersResponse1
	filial: Filial[]
}

export default function CenterDetails({ data, filial }: DashboardProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	console.log('Center', data)
	console.log('Filials', filial)

	return (
		<section className='w-full h-screen'>
			<div className='web-container pt-[20px]'>
				<div className=''>
					<Card key={data?.data?.id}>
						<CardHeader>
							<Lens
								zoomFactor={2}
								lensSize={150}
								isStatic={false}
								ariaLabel='Zoom Area'
							>
								<Image
									src={`${apiUrl}/image/${data?.data?.image}`}
									alt='image placeholder'
									width={500}
									height={500}
									quality={100}
									className='w-full h-[200px] object-cover'
								/>
							</Lens>
						</CardHeader>
						<CardContent>
							<CardTitle>Biznining filiallarimiz</CardTitle>
							{/* {filial?.map(item => (
								<CardContent key={item?.id} className='border-2 px-[15px] py-[8px] rounded-[10px]'>
									<CardTitle className='text-[18px]'>{item?.name}</CardTitle>
									<p>{`${item?.region}`}</p>
								</CardContent>
							))} */}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}
