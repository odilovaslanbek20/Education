'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from '@/context/TranslationContext'
import Link from 'next/link'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2'
import { useEffect, useState } from 'react'

interface ceoData {
	ceoPanelNavigation: { name: string }[]
	ceoNavigation: { name: string; href: string; icons: React.ReactNode }[]
}

export default function CeoDropdown({ ceoPanelNavigation, ceoNavigation }: ceoData) {
	const { t } = useTranslation()
	const [isMobile, setIsMobile] = useState(false)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	if (!isMobile) {
		return (
			<div className='relative inline-block'>
				<DropdownMenu>
					{ceoPanelNavigation.map((item, inx) => (
						<DropdownMenuTrigger key={item.name || inx} asChild>
							<div className='cursor-pointer px-4 py-2 bg-muted rounded-md text-sm font-medium flex items-center gap-2 hover:bg-muted/80 transition-colors'>
								{item.name}
								<HiOutlineChevronDown className='transition-transform duration-200' />
							</div>
						</DropdownMenuTrigger>
					))}
					<DropdownMenuContent className='w-56 mt-2 shadow-lg rounded-md border bg-white dark:bg-zinc-900'>
						{ceoNavigation.map((item, idx) => (
							<Link href={item.href} key={item.name || idx}>
							<DropdownMenuItem
								className='flex items-center gap-2 cursor-pointer'
							>
								{item.icons}
								{t(item.name)}
							</DropdownMenuItem>
							</Link>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		)
	}

	return (
		<div className='w-full'>
			{ceoPanelNavigation.map((item, inx) => (
				<button
					key={item.name || inx}
					onClick={() => setOpen(!open)}
					className='w-full flex justify-between items-center px-4 py-3 bg-muted rounded-md text-base font-medium hover:bg-muted/80 transition'
				>
					{item.name}
					{open ? (
						<HiOutlineChevronUp className='text-xl' />
					) : (
						<HiOutlineChevronDown className='text-xl' />
					)}
				</button>
			))}

			{open && (
				<ul className='mt-2 space-y-2 px-4'>
					{ceoNavigation.map((item, idx) => (
						<li key={item.name || idx}>
							<Link
								href={item.href}
								className='flex items-center gap-2 p-2 rounded-md hover:bg-muted transition'
								onClick={() => setOpen(false)}
							>
								{item.icons}
								{t(item.name)}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}