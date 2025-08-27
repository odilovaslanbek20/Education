'use client'

import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'
import { BorderBeam } from '@/components/magicui/border-beam'
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
import { useTranslation } from '@/context/TranslationContext'
import LanguageSwitcher from '@/i18n/Language'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function SendOtp() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const [loading, setLoading] = useState<boolean>(false)
	const { t } = useTranslation()
	const [email, setEmail] = useState<string>('')
  
	useEffect(() => {
		const email = localStorage.getItem('email')
		setEmail(email ?? '')
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
		 setLoading(true)
		 
		 try {
			const res = await axios.post(`${apiUrl}/users/send-otp`, email, {
				headers: {
					Accept: 'application/json',
				}
			})

			console.log(res);
			setLoading(false)
			toast.success(t('nice'))
			
		 } catch (err: unknown) {
			console.log(err);
			setLoading(false)
			toast.error(t('error_API'))
		 }

	}

	return (
		<Card className='relative max-w-[600px] w-full max-[768px]:max-w-full max-[768px]:h-screen max-[768px]:rounded-none max-[400px]:px-0'>
			<CardHeader>
				<CardTitle>{t('signIn')}</CardTitle>
				<CardDescription>{t('body')}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-2 w-full items-center gap-4 max-[400px]:gap-2'>
						<div className='flex flex-col space-y-1.5 col-span-2'>
							<Label htmlFor='email' className='max-[400px]:text-[12px]'>
								{t('email')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='email'
								type='email'
								value={email}
								placeholder={t('email')}
							/>
						</div>
						<div className='flex flex-col space-y-1.5 col-span-2'>
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
