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
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { DataMy } from '@/types/types'

interface TokenType {
	user: DataMy
}

export function Admen({ user }: TokenType) {
	const { t } = useTranslation()
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const [position, setPosition] = React.useState('bottom')
	const router = useRouter()

	const handleRemove = () => {
		Cookies.remove('accessToken')
		Cookies.remove('refreshToken')
		router.push('/')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='w-[40px] h-[40px] cursor-pointer max-[490px]:w-[35px] max-[490px]:h-[35px]'>
					<AvatarImage src={`${apiUrl}/image/${user?.data?.image}`} />
					<AvatarFallback>
						{user?.data?.lastName?.[0]}
						{user?.data?.firstName?.[0]}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56 mr-3'>
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					<DropdownMenuItem>
						<Avatar>
							<AvatarImage src={`${apiUrl}/image/${user?.data?.image}`} />
							<AvatarFallback>
								{user?.data?.lastName?.[0]}
								{user?.data?.firstName?.[0]}
							</AvatarFallback>
						</Avatar>
						<div className='truncate'>
							<p className='text-[12px] truncate'>{`${user?.data?.lastName} ${user?.data?.firstName}`}</p>
							<p className='text-[12px] truncate'>{user?.data?.email}</p>
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
				<DropdownMenuLabel
					onClick={() => handleRemove()}
					className='flex items-center gap-0.5 cursor-pointer'
				>
					<IoMdLogOut className='text-2xl' /> {t('logout')}
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
