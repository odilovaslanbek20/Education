'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from '@/context/TranslationContext'
import { IoMdLogOut } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import Link from 'next/link'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

export function Admen() {
	const { t } = useTranslation()
	const [position, setPosition] = React.useState('bottom')
	const router = useRouter()

	const handleRemove = () => {
    Cookies.remove("accessToken"); 
    Cookies.remove("refreshToken"); 
		router.push('/')
  };

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='w-[40px] h-[40px] cursor-pointer max-[490px]:w-[35px] max-[490px]:h-[35px]'>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56 mr-3'>
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuItem>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='truncate'>
							<p className='text-[12px] truncate'>Odilov Aslanbek</p>
							<p className='text-[12px] truncate'>
								aslanbekodilov524@gmail.com
							</p>
						</div>
					</DropdownMenuItem>
					<Link href='/dashboard/profiledit'>
						<DropdownMenuItem className='cursor-pointer'>
							<MdEdit className='text-2xl' />
							{t('edit')}
						</DropdownMenuItem>
					</Link>
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel onClick={() => handleRemove()} className='flex items-center gap-0.5 cursor-pointer'>
					<IoMdLogOut className='text-2xl' /> {t('logout')}
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
