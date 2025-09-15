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
import { CentersResponse, LikeResponse } from '@/types/types'
import { useTranslation } from '@/context/TranslationContext'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GoHeart } from 'react-icons/go'
import { IoHeartDislikeSharp } from 'react-icons/io5'
import Link from 'next/link'

interface DashboardProps {
	data: CentersResponse
	token: string | undefined
	like: LikeResponse
}
export default function Center({ data, token }: DashboardProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const { t } = useTranslation()
	const [dataLength, setDataLength] = useState<boolean>(true)

	useEffect(() => {
		if (data) {
			if (data?.data?.length < 3) {
				setDataLength(false)
			} else {
				setDataLength(true)
			}
		}
	}, [data])

	const handleLike = async (id: number) => {
		try {
			await axios.post(
				`${apiUrl}/liked`,
				{ centerId: id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			toast.success(t('centerLiked'))
		} catch (err: unknown) {
			console.log(err)
			toast.error(t('error_API'))
		}
	}

	const handleUnLike = async (likeId: number) => {
		try {
			await axios.delete(`${apiUrl}/liked/${likeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			toast.success(t('centerUnliked'))
		} catch (err: unknown) {
			console.log(err)
			toast.error(t('error_API'))
		}
	}

	return (
		<section className='my-20'>
			<div className='web-container'>
				<div
					className={`${
						dataLength
							? 'grid grid-cols-3 max-[1024px]:grid-cols-2 max-[650px]:grid-cols-1'
							: 'flex items-center justify-center max-[680px]:flex-col'
					} gap-6 w-full`}
				>
					{data?.data?.map(item => (
						<Card
							key={item?.id}
							className={`relative ${
								dataLength ? 'max-[1024px]:max-w-full' : ''
							} w-full max-w-[440px] max-[680px]:max-w-full shadow-none`}
						>
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
										quality={100}
										className='w-full h-[200px] object-cover'
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
								<Link href={`/dashboard/centers/${item?.id}`}>
									<Button variant='default' className='cursor-pointer'>
										{t('learnMore')}...
									</Button>
								</Link>

								{item?.likes?.some(
									likeItem => likeItem?.centerId === item?.id
								) ? (
									<>
										{item?.likes?.map(likeData => (
											<div
												key={likeData?.id}
												onClick={() => handleUnLike(likeData?.id)}
												className='w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center cursor-pointer'
											>
												<IoHeartDislikeSharp className='text-[20px]' />
											</div>
										))}
									</>
								) : (
									<div
										onClick={() => handleLike(item?.id)}
										className='w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center cursor-pointer'
									>
										<GoHeart className='text-[20px]' />
									</div>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
