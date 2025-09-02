'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from '@/context/TranslationContext'
import LanguageSwitcher from '@/i18n/Language'
import Link from 'next/link'
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler'
import { RainbowButton } from '../magicui/rainbow-button'
import CeoPanelNav from './CeoPanelNav'
import {
	HiOutlineBuildingLibrary,
	HiOutlinePlusCircle,
	HiBars3,
	HiXMark,
} from 'react-icons/hi2'
import { Admen } from '../Profile/User'
import { VideoText } from '../magicui/video-text'
import { DataMy } from '@/types/types'

const navigation = [
	{ name: 'home', href: '/' },
	{ name: 'reuses', href: '/reuses' },
	{ name: 'like', href: '/like' },
]

const authNavigation = [{ name: 'queue', href: '/queue' }]

const ceoPanelNavigation = [{ name: 'Ceo' }]

const ceoNavigation = [
	{
		name: 'ceoEdu',
		href: '/myEdu',
		icons: <HiOutlineBuildingLibrary className='text-lg' />,
	},
	{
		name: 'ceoNewEdu',
		href: '/createEdu',
		icons: <HiOutlinePlusCircle className='text-lg' />,
	},
]

interface TokenType {
	token: string | undefined
	user: DataMy
}

export default function Navbar({ token, user }: TokenType) {
	const { t } = useTranslation()
	const [open, setOpen] = useState<boolean>(false)
	const [role, setRole] = useState<boolean>(false)
	const [width, setWidth] = useState<number>(
		typeof window !== 'undefined' ? window.innerWidth : 0
	)
	const [mobileMenu, setMobileMenu] = useState(false)
	const [logo, setLogo] = useState(false)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (width < 1024) {
			setMobileMenu(true)
		} else {
			setMobileMenu(false)
		}
	}, [width])

	useEffect(() => {
		if (width < 400) {
			setLogo(true)
		} else {
			setLogo(false)
		}
	}, [width])

	useEffect(() => {
		if (token || user) {
			if (user?.data?.role === 'CEO') {
				setRole(true)
			} else {
				setRole(false)
			}
		}
	}, [token, user])

	return (
		<header className='w-full fixed top-0 left-0 z-40 p-3.5 max-[490px]:py-1.5 shadow-md border-b bg-background/80 backdrop-blur-md transition-colors'>
			<div className='top-container flex items-center justify-between'>
				<Link href='/'>
					<div className='relative h-[40px] w-[200px] max-[768px]:w-[150px] flex items-center justify-start max-[400px]:ml-[-45px]'>
						<VideoText
							src='https://cdn.magicui.design/ocean-small.webm'
							className='text-3xl w-full text-left'
						>
							{logo ? 'Edu' : 'EduSearch'}
						</VideoText>
					</div>
				</Link>

				<nav className='hidden lg:flex items-center'>
					<ul className='flex items-center gap-6'>
						{navigation.map(item => (
							<li key={item.href} className='group'>
								<Link
									href={item.href}
									className='text-lg font-medium hover:text-primary transition'
								>
									{t(item.name)}
								</Link>
								<div className='group-hover:w-full w-0 h-0.5 bg-primary rounded transition-all duration-300'></div>
							</li>
						))}

						{token ? (
							<>
								{authNavigation.map(item => (
									<li key={item.href} className='group'>
										<Link
											href={item.href}
											className='text-lg font-medium hover:text-primary transition'
										>
											{t(item.name)}
										</Link>
										<div className='group-hover:w-full w-0 h-0.5 bg-primary rounded transition-all duration-300'></div>
									</li>
								))}
							</>
						) : (
							<></>
						)}

						{role ? (
							<>
								<CeoPanelNav
									ceoPanelNavigation={ceoPanelNavigation}
									ceoNavigation={ceoNavigation}
								/>
							</>
						) : (
							<></>
						)}
					</ul>
				</nav>

				<div className='flex items-center gap-3'>
					<LanguageSwitcher />
					<AnimatedThemeToggler />
					{!token ? (
						<>
							<Link href='/login' className='cursor-pointer'>
								<RainbowButton className='max-[490px]:hidden'>
									{t('signIn')}
								</RainbowButton>
							</Link>
						</>
					) : (
						<>
							<Admen user={user}/>
						</>
					)}
					<button
						onClick={() => setOpen(true)}
						className='lg:hidden p-2 rounded-md hover:bg-muted transition'
					>
						<HiBars3 className='text-2xl' />
					</button>
				</div>
			</div>

			{mobileMenu && (
				<>
					<div
						className={`fixed top-0 right-0 h-screen w-[320px] border-l-[1.5px] bg-background/75 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${open ? 'translate-x-0 shadow-white ' : 'translate-x-full'}`}
					>
						<div className='flex items-center justify-between p-4 border-b'>
							<p className='text-2xl font-bold'>EduSearch</p>
							<button
								onClick={() => setOpen(false)}
								className='p-2 hover:bg-muted rounded-md'
							>
								<HiXMark className='text-2xl' />
							</button>
						</div>
						<ul className='flex flex-col items-start p-6 gap-6'>
							{navigation.map(item => (
								<li key={item.href}>
									<Link
										href={item.href}
										onClick={() => setOpen(false)}
										className='text-lg font-medium hover:text-primary transition'
									>
										{t(item.name)}
									</Link>
								</li>
							))}
							{authNavigation.map(item => (
								<li key={item.href}>
									<Link
										href={item.href}
										onClick={() => setOpen(false)}
										className='text-lg font-medium hover:text-primary transition'
									>
										{t(item.name)}
									</Link>
								</li>
							))}

							{role ? (
								<>
									<CeoPanelNav
										ceoPanelNavigation={ceoPanelNavigation}
										ceoNavigation={ceoNavigation}
									/>
								</>
							) : (
								<></>
							)}

							{!token ? (
								<>
									<Link href='/login' className='w-full'>
										<RainbowButton className='w-full min-[490px]:hidden'>
											{t('signIn')}
										</RainbowButton>
									</Link>
								</>
							) : (
								<></>
							)}
							<div className='w-[270px] text-center border-2 p-1 rounded-[10px] absolute bottom-5'>
								<p className='text-[15px] font-bold'>Foydalanuvchining roli:</p>
								<p className='text-[18px] font-bold'>{user?.data?.role}</p>
							</div>
						</ul>
					</div>
					{open && (
						<div
							onClick={() => setOpen(false)}
							className='fixed h-screen inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity'
						/>
					)}
				</>
			)}
		</header>
	)
}
