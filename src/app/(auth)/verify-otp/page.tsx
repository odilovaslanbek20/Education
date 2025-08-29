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
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { useTranslation } from '@/context/TranslationContext'
import LanguageSwitcher from '@/i18n/Language'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function VerifyOtp() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const { t } = useTranslation()
	const router = useRouter()
	const [otpCode, setOtpCode] = useState<string>('')
	const [emailState, setEmailState] = useState<string>('')

	useEffect(() => {
		const email = localStorage.getItem('email')
		if (email) {
			setEmailState(email)
		}
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			await axios.post(
				`${apiUrl}/users/verify-otp`,
				{
					email: emailState,
					otp: otpCode,
				},
				{ headers: { 'Content-Type': 'application/json' } }
			)

			toast.success(t('nice'))
			router.push('/login')
		} catch (error: unknown) {
			console.log(error)
			toast.error(t('error_API'))
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
			<Card className='relative w-[520px] rounded-2xl shadow-lg sm:rounded-xl md:rounded-2xl'>
				<CardHeader className='text-center space-y-2'>
					<CardTitle className='text-xl sm:text-2xl md:text-3xl font-bold'>
						{t('signIn')}
					</CardTitle>
					<CardDescription className='text-xs sm:text-sm md:text-base'>
						{t('body')}
					</CardDescription>
				</CardHeader>

				<CardContent className='space-y-6'>
					<form
						onSubmit={handleSubmit}
						className='space-y-6 flex items-center justify-center flex-col'
					>
						<InputOTP
							value={otpCode}
							onChange={value => setOtpCode(value)}
							maxLength={5}
							pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
						>
							<InputOTPGroup className='flex justify-center gap-2 sm:gap-3'>
								{Array.from({ length: 5 }).map((_, i) => (
									<InputOTPSlot
										key={i}
										index={i}
										className='w-10 h-12 sm:w-12 sm:h-14 text-base sm:text-lg rounded-lg sm:rounded-xl border-2 focus:outline-none focus:ring-2 transition'
									/>
								))}
							</InputOTPGroup>
						</InputOTP>

						<Button
							type='submit'
							className='w-full font-semibold rounded-lg sm:rounded-xl py-2.5 sm:py-3 shadow-md sm:shadow-lg transition'
						>
							{t('formbtn') || 'Tasdiqlash'}
						</Button>
					</form>
				</CardContent>

				<CardFooter className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative'>
					<div className='flex gap-2 w-full sm:w-auto'>
						<Link href='/register'>
							<Button
								variant='outline'
								className='flex-1 sm:flex-none cursor-pointer'
							>
								{t('signUp')}
							</Button>
						</Link>
						<Link href='/login'>
							<Button className='flex-1 sm:flex-none cursor-pointer'>
								{t('signIn')}
							</Button>
						</Link>
					</div>

					<div className='flex items-center gap-3 sm:gap-4 sm:absolute sm:top-3 sm:right-4'>
						<LanguageSwitcher />
						<AnimatedThemeToggler />
					</div>
				</CardFooter>

				<BorderBeam duration={8} size={100} />
			</Card>
		</div>
	)
}
