'use client'

import { CentersResponse1 } from '@/types/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Lens } from '../magicui/lens'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { FaLocationCrosshairs, FaPhone, FaStar } from 'react-icons/fa6'
import Link from 'next/link'
import { Label } from '../ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { useTranslation } from '@/context/TranslationContext'
import { toast } from 'react-toastify'

interface DashboardProps {
	data: CentersResponse1
	token: string | undefined
}

export default function CenterDetails({ data, token }: DashboardProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const { t } = useTranslation()
	const [rating, setRating] = useState<number>(0)
	const [text, setText] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setLoading(true)

		if (rating === 0 || text.trim() === '') {
			toast.error(t('comment_error') || 'Please provide a rating')
			setLoading(false);
			return
		}

		try {
			await axios.post(
				`${apiUrl}/comments`,
				{ star: rating, text, centerId: data?.data?.id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)
			toast.success(t('comment_success') || 'Comment added successfully')
			setLoading(false);
		} catch (err: unknown) {
			setLoading(false);
			console.log(err);
			toast.error(t('comment_error') || 'Error occurred while adding comment')
		}
	}

	return (
		<section className='w-full py-10 bg-white dark:bg-black'>
			<div className='web-container space-y-12'>
				<Card className='overflow-hidden rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800'>
					<div className='flex flex-col md:flex-row'>
						<CardHeader className='pl-6 md:w-1/2'>
							<Lens
								zoomFactor={2}
								lensSize={150}
								isStatic={false}
								ariaLabel='Zoom Area'
							>
								<Image
									src={`${apiUrl}/image/${data?.data?.image}`}
									alt={data?.data?.name || 'Image placeholder'}
									width={600}
									height={400}
									quality={100}
									className='w-full h-[360px] object-cover'
								/>
							</Lens>

							<div className='mt-5'>
								<p className='text-xl font-semibold mb-3'>{t('filials')}</p>
								{data?.data?.filials?.length ? (
									<div className='flex items-center gap-2 flex-wrap'>
										{data?.data?.filials?.map(item => (
											<div
												className='bg-muted p-[10px] w-[200px] rounded-2xl flex items-center gap-2'
												key={item?.id}
											>
												<Lens
													zoomFactor={2}
													lensSize={150}
													isStatic={false}
													ariaLabel='Zoom Area'
												>
													<Image
														src={`${apiUrl}/image/${item?.image}`}
														alt={item?.name || 'Image placeholder'}
														width={200}
														height={200}
														quality={100}
														className='w-[60px] h-[50px] rounded-full'
													/>
												</Lens>

												<div className=''>
													<p className='text-lg font-semibold mt-2 line-clamp-1'>
														{item?.name}
													</p>
													<p className='text-sm text-gray-400 line-clamp-1'>
														{item?.address}
													</p>
												</div>
											</div>
										))}
									</div>
								) : (
									<p className='text-gray-400'>{t('data__error')}.</p>
								)}
							</div>

							<div className='mt-5'>
								<p className='text-xl font-semibold mb-3'>{t('major')}</p>
								{data?.data?.majors?.length ? (
									<div className='flex items-center gap-2 flex-wrap'>
										{data?.data?.majors?.map(item => (
											<div
												className='bg-muted p-2 px-4 rounded-2xl'
												key={item?.id}
											>
												<p className='text-md font-medium line-clamp-1'>
													{item?.name}
												</p>
											</div>
										))}
									</div>
								) : (
									<p className='text-gray-400'>{t('data__error')}.</p>
								)}
							</div>
						</CardHeader>
						<CardContent className='w-1/2'>
							<div className='mb-5'>
								<CardTitle className='text-3xl capitalize font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2'>
									{data?.data?.name}
								</CardTitle>
								<p className='text-neutral-400 dark:text-neutral-400 flex items-center gap-2 underline'>
									<FaLocationCrosshairs />
									{data?.data?.address}
								</p>
								<Link href='tel:${data?.data?.phone}'>
									<p className='text-neutral-400 dark:text-neutral-400 flex items-center gap-2 underline'>
										<FaPhone />
										{data?.data?.phone}
									</p>
								</Link>
							</div>

							<form onSubmit={handleSubmit} className='w-full'>
								<Label htmlFor='comments' className='mb-1.5 text-2xl'>
									{t('comment')}
								</Label>
								<Textarea
									placeholder={t('comment_placeholder') || 'Leave a comment...'}
									name='comments'
									onChange={e => setText(e.target.value)}
								/>
								<div className='flex items-center justify-between'>
									<div className='flex justify-center mt-4 mb-4'>
										{[1, 2, 3, 4, 5].map(star => (
											<FaStar
												key={star}
												size={30}
												onClick={() => setRating(star)}
												className={`cursor-pointer transition-colors ${
													star <= rating ? 'text-yellow-400' : 'text-gray-300'
												}`}
											/>
										))}
									</div>
									<div className=''>
										<Button disabled={loading} className='mt-3'>{t('comment_btn')}</Button>
									</div>
								</div>
							</form>

							<div className='max-h-[400px] overflow-y-auto pr-2'>
								{data?.data?.comments?.map(comment => (
									<div
										className='mt-2 bg-muted rounded-[10px] p-2'
										key={comment?.id}
									>
										<div className='flex items-start gap-3'>
											<Avatar>
												<AvatarImage
													src={`${apiUrl}/image/${comment?.user?.image}`}
												/>
												<AvatarFallback className='border'>
													{comment?.user?.firstName?.[0]}
													{comment?.user?.lastName?.[0]}
												</AvatarFallback>
											</Avatar>
											<div className=''>
												<p className='text-[16px] font-semibold mb-2 flex items-center justify-between'>
													{`${comment?.user?.firstName} ${comment?.user?.lastName}`}
													<div className='flex items-center'>
														<FaStar className=' ml-2 text-yellow-400' />
														<span className='ml-1 text-sm text-gray-400'>
															{comment?.star}.0
														</span>
													</div>
												</p>
												<p className='text-[14px] font-normal'>
													{comment?.text}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</div>
				</Card>
			</div>
		</section>
	)
}
