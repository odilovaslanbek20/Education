'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from '@/context/TranslationContext'
import type { Lang } from '@/context/TranslationContext'

import gbFlag from '../../public/flags/gb.svg'
import ruFlag from '../../public/flags/ru.svg'
import uzFlag from '../../public/flags/uz.svg'
import Image from 'next/image'

export default function LanguageSwitcher() {
	const { locale, setLocale } = useTranslation()
	const [open, setOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const languages: { code: Lang; label: string; flag: string, br: string }[] = [
		{ code: 'uz', label: 'UZ', flag: uzFlag, br: 'top' },
		{ code: 'ru', label: 'RU', flag: ruFlag, br: 'none' },
		{ code: 'en', label: 'EN', flag: gbFlag, br: 'bottom' },
	]

	const currentLang = languages.find(lang => lang.code === locale) || languages[0]

	const handleLanguageSelect = (code: Lang) => {
		setLocale(code)
		localStorage.setItem('locale', code)
		setOpen(false)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false)
			}
		}

		if (open) {
			window.addEventListener('click', handleClickOutside)
		}

		return () => window.removeEventListener('click', handleClickOutside)
	}, [open])

	return (
		<div className='relative inline-block text-left' ref={dropdownRef}>
			<div
				className='flex items-center gap-1 cursor-pointer select-none'
				onClick={() => setOpen(!open)}
			>
				<Image
					className='w-[24px] md:w-[28px] rounded-full'
					src={currentLang.flag}
					alt='language'
				/>
				<p className='font-medium text-sm transition'>
					{currentLang.label}
				</p>
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -5 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -5 }}
						transition={{ duration: 0.2 }}
						className='absolute right-0 z-50 mt-2 w-[110px] rounded-xl bg-[rgb(46,46,46)] shadow-xl'
					>
						<div className=''>
							{languages.map(lang => (
								<button
									key={lang.code}
									onClick={() => handleLanguageSelect(lang.code)}
									className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 transition duration-200 
									${
										locale === lang.code
											? 'bg-cyan-500/20 text-cyan-300 font-semibold'
											: 'text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-white/10 hover:text-cyan-300'
									}
									${lang.br === 'top' ? 'rounded-t-xl' : lang.br === 'bottom' ? 'rounded-b-xl' : ''}
									`}
								>
									<Image
										src={lang.flag}
										alt={lang.label}
										className='w-7 rounded-full'
									/>
									{lang.label}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
