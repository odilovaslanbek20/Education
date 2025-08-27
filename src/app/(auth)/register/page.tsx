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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BorderBeam } from '@/components/magicui/border-beam'
import { useTranslation } from '@/context/TranslationContext'
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'
import LanguageSwitcher from '@/i18n/Language'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function RegisterPage() {
	const { t } = useTranslation()
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const [loading, setLoading] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [role, setRole] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [image, setImage] = useState<File | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			let uploadedImageUrl = ''
			if (image) {
				const imageData = new FormData()
				imageData.append('image', image)

				const uploadRes = await axios.post(`${apiUrl}/upload`, imageData, {
					headers: {
						Accept: 'application/json',
					},
				})

				if (uploadRes.status === 201) {
					uploadedImageUrl = uploadRes.data.data
				}
			}

			const formData = new FormData()
			formData.append('firstName', name)
			formData.append('lastName', lastName)
			formData.append('email', email)
			formData.append('phone', phone)
			formData.append('password', password)
			formData.append('role', role)
			if (uploadedImageUrl) {
				formData.append('image', uploadedImageUrl)
			}

			const data = Object.fromEntries(formData)

			const registerRes = await axios.post(`${apiUrl}/users/register`, data, {
				headers: {
					Accept: 'application/json',
				},
			})

			console.log('Register response:', registerRes.data)
			setLoading(false)
			toast.success(t('nice'))
			JSON.stringify(localStorage.setItem('email', email))
		} catch (err: unknown) {
			console.error('Register error:', err)
			setLoading(false)
			toast.error(t('error_API'))
		}
	}

	return (
		<Card className='relative max-w-[600px] w-full max-[768px]:max-w-full max-[768px]:h-screen max-[768px]:rounded-none max-[400px]:px-0'>
			<CardHeader>
				<CardTitle>{t('signUp')}</CardTitle>
				<CardDescription>{t('body')}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-2 w-full items-center gap-4 max-[400px]:gap-2'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name' className='max-[400px]:text-[12px]'>
								{t('firstName')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='name'
								type='name'
								placeholder={t('firstName')}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name' className='max-[400px]:text-[12px]'>
								{t('lastName')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='lastName'
								type='name'
								placeholder={t('lastName')}
								onChange={e => setLastName(e.target.value)}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='password' className='max-[400px]:text-[12px]'>
								{t('password')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='password'
								type='password'
								placeholder={t('password')}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='email' className='max-[400px]:text-[12px]'>
								{t('email')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='email'
								type='email'
								placeholder={t('email')}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='phone' className='max-[400px]:text-[12px]'>
								{t('phone')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='phone'
								type='text'
								placeholder={t('phone')}
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='role' className='max-[400px]:text-[12px]'>
								{t('role')}
							</Label>
							<Select required onValueChange={Value => setRole(Value)}>
								<SelectTrigger className='max-[400px]:text-[12px] w-full'>
									<SelectValue placeholder={t('role')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={t('role')} disabled>
										{t('role')}
									</SelectItem>
									<SelectItem value='CEO'>Ceo</SelectItem>
									<SelectItem value='USER'>User</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='image' className='max-[400px]:text-[12px]'>
								{t('image')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='image'
								type='file'
								onChange={e => {
									if (e.target.files && e.target.files.length > 0) {
										setImage(e.target.files[0])
									}
								}}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='btn' className='opacity-0'>
								{t('image')}
							</Label>
							<Button type='submit' disabled={loading}  className='cursor-pointer'>{`${
								!loading ? t('formbtn') : t('loading')
							}`}</Button>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative'>
				<div className='flex gap-2 w-full sm:w-auto'>
					<Link href='/register'>
						<Button variant='outline' className='flex-1 sm:flex-none cursor-pointer'>
							{t('signUp')}
						</Button>
					</Link>
					<Link href='/login'>
						<Button className='flex-1 sm:flex-none cursor-pointer'>{t('signIn')}</Button>
					</Link>
				</div>

				<div className='flex items-center gap-3 sm:gap-4 sm:absolute sm:top-3 sm:right-4'>
					<LanguageSwitcher />
					<AnimatedThemeToggler />
				</div>
			</CardFooter>

			<BorderBeam duration={8} size={100} />
		</Card>
	)
}
