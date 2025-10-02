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
import { Input } from '@/components/ui/input'
import { MdErrorOutline } from 'react-icons/md'

interface DashboardProps {
	data: CentersResponse
	token: string | undefined
	like: LikeResponse
}
export default function Center({ data, token }: DashboardProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const { t } = useTranslation()
	const [dataLength, setDataLength] = useState<boolean>(true)
	const [search, setSearch] = useState<string>('')
	const [centers, setCenters] = useState<CentersResponse['data']>(
		data?.data || []
	)

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
			const res = await axios.post(
				`${apiUrl}/liked`,
				{ centerId: id },
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			const newLike = res.data

			setCenters(prev =>
				prev.map(center =>
					center.id === id
						? { ...center, likes: [...center.likes, newLike] }
						: center
				)
			)

			toast.success(t('centerLiked'))
		} catch (err) {
			console.log(err)
			toast.error(t('error_API'))
		}
	}

	const handleUnLike = async (likeId: number, centerId: number) => {
		try {
			await axios.delete(`${apiUrl}/liked/${likeId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			setCenters(prev =>
				prev.map(center =>
					center.id === centerId
						? { ...center, likes: center.likes.filter(l => l.id !== likeId) }
						: center
				)
			)

			toast.success(t('centerUnliked'))
		} catch (err) {
			console.log(err)
			toast.error(t('error_API'))
		}
	}

	const filteredData = centers?.filter(
		item =>
			item?.name.toLowerCase().includes(search.toLowerCase()) ||
			item?.address.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<section className='my-5'>
			<div className='web-container'>
				<h1 className='text-[40px] text-center mb-5 max-[580px]:text-3xl'>
					{t('heroTitle')}
				</h1>
				<div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-5 w-full'>
					<Input
						placeholder={t('search_placeholder')}
						className='w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-base shadow-sm 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
             placeholder-gray-400 transition'
						onChange={e => setSearch(e.target.value)}
					/>
				</div>

				<div
					className={`${
						dataLength
							? 'grid grid-cols-3 max-[1024px]:grid-cols-2 max-[650px]:grid-cols-1'
							: 'flex items-center justify-center max-[680px]:flex-col'
					} gap-6 w-full`}
				>
					{filteredData && filteredData.length > 0 ? (
						filteredData?.map(item => (
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
										likeItem => likeItem?.id === item?.id
									) ? (
										<div
											onClick={() => {
												const currentLike = item?.likes?.find(
													likeItem => likeItem.userId === item?.id
												)
												if (currentLike) handleUnLike(currentLike.id, item.id)
											}}
											className='w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center cursor-pointer bg-red-100 hover:bg-red-200'
										>
											<IoHeartDislikeSharp className='text-[20px] text-red-600' />
										</div>
									) : (
										<div
											onClick={() => handleLike(item?.id)}
											className='w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100'
										>
											<GoHeart className='text-[20px]' />
										</div>
									)}
								</CardFooter>
							</Card>
						))
					) : (
						<div className='w-full'>
							<div
								role='alert'
								aria-live='assertive'
								className='max-w-md mx-auto bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-4 flex items-start gap-3'
							>
								<MdErrorOutline className='text-red-600 dark:text-red-100 text-2xl mt-0.5' />
								<div>
									<p className='text-lg font-semibold text-red-700 dark:text-red-100'>
										{t('data__error')}
									</p>
									<p className='text-sm text-red-600 dark:text-red-200/80 mt-1'>
										{t('error_data')}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
