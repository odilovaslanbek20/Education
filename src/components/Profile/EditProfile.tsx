'use client'

import { useTranslation } from '@/context/TranslationContext'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { MdEdit, MdDeleteForever } from 'react-icons/md'
import { SelectSeparator } from '../ui/select'
import { DataMy } from '@/types/types'
import { Lens } from '../magicui/lens'
import Image from 'next/image'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog'
import { BorderBeam } from '@/components/magicui/border-beam'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

interface DataType {
	data: DataMy
	token?: string
}

export default function EditUser({ data, token }: DataType) {
	const { t } = useTranslation()
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const [open, setOpen] = useState<boolean>(false)
	const [openPhoto, setOpenPhoto] = useState<boolean>(false)
	const [firstName, setFirstName] = useState<string>(data?.data?.firstName)
	const [lastName, setLastName] = useState<string>(data?.data?.lastName)
	const [phone, setPhone] = useState<string>(data?.data?.phone)
	const [images, setImage] = useState<File | null>(null)
	const router = useRouter()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setImage(e.target.files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			await axios.patch(
				`${apiUrl}/users/${data?.data?.id}`,
				{
					firstName,
					lastName,
					phone,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			toast.success(t('nice'))
			data.data.firstName = firstName
			data.data.lastName = lastName
			data.data.phone = phone
			setOpen(false)
		} catch (err: unknown) {
			console.log(err)
			toast.error(t('error_API'))
		}
	}

	const changePhoto = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			let image = ''
			if (images) {
				const imageData = new FormData()
				imageData.append('image', images)

				const uploadRes = await axios.post(`${apiUrl}/upload`, imageData, {
					headers: {
						Accept: 'application/json',
					},
				})

				if (uploadRes.status === 201) {
					image = uploadRes.data.data
				}
			}

			await axios.patch(
				`${apiUrl}/users/${data?.data?.id}`,
				{
					image,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			toast.success(t('nice'))
			data.data.image = image
			setOpenPhoto(false)
		} catch (err: unknown) {
			console.log(err)
			toast.error(t('error_API'))
		}
	}

	const deleteUser = async () => {
		try {
			await axios.delete(`${apiUrl}/users/${data?.data?.id}`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

			toast.success(t('nice'))
			Cookies.remove('accessToken')
			Cookies.remove('refreshToken')
			router.push('/')
		} catch (err: unknown) {
			console.log(err)
			toast.error(t('error_API'))
		}
	}

	return (
		<section>
			<div className='web-container py-6'>
				<Card className='w-full'>
					<CardHeader className='flex items-center justify-between flex-wrap gap-3'>
						<CardTitle className='text-3xl font-bold max-sm:text-2xl'>
							{t('my_account')}
						</CardTitle>
						<Button
							className='w-[200px] max-sm:w-full cursor-pointer'
							onClick={() => setOpen(true)}
						>
							<MdEdit className='text-2xl' />
							{t('edit')}
						</Button>
					</CardHeader>

					<SelectSeparator />

					<CardContent className='flex items-center justify-center gap-10 w-full flex-col lg:flex-row'>
						<div className=''>
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
									className='w-[300px] h-[300px] object-center bg-cover'
								/>
							</Lens>

							<div className='w-full flex items-center justify-center'>
								<p
									onClick={() => setOpenPhoto(true)}
									className='text-[16px] font-medium text-blue-500 text-center mt-4 cursor-pointer w-[120px]'
								>
									Change photo
								</p>
							</div>

							<Dialog open={openPhoto} onOpenChange={setOpenPhoto}>
								<DialogContent>
									<BorderBeam />
									<DialogHeader>
										<DialogTitle>Update photo</DialogTitle>
									</DialogHeader>
									<form onSubmit={changePhoto}>
										<div className='my-1'>
											<Label htmlFor='image' className='mb-1.5'>
												{t('image')}
											</Label>
											<Input
												type='file'
												name='image'
												onChange={handleFileChange}
												className='mb-4'
											/>
										</div>
										<Button type='submit' className='w-full'>
											{t('formbtn')}
										</Button>
									</form>
									<DialogFooter>
										<Button>Close</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>

						<div className='w-full'>
							<ul className='grid grid-cols-2 gap-y-6 gap-x-12 max-sm:grid-cols-1 max-sm:text-center'>
								<li>
									<p className='text-sm font-bold text-red-500'>
										{t('firstName')}*
									</p>
									<p className='text-lg font-medium'>{data?.data?.firstName}</p>
								</li>
								<li>
									<p className='text-sm font-bold text-red-500'>
										{t('lastName')}*
									</p>
									<p className='text-lg font-medium'>{data?.data?.lastName}</p>
								</li>
								<li>
									<p className='text-sm font-bold text-red-500'>
										{t('email')}*
									</p>
									<p className='text-lg font-medium break-all'>
										{data?.data?.email}
									</p>
								</li>
								<li>
									<p className='text-sm font-bold text-red-500'>
										{t('phone')}*
									</p>
									<p className='text-lg font-medium'>{data?.data?.phone}</p>
								</li>
								<li>
									<p className='text-sm font-bold text-red-500'>{t('role')}*</p>
									<p className='text-lg font-medium'>{data?.data?.role}</p>
								</li>
								<li>
									<p className='text-sm font-bold text-red-500'>
										{t('create')}*
									</p>
									<p className='text-lg font-medium'>
										{new Date(data?.data?.createdAt).toLocaleString()}
									</p>
								</li>
								<li>
									<p className='text-sm font-bold text-red-500'>
										{t('update')}*
									</p>
									<p className='text-lg font-medium'>
										{new Date(data?.data?.updatedAt).toLocaleString()}
									</p>
								</li>
							</ul>
						</div>
					</CardContent>

					<SelectSeparator />

					<CardFooter className='flex items-center justify-between max-sm:flex-col max-sm:gap-4'>
						<CardTitle className='text-xl font-semibold max-sm:text-center'>
							{t('delete_title')}
						</CardTitle>
						<Button
							onClick={() => deleteUser()}
							className='gap-1 bg-red-500 hover:bg-red-400 cursor-pointer w-[200px] max-sm:w-full'
						>
							<MdDeleteForever className='text-2xl' />
							{t('delete')}
						</Button>
					</CardFooter>
				</Card>

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent>
						<BorderBeam />

						<DialogHeader>
							<DialogTitle className='text-left mb-1.5 text-2xl'>
								{t('edit')}
							</DialogTitle>
							<form
								onSubmit={handleSubmit}
								className='grid grid-cols-2 gap-[12px] max-[440px]:grid-cols-1'
							>
								<div className=''>
									<Label
										htmlFor='firstName'
										className='max-[400px]:text-[12px] mb-1'
									>
										{t('firstName')}
									</Label>
									<Input
										onChange={e => setFirstName(e.target.value)}
										value={firstName}
										type='text'
										name='firstName'
										placeholder={t('firstName')}
									/>
								</div>
								<div className=''>
									<Label
										htmlFor='lastName'
										className='max-[400px]:text-[12px] mb-1'
									>
										{t('lastName')}
									</Label>
									<Input
										onChange={e => setLastName(e.target.value)}
										value={lastName}
										type='text'
										name='lastName'
										placeholder={t('lastName')}
									/>
								</div>
								<div className='col-span-2'>
									<Label
										htmlFor='phone'
										className='max-[400px]:text-[12px] mb-1'
									>
										{t('phone')}
									</Label>
									<Input
										onChange={e => setPhone(e.target.value)}
										value={phone}
										type='text'
										name='phone'
										placeholder={t('phone')}
									/>
								</div>
								<Button
									type='submit'
									className='w-full col-span-2 max-[440px]:col-span-1'
								>
									{t('formbtn')}
								</Button>
							</form>
						</DialogHeader>

						<DialogFooter>
							<Button onClick={() => setOpen(false)}>Close</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	)
}
