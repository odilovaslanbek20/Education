'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from '@/context/TranslationContext'
import Link from 'next/link'
import { HiOutlineChevronDown } from 'react-icons/hi2'

interface ceoData {
	ceoPanelNavigation: { name: string }[]
	ceoNavigation: { name: string; href: string; icons: React.ReactNode }[]
}

const CeoDropdown = ({ ceoPanelNavigation, ceoNavigation }: ceoData) => {
	const { t } = useTranslation()
	return (
		<div className='space-y-6'>
			<div className='relative inline-block'>
				<DropdownMenu>
					{ceoPanelNavigation.map((item, inx) => (
						<DropdownMenuTrigger key={item.name || inx} asChild>
							<div className='cursor-pointer px-4 py-2 bg-muted rounded-md text-sm font-medium flex items-center gap-2 hover:bg-muted/80 transition-colors line-clamp-1'>
								{item.name}
								<HiOutlineChevronDown className='transition-transform duration-200' />
							</div>
						</DropdownMenuTrigger>
					))}
					<DropdownMenuContent className='w-56 mt-2 shadow-lg rounded-md border bg-white dark:bg-zinc-900'>
						{ceoNavigation.map((item, idx) => (
							<DropdownMenuItem
								key={item.name || idx}
								className='flex items-center gap-2 cursor-pointer'
							>
								{item.icons}
								<Link href={item.href}>{t(item.name)}</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}

export default CeoDropdown
