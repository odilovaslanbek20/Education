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

export function Register() {
	const { t } = useTranslation()
	return (
		<Card className='relative max-w-[600px] w-full max-[768px]:max-w-full max-[768px]:h-screen max-[768px]:rounded-none max-[400px]:px-0'>
			<CardHeader>
				<CardTitle>{t('signUp')}</CardTitle>
				<CardDescription>{t('body')}</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
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
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name' className='max-[400px]:text-[12px]'>
								{t('lastName')}
							</Label>
							<Input
								required
								className='max-[400px]:text-[12px]'
								id='password'
								type='name'
								placeholder={t('lastName')}
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
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='role' className='max-[400px]:text-[12px]'>
								{t('role')}
							</Label>
							<Select required>
								<SelectTrigger className='max-[400px]:text-[12px] w-full'>
									<SelectValue placeholder={t('role')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={t('role')} disabled>
										{t('role')}
									</SelectItem>
									<SelectItem value='ceo'>Ceo</SelectItem>
									<SelectItem value='user'>User</SelectItem>
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
								placeholder={t('image')}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='btn' className='opacity-0'>
								{t('image')}
							</Label>
							<Button type='submit'>{t('formbtn')}</Button>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 relative'>
				<div className='flex gap-2 w-full sm:w-auto'>
					<Button variant='outline' className='flex-1 sm:flex-none'>
						{t('signUp')}
					</Button>
					<Button className='flex-1 sm:flex-none'>{t('signIn')}</Button>
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
