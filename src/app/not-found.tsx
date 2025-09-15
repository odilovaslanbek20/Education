'use client'

import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'
import { useTranslation } from '@/context/TranslationContext'
import LanguageSwitcher from '@/i18n/Language'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
	const { t } = useTranslation()
	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			<div className='flex items-center gap-3'>
				<AnimatedThemeToggler className='cursor-pointer' />
				<LanguageSwitcher />
			</div>
			<motion.h1
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.6, type: 'spring' }}
				className='text-9xl font-extrabold text-red-600 drop-shadow-lg'
			>
				404
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.6 }}
				className='mt-4 text-2xl font-semibold'
			>
				{t('notFound_title')}
			</motion.p>

			<motion.p
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8, duration: 0.6 }}
				className='mt-2 text-gray-600'
			>
				{t('notFound_desc')}
			</motion.p>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2, duration: 0.8 }}
				className='mt-6'
			>
				<Link
					href='/'
					className='rounded-2xl bg-red-600 px-6 py-3 text-lg font-medium text-white shadow-lg transition hover:scale-105 hover:bg-red-700'
				>
					{t('notFound_btn')}
				</Link>
			</motion.div>
		</div>
	)
}
