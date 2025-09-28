'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FaPhotoFilm } from 'react-icons/fa6'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { ApiResponse, RegionType } from '@/types/types'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { toast } from 'react-toastify'

interface CreateCenterProps {
	token: string | undefined
	region: RegionType
	majors: ApiResponse
}

export default function CreateCenter({
	token,
	region,
	majors,
}: CreateCenterProps) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [regions, setRegion] = useState('')
	const [phone, setPhone] = useState('')
	const [imagePreview, setImagePreview] = useState(null)
	const [selected, setSelected] = useState<number[]>([])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const centerData = {
			name,
			address,
			phone,
			regionId: regions,
			majorsId: selected,
			image: imagePreview,
		}

		try {
			const response = await axios.post(`${apiUrl}/centers`, centerData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.status === 201) {
				toast.success('Center created successfully!')
				setName('')
				setAddress('')
				setPhone('')
				setImagePreview(null)
			}
		} catch (error) {
			console.error('Error creating center:', error)
			toast.error('Failed to create center. Please try again.')
		}
	}

	const handleChange = (id: number, checked: boolean) => {
		if (checked) {
			setSelected(prev => [...prev, id])
		} else {
			setSelected(prev => prev.filter(item => item !== id))
		}
	}

	return (
		<section className='py-10 bg-white dark:bg-black'>
			<div className='web-container'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Card className='rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-800'>
						<CardHeader>
							<CardTitle className='text-3xl font-bold flex items-center gap-2'>
								Create New Education Center
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div className='space-y-2'>
									<Label htmlFor='name'>Center Name</Label>
									<Input
										id='name'
										name='name'
										placeholder='Enter center name'
										required
										onChange={e => setName(e.target.value)}
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='address'>Address</Label>
									<Input
										id='address'
										name='address'
										placeholder='Enter address'
										required
										onChange={e => setAddress(e.target.value)}
									/>
								</div>

								<div className='space-y-2'>
									<Select onValueChange={(value) => setRegion(value)}>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Region' />
										</SelectTrigger>
										<SelectContent>
											{region?.data?.map(item => (
												<SelectItem key={item?.id} value={`${item?.id}`}>
													{item?.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='phone'>Phone Number</Label>
									<Input
										id='phone'
										name='phone'
										type='tel'
										placeholder='+998 90 123 45 67'
										required
										onChange={e => setPhone(e.target.value)}
									/>
								</div>

								<div className='space-y-2'>
									<div className='flex items-center gap-4 flex-wrap'>
										{majors?.data?.map(item => (
											<div key={item?.id} className='flex items-center gap-2'>
												<Label htmlFor={`major-${item?.id}`}>
													{item?.name}
												</Label>
												<Checkbox
													id={`major-${item?.id}`}
													checked={selected.includes(item?.id)}
													onCheckedChange={checked =>
														handleChange(item?.id, checked as boolean)
													}
												/>
											</div>
										))}
									</div>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='image'>
										<div className='w-full flex items-center cursor-pointer border border-dashed border-gray-300 rounded-md p-4 hover:bg-white/10'>
											<FaPhotoFilm className='h-6 w-6 text-gray-500' />
											<span className='ml-2 text-gray-500'>
												Upload Center Image
											</span>
										</div>
									</Label>

									<Input
										id='image'
										name='image'
										type='file'
										className='hidden'
										onChange={async e => {
											if (e.target.files && e.target.files.length > 0) {
												const file = e.target.files[0]

												const imageData = new FormData()
												imageData.append('image', file)

												const uploadRes = await axios.post(
													`${apiUrl}/upload`,
													imageData,
													{
														headers: { Accept: 'application/json' },
													}
												)

												if (uploadRes.status === 201) {
													setImagePreview(uploadRes.data.data)
												}
											}
										}}
										required
									/>

									{imagePreview && (
										<div>
											<Image
												src={`${apiUrl}/image/${imagePreview}`}
												alt='Preview'
												width={100}
												height={100}
												className='rounded-md'
											/>
										</div>
									)}
								</div>

								<Button type='submit' className='w-full'>
									Create Center
								</Button>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	)
}
