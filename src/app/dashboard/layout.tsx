import Navbar from '@/components/Header/Navbar'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode
}) {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value
	return (
		<>
			<Navbar token={token}/>
			<main className='pt-[65px]'>{children}</main>
			{/* <Footer /> */}
		</>
	)
}
