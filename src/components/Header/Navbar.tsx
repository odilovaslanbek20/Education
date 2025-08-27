'use client'

import { useTranslation } from '@/context/TranslationContext'
import LanguageSwitcher from '@/i18n/Language'
import Link from 'next/link'
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler'
import { RainbowButton } from '../magicui/rainbow-button'
import CeoPanelNav from './CeoPanelNav'
import { HiOutlineBuildingLibrary, HiOutlinePlusCircle } from 'react-icons/hi2'

const navigation = [
	{ name: 'home', href: '/' },
	{ name: 'reuses', href: '/reuses' },
	{ name: 'like', href: '/like' },
]

const authNavigation = [{ name: 'queue', href: '/queue' }]

const ceoPanelNavigation = [{ name: 'Ceo' }]

const ceoNavigation = [
	{ name: 'ceoEdu', href: '/myEdu', icons: <HiOutlineBuildingLibrary className='text-lg'/> },
	{ name: 'ceoNewEdu', href: '/createEdu', icons: <HiOutlinePlusCircle className='text-lg'/> },
]

export default function Navbar() {
	const { t } = useTranslation()
	return (
		<>
			<header className='w-full fixed top-0 left-0 z-40 p-3.5 shadow-md border-b'>
				<div className='top-container flex items-center justify-between'>
					<Link href='/' className='text-4xl font-bold'>
						EduSearch
					</Link>
					<nav className='flex items-center'>
						<ul className='flex items-center gap-6'>
							{navigation.map(item => (
								<li key={item.href} className='group'>
									<Link href={item.href} className='text-lg font-medium'>
										{t(item.name)}
									</Link>
									<div className='group-hover:w-full w-0 h-0.5 rounded-4xl transition-all duration-300'></div>
								</li>
							))}
							{authNavigation.map(item => (
								<li key={item.href} className='group'>
									<Link href={item.href} className='text-lg font-medium'>
										{t(item.name)}
									</Link>
									<div className='group-hover:w-full w-0 h-0.5 rounded-4xl transition-all duration-300'></div>
								</li>
							))}
							<CeoPanelNav ceoPanelNavigation={ceoPanelNavigation} ceoNavigation={ceoNavigation}/>
						</ul>
					</nav>
					<div className='flex items-center gap-4'>
						<LanguageSwitcher />
						<AnimatedThemeToggler />
						<RainbowButton>{t('signIn')}</RainbowButton>
					</div>
				</div>
			</header>
		</>
	)
}
